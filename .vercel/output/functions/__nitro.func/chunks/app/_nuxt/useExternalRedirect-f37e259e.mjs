import { F as sendRedirect } from '../../nitro/vercel.mjs';
import { e as useNuxtApp } from '../server.mjs';

async function useExternalRedirect(url = "https://www.dhiar.my.id/", code = 302) {
  var _a, _b;
  {
    const nuxtApp = useNuxtApp();
    if ((_a = nuxtApp.ssrContext) == null ? void 0 : _a.event) {
      await nuxtApp.callHook("app:redirected");
      if ((_b = nuxtApp.ssrContext) == null ? void 0 : _b.event) {
        return sendRedirect(nuxtApp.ssrContext.event, url, code);
      }
    }
  }
  throw new Error("Failed to redirect");
}

export { useExternalRedirect as u };
//# sourceMappingURL=useExternalRedirect-f37e259e.mjs.map
