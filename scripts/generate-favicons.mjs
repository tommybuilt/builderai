import sharp from 'sharp'
import pngToIco from 'png-to-ico'
import { promises as fs } from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(process.cwd())
const SRC = path.join(ROOT, 'public', 'logo-icon-source.png')
const OUT_DIR = path.join(ROOT, 'public')

const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 }
const APPLE_BG = { r: 10, g: 14, b: 39, alpha: 1 }

// Pre-process the source PNG so the icon graphic fills its canvas tightly
// and its colors read at small sizes (down to 16x16). The previous output
// was visually small in the browser tab because the source has transparent
// padding around the hexagon and the colors are dark; small sizes lost
// definition.
//
// Steps:
// 1. Trim removes the outer transparent margin around the hexagon, so the
//    graphic now occupies the full canvas before we resize.
// 2. Modulate boosts brightness and saturation so the cyan/purple glow
//    remains readable at 16x16 against typical browser-tab backgrounds.
//
// Sharp's pipeline is lazy; computing the trimmed buffer once and reusing
// it across all sizes is faster and ensures every variant lines up
// pixel-for-pixel with the same crop.
let trimmedBufferPromise = null
async function getTrimmedBrightSource() {
  if (!trimmedBufferPromise) {
    trimmedBufferPromise = sharp(SRC)
      .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 10 })
      .modulate({ brightness: 1.18, saturation: 1.25 })
      .png()
      .toBuffer()
  }
  return trimmedBufferPromise
}

async function makePng(size, outFile, opts = {}) {
  const { background = TRANSPARENT, flatten = false } = opts
  const sourceBuffer = await getTrimmedBrightSource()
  let pipeline = sharp(sourceBuffer).resize(size, size, { fit: 'contain', background })
  if (flatten) {
    pipeline = pipeline.flatten({ background })
  }
  const outPath = path.join(OUT_DIR, outFile)
  await pipeline.png().toFile(outPath)
  const meta = await sharp(outPath).metadata()
  console.log(`  ${outFile}: ${meta.width}x${meta.height} (${meta.channels}ch)`)
  return outPath
}

async function main() {
  const srcMeta = await sharp(SRC).metadata()
  if (srcMeta.width !== 1024 || srcMeta.height !== 1024) {
    throw new Error(`Source must be 1024x1024, got ${srcMeta.width}x${srcMeta.height}`)
  }

  console.log('Generating PNG favicon variants...')
  const png16 = await makePng(16, 'favicon-16x16.png')
  const png32 = await makePng(32, 'favicon-32x32.png')
  const png48 = await makePng(48, 'favicon-48x48.png')
  await makePng(192, 'icon-192.png')
  await makePng(512, 'icon-512.png')
  await makePng(512, 'logo-512.png')

  console.log('Generating apple-touch-icon (180x180, opaque background)...')
  await makePng(180, 'apple-touch-icon.png', { background: APPLE_BG, flatten: true })

  console.log('Generating multi-size favicon.ico (16, 32, 48)...')
  const icoBuffer = await pngToIco([png16, png32, png48])
  const icoPath = path.join(OUT_DIR, 'favicon.ico')
  await fs.writeFile(icoPath, icoBuffer)
  const icoStat = await fs.stat(icoPath)
  console.log(`  favicon.ico: ${icoStat.size} bytes`)

  console.log('\nFavicon set generated successfully.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
