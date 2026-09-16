import { _ as _sfc_main$1 } from './RedirectView-43b5b661.mjs';
import { useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from '../server.mjs';
import './useExternalRedirect-f37e259e.mjs';
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
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import '@supabase/supabase-js';

function ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_RedirectView = _sfc_main$1;
  _push(ssrRenderComponent(_component_RedirectView, _attrs, null, _parent));
}
const _sfc_main = {};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[first]/[second]/[short].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _short_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", ssrRender]]);

export { _short_ as default };
//# sourceMappingURL=_short_-eb42be7c.mjs.map
