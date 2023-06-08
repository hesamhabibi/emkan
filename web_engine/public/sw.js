/* Start the service worker and cache all of the app's content */
self.addEventListener('install', async event => {
    console.log('install event')
});
/* Serve cached content when offline */
self.addEventListener('fetch', async event => {
    console.log('fetch event')
});

self.addEventListener('appinstalled', (evt) => {
    console.log('a2hs installed');
});

// use the "Offline" checkbox in DevTools Network panel
self.addEventListener('online', handleConnection);
self.addEventListener('offline', handleConnection);

function handleConnection() {
    if (navigator.onLine) {
        isReachable(getServerUrl()).then(function(online) {
            if (online) {
                // handle online status
                console.log('online');
            } else {
                console.log('no connectivity');
            }
        });
    } else {
        // handle offline status
        console.log('offline');
    }
}

function isReachable(url) {
    /**
     * Note: fetch() still "succeeds" for 404s on subdirectories,
     * which is ok when only testing for domain reachability.
     *
     * Example:
     *   https://google.com/noexist does not throw
     *   https://noexist.com/noexist does throw
     */
    return fetch(url, { method: 'HEAD', mode: 'no-cors' })
        .then(function(resp) {
            return resp && (resp.ok || resp.type === 'opaque');
        })
        .catch(function(err) {
            console.warn('[conn test failure]:', err);
        });
}

function getServerUrl() {
    return document.getElementById('serverUrl').value || window.location.origin;
}

