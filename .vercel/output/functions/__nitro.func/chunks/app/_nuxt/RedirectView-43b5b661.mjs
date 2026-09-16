import { defineComponent, withAsyncContext, mergeProps, useSSRContext } from 'vue';
import { d as useRoute, a as useSupabaseClient } from '../server.mjs';
import { ssrRenderAttrs } from 'vue/server-renderer';
import { u as useExternalRedirect } from './useExternalRedirect-f37e259e.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "RedirectView",
  __ssrInlineRender: true,
  props: {
    destination: {},
    short: {}
  },
  async setup(__props) {
    var _a;
    let __temp, __restore;
    const props = __props;
    if (props.destination) {
      useExternalRedirect(props.destination);
    } else {
      const { params } = useRoute();
      const supabase = useSupabaseClient();
      const paramsDepth = Object.keys(params).length;
      const short = (_a = props.short) != null ? _a : (() => {
        switch (paramsDepth) {
          case 2:
            return `${params.first}/${params.short}`;
          case 3:
            return `${params.first}/${params.second}/${params.short}`;
          default:
            return params.short;
        }
      })();
      const { data: exactData } = ([__temp, __restore] = withAsyncContext(() => supabase.from("shortlinks").select("*").eq("short", short).maybeSingle()), __temp = await __temp, __restore(), __temp);
      const now = /* @__PURE__ */ new Date();
      const expires = (exactData == null ? void 0 : exactData.expire) ? new Date(exactData.expire) : null;
      const expired = expires ? now > expires : false;
      if ((exactData == null ? void 0 : exactData.link) && !expired) {
        useExternalRedirect(exactData.link);
      } else if (expired) {
        useExternalRedirect();
      } else {
        const { data: startsWithData } = ([__temp, __restore] = withAsyncContext(() => supabase.from("shortlinks").select("*").like("short", `${short}%`).maybeSingle()), __temp = await __temp, __restore(), __temp);
        const expires2 = (startsWithData == null ? void 0 : startsWithData.expire) ? new Date(startsWithData.expire) : null;
        const expired2 = expires2 ? now > expires2 : false;
        if ((startsWithData == null ? void 0 : startsWithData.link) && !expired2) {
          useExternalRedirect(startsWithData.link);
        } else {
          useExternalRedirect();
        }
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex justify-center items-center h-screen w-screen bg-black text-white text-2xl" }, _attrs))}><p>Redirecting...</p></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/RedirectView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=RedirectView-43b5b661.mjs.map
