const ORIGIN = 'https://builderai-tools-ssr.clockedoutlockedin.workers.dev'

const CANONICAL_HOST = 'builderai.tools'
const WWW_HOST = `www.${CANONICAL_HOST}`

export default {
  async fetch(request) {
    const incomingUrl = new URL(request.url)
    if (incomingUrl.hostname === WWW_HOST) {
      incomingUrl.hostname = CANONICAL_HOST
      incomingUrl.protocol = 'https:'
      incomingUrl.port = ''
      return Response.redirect(incomingUrl.toString(), 301)
    }

    const publicOrigin = incomingUrl.hostname === CANONICAL_HOST
      ? `https://${CANONICAL_HOST}`
      : `${incomingUrl.protocol}//${incomingUrl.host}`
    const targetUrl = new URL(`${incomingUrl.pathname}${incomingUrl.search}`, ORIGIN)
    const headers = new Headers(request.headers)
    const originUrl = new URL(ORIGIN)
    const clientIp = request.headers.get('cf-connecting-ip')

    headers.delete('host')
    headers.set('x-forwarded-host', incomingUrl.host)
    headers.set('x-forwarded-proto', incomingUrl.protocol.replace(':', ''))

    if (clientIp) {
      headers.set('x-forwarded-for', clientIp)
    }

    const response = await fetch(targetUrl.toString(), {
      method: request.method,
      headers,
      body: request.method === 'GET' || request.method === 'HEAD' ? undefined : request.body,
      redirect: 'manual',
    })

    const responseHeaders = new Headers(response.headers)
    const location = responseHeaders.get('location')

    if (location && location.startsWith(ORIGIN)) {
      responseHeaders.set('location', location.replace(ORIGIN, publicOrigin))
    } else if (location && location.startsWith(`https://${WWW_HOST}`)) {
      responseHeaders.set('location', location.replace(`https://${WWW_HOST}`, `https://${CANONICAL_HOST}`))
    }

    responseHeaders.set('x-proxied-by', originUrl.host)

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    })
  },
}
