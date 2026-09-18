export default defineNuxtPlugin(async () => {
  const { fetchSettings } = useSettings()
  let settings: any = null
  try {
    settings = await fetchSettings()
  } catch (_) {}

  const metaId = settings?.meta_pixel_id?.trim()
  const gtmId = settings?.gtm_id?.trim()

  // Meta Pixel
  if (metaId) {
    const script = document.createElement('script')
    script.innerHTML = `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${metaId}');
fbq('track', 'PageView');
`
    document.head.appendChild(script)

    const noscript = document.createElement('noscript')
    const img = document.createElement('img')
    img.height = 1
    img.width = 1
    ;(img as any).style = 'display:none'
    img.src = `https://www.facebook.com/tr?id=${metaId}&ev=PageView&noscript=1`
    noscript.appendChild(img)
    document.head.appendChild(noscript)

    // track on route change
    const route = useRoute()
    watch(() => route.fullPath, () => {
      // @ts-ignore
      if (typeof (window as any).fbq === 'function') (window as any).fbq('track', 'PageView')
    })
  }

  // GTM / GA4
  if (gtmId) {
    const isGtm = gtmId.startsWith('GTM-')
    if (isGtm) {
      const s1 = document.createElement('script')
      s1.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`
      document.head.appendChild(s1)
      const ns = document.createElement('noscript')
      ns.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`
      document.body.appendChild(ns)
    } else {
      // assume GA4 G-XXXX
      const s = document.createElement('script')
      s.async = true
      s.src = `https://www.googletagmanager.com/gtag/js?id=${gtmId}`
      document.head.appendChild(s)
      const s2 = document.createElement('script')
      s2.innerHTML = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config','${gtmId}');`
      document.head.appendChild(s2)
    }
  }
})
