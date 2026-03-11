const CACHE_NAME = "wavetune-v1"

const FILES_TO_CACHE = [

"/",
"/index.html",

"/src/css/style.css",

"/src/js/player.js",
"/src/js/ui.js",
"/src/js/playlist.js",
"/src/js/visualizer.js"

]

self.addEventListener("install", event => {

event.waitUntil(

caches.open(CACHE_NAME)

.then(cache => cache.addAll(FILES_TO_CACHE))

)

})

self.addEventListener("fetch", event => {

event.respondWith(

caches.match(event.request)

.then(response => {

return response || fetch(event.request)

})

)

})