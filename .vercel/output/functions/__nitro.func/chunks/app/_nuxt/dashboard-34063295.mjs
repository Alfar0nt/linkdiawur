import script from './calendar.esm-88ccf8e2.mjs';
import { useSSRContext, defineComponent, unref, mergeProps, ref, computed, withAsyncContext, isRef, createElementBlock } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderList } from 'vue/server-renderer';
import { b as useSupabaseUser, a as useSupabaseClient } from '../server.mjs';
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

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "LinkItem",
  __ssrInlineRender: true,
  props: {
    shortlink: {},
    copy: { type: Function },
    startEditing: { type: Function },
    setQrcode: { type: Function }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<li${ssrRenderAttrs(mergeProps({ class: "flex justify-between flex-col" }, _attrs))}><div class="flex justify-between"><p>${ssrInterpolate(_ctx.shortlink.short)}</p><div class="flex"><button class="mr-2 text-green-500 p-1 rounded-md">Copy</button><button class="mr-2 text-gray-400 p-1 rounded-md">Edit</button><button class="p-1 rounded-md"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5Zm0 9.75c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5Zm9.75-9.75c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z"></path><path d="M6.75 6.75h.75v.75h-.75v-.75Zm0 9.75h.75v.75h-.75v-.75Zm9.75-9.75h.75v.75h-.75v-.75Zm-3 6.75h.75v.75h-.75v-.75Zm0 6h.75v.75h-.75v-.75Zm6-6h.75v.75h-.75v-.75Zm0 6h.75v.75h-.75v-.75Zm-3-3h.75v.75h-.75v-.75Z"></path></g></svg></button></div></div><p>${ssrInterpolate(_ctx.shortlink.link)}</p></li>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LinkItem.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  // eslint-disable-next-line vue/require-prop-types
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  setup(_, { slots, attrs }) {
    const mounted = ref(false);
    return (props) => {
      var _a;
      if (mounted.value) {
        return (_a = slots.default) == null ? void 0 : _a.call(slots);
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return slot();
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ShortlinkList",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const emptyShortlink = {
      id: "",
      short: "",
      link: "",
      expire: null
    };
    const query = ref("");
    const createDate = ref();
    ref(null);
    const domain = ref("");
    const qrcode = ref(false);
    const qrcodeValue = ref("");
    const qrcodeImage = ref("");
    computed(
      () => qrcodeValue.value ? `${domain.value}/${qrcodeValue.value}` : ""
    );
    const supabase = useSupabaseClient();
    const { data } = ([__temp, __restore] = withAsyncContext(() => supabase.from("shortlinks").select("*").order("created_at", { ascending: false })), __temp = await __temp, __restore(), __temp);
    const shortlinks = ref(data);
    const copy = (text) => {
      navigator.clipboard.writeText(`${window.location.origin}/${text}`);
      toast("Copied to clipboard");
    };
    const editing = ref(false);
    const editingShortlink = ref(emptyShortlink);
    const setEditing = (value) => {
      editing.value = value;
      if (!value) {
        editingShortlink.value = emptyShortlink;
      }
    };
    const startEditing = (id) => {
      setEditing(true);
      if (!shortlinks.value)
        return;
      const shortlink = shortlinks.value.find((link) => link.id === id);
      if (shortlink) {
        editingShortlink.value = {
          ...shortlink,
          expire: shortlink.expire ? new Date(shortlink.expire) : null
        };
      }
    };
    const creating = ref(false);
    const createShort = ref("");
    const createLink = ref("");
    const toastContainer = ref(null);
    const toast = (message) => {
      var _a;
      const toast2 = document.createElement("div");
      toast2.classList.add(
        "bg-zinc-800",
        "text-white",
        "rounded-md",
        "p-2",
        "cursor-pointer"
      );
      toast2.innerText = message;
      toast2.onclick = () => {
        toast2.remove();
      };
      (_a = toastContainer.value) == null ? void 0 : _a.appendChild(toast2);
      setTimeout(() => {
        toast2.remove();
      }, 3e3);
    };
    const setQrcode = async (bool, value) => {
      qrcode.value = bool;
      if (!bool || !value) {
        qrcodeValue.value = "";
        qrcodeImage.value = "";
        return;
      }
      qrcodeValue.value = value;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PCalendar = script;
      const _component_LinkItem = _sfc_main$2;
      const _component_ClientOnly = __nuxt_component_2;
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "w-full h-screen flex items-center flex-col relative" }, _attrs))}><h1>Shortlinks</h1><div class="mb-3" id="search"><input class="w-full rounded-md p-3 bg-zinc-700 text-white" type="text"${ssrRenderAttr("value", unref(query))} placeholder="Search"></div><div><ul><li id="add-shortlink">`);
      if (!unref(creating)) {
        _push(`<button class="text-green-500 p-1 w-full rounded-md">Create Shortlink</button>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(creating)) {
        _push(`<form><input class="w-full rounded-md p-2 bg-zinc-700 text-white" type="text"${ssrRenderAttr("value", unref(createShort))} placeholder="Short"><textarea class="w-full rounded-md p-2 bg-zinc-700 text-white mt-2" type="text" placeholder="Long Link">${ssrInterpolate(unref(createLink))}</textarea>`);
        _push(ssrRenderComponent(_component_PCalendar, {
          class: "mt-2 w-full rounded-md p-2 bg-zinc-700 text-white",
          modelValue: unref(createDate),
          "onUpdate:modelValue": ($event) => isRef(createDate) ? createDate.value = $event : null,
          "show-icon": "",
          "show-time": ""
        }, null, _parent));
        _push(`<div class="flex flex-row justify-center"><button class="text-gray-400 p-1 rounded-md">Cancel</button><button class="text-green-500 p-1 rounded-md">Add Shortlink</button></div></form>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</li><!--[-->`);
      ssrRenderList(unref(shortlinks), (shortlink) => {
        _push(ssrRenderComponent(_component_LinkItem, {
          shortlink,
          key: shortlink.short,
          copy,
          startEditing,
          setQrcode
        }, null, _parent));
      });
      _push(`<!--]--></ul></div>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`<div class="absolute bottom-0 right-0 p-3 flex flex-col gap-2" id="toast-container"></div></main>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ShortlinkList.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "dashboard",
  __ssrInlineRender: true,
  setup(__props) {
    const user = useSupabaseUser();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ShortlinkList = _sfc_main$1;
      _push(`<!--[-->`);
      if (unref(user)) {
        _push(ssrRenderComponent(_component_ShortlinkList, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (!unref(user)) {
        _push(`<div class="flex flex-col items-center justify-center h-screen"><button>Authenticate with GitHub</button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=dashboard-34063295.mjs.map
