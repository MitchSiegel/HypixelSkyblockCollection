var CACHE_NAME = 'my-site-cache-v1';
var domain = "localhost:8080"
var urlsToCache = [
 '/','/style.css',"https://kit.fontawesome.com/5c16ef8200.js","https://cdn.jsdelivr.net/npm/bulma-extensions@6.2.7/dist/js/bulma-extensions.min.js","https://cdn.jsdelivr.net/npm/bulma-extensions@6.2.7/bulma-steps/dist/js/bulma-steps.min.js",
 "https://cdn.rawgit.com/octoshrimpy/bulma-o-steps/master/bulma-steps.css","https://cdn.jsdelivr.net/npm/bulma-extensions@6.2.7/bulma-tooltip/dist/css/bulma-tooltip.min.css"
];
var Farmingitems = [
  "wheat",
  "carrot"
]
var images = [
  '/img/wheat.png',
  '/img/Farming.webp',
  "/img/hb.webp",
  "/img/bg.webp",
  "/img/carrot.png",
  "/img/carrotminion.png",
  "/img/Clay.png",
  "/img/Diamond_Sword.png",
  "/img/dirt.webp",
  "/img/ecarrot.webp",
  "/img/ecarrotstick.webp",
  "/img/egoldcarrot.webp",
  "/img/Enchanted_Bread.png",
  "/img/ebook.webp",
  "/img/enchanted_heybale.webp",
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
      console.log("Saved " + Farmingitems[x] + " For offline viewing")
    }
  }
}