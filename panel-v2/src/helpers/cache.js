// Function to clear complete cache data
const clear_all_cache_data = () => {
  caches.keys().then((names) => {
    names.forEach((name) => {
      caches.delete(name);
    });
    console.log('clear all cache data');
  });
};

export {
  clear_all_cache_data
}