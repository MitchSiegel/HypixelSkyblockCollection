var CACHE_NAME = 'my-site-cache-v1';
var domain = "localhost:8080"
var urlsToCache = [
 '/', '/style.css'
];
var Farmingitems = [
  "wheat",
  "carrot",
  "melons"
]
var images = [
  '/img/wheat.png',
  '/img/Farming.webp',
  "/img/hb.webp",
  "/img/bg.webp",
  "/img/carrot.png",
  "/img/carrotminion.png",
  "/img/Clay.png",
  "/img/cm.webp"
]
self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache){
      loadCache(cache)
      cache.addAll(urlsToCache)
      cache.addAll(images)
    }))
});
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          console.log('cached?')
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
function loadCache(cache){
  
  for(x in Farmingitems){
    for(i = 0; i < 9; i++){
      cache.add(`/items/farming/${Farmingitems[x]}/${Number(i + 1)}`);
      console.log("Added " + Farmingitems[x] + " tiers offline")
    }
  }
}