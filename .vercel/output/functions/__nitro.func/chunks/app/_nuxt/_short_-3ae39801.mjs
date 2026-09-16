import { u as useExternalRedirect } from './useExternalRedirect-f37e259e.mjs';
import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';
import z from 'zod';
import { useRoute } from 'vue-router';
import '../../nitro/vercel.mjs';
import 'node:http';
import 'node:https';
import 'node:zlib';
import 'node:stream';
import 'node:buffer';
import 'node:util';
import 'node:url';
import 'node:net';
import 'node:fs';
import 'node:path';
import 'fs';
import 'path';
import '../server.mjs';
import 'unhead';
import '@unhead/shared';
import '@supabase/supabase-js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[short]",
  __ssrInlineRender: true,
  setup(__props) {
    const { params } = useRoute();
    const shortIsString = z.string().safeParse(params.short);
    if (!shortIsString.success) {
      throw new Error("Shortlink is not a string");
    }
    const short = shortIsString.data;
    useExternalRedirect(`https://github.com/izyumidev/${short}`);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex justify-center items-center h-screen w-screen bg-black text-white text-2xl" }, _attrs))}><p>Redirecting...</p></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/gh/[short].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_short_-3ae39801.mjs.map
