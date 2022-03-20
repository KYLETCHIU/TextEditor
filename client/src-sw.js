const { CacheFirst, StaleWhileRevalidate } = require(`workbox-strategies`);
const { precacheAndRoute } = require(`workbox-precaching/precacheAndRoute`);
const { CacheableResponsePlugin } = require(`workbox-cacheable-response`);
const { ExpirationPlugin } = require(`workbox-expiration`);
const { warmStrategyCache } = require(`workbox-recipes`);
const { registerRoute } = require(`workbox-routing`);

precacheAndRoute(self.__WB_MANIFEST);

//cache
const pageCache = new CacheFirst({

  cacheName: `page-cache`,
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],

});

warmStrategyCache({

  urls: [`/index.html`, `/`],
  strategy: pageCache,

});

registerRoute(({ request }) => request.mode === `navigate`, pageCache);

//Set-up
registerRoute(

  ({ request }) => [`style`, `script`, `worker`].includes(request.destination),
  new StaleWhileRevalidate({
    cacheName: `asset-cache`,
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
  
);
