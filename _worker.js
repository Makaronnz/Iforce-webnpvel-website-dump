export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Pass /assets requests to the static assets handler
    if (url.pathname.startsWith('/assets/')) {
      return env.ASSETS.fetch(request);
    }
    
    // Handle all other requests with Next.js
    return env.NEXT_ROUTER.fetch(request);
  },
};