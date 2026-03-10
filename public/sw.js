const CACHE="wavetune-v1"

const assets=[
"/",
"/index.html",
"/src/css/style.css",
"/src/js/app.js"
]

self.addEventListener("install",event=>{

event.waitUntil(

caches.open(CACHE)
.then(cache=>cache.addAll(assets))

)

})

self.addEventListener("fetch",event=>{

event.respondWith(

caches.match(event.request)
.then(res=>res||fetch(event.request))

)

})