import sharp from 'sharp'
import path from 'node:path'

const ROOT = path.resolve(process.cwd())
const SRC = path.join(ROOT, 'public', 'logo-icon-source.png')
const OUT = path.join(ROOT, 'public', 'og-image.png')

const CANVAS_W = 1200
const CANVAS_H = 630
const ICON_SIZE = 280
const ICON_LEFT = 80
const ICON_TOP = Math.round((CANVAS_H - ICON_SIZE) / 2)

async function main() {
  const icon = await sharp(SRC)
    .resize(ICON_SIZE, ICON_SIZE, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer()

  const svgTextLayer = `
<svg width="${CANVAS_W}" height="${CANVAS_H}" xmlns="http://www.w3.org/2000/svg">
  <text x="400" y="295" font-family="system-ui, -apple-system, Segoe UI, Roboto, sans-serif" font-size="120" font-weight="800" fill="#ffffff">Builder<tspan fill="#3b82f6">AI</tspan></text>
  <text x="400" y="360" font-family="system-ui, -apple-system, Segoe UI, Roboto, sans-serif" font-size="32" font-weight="400" fill="#cbd5e1">Curated Open Source AI Tools</text>
  <text x="1160" y="600" font-family="system-ui, -apple-system, Segoe UI, Roboto, sans-serif" font-size="22" font-weight="600" fill="#7dd3fc" text-anchor="end">builderai.tools</text>
</svg>
`.trim()

  await sharp({
    create: {
      width: CANVAS_W,
      height: CANVAS_H,
      channels: 4,
      background: { r: 10, g: 14, b: 39, alpha: 1 },
    },
  })
    .composite([
      { input: icon, left: ICON_LEFT, top: ICON_TOP },
      { input: Buffer.from(svgTextLayer), left: 0, top: 0 },
    ])
    .png()
    .toFile(OUT)

  const meta = await sharp(OUT).metadata()
  console.log(`og-image.png: ${meta.width}x${meta.height} (${meta.channels}ch)`)
  if (meta.width !== CANVAS_W || meta.height !== CANVAS_H) {
    throw new Error(`Expected ${CANVAS_W}x${CANVAS_H}, got ${meta.width}x${meta.height}`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
