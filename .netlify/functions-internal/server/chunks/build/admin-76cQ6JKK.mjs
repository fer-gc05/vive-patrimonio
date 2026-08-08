import { _ as _plugin_vue_export_helper_default, u as useRouter } from '../virtual/entry.mjs';
import { N as NuxtLink } from './nuxt-link-CDddPynd.mjs';
import { u as useSupabase } from './useSupabase-CJzi35Kv.mjs';
import { defineComponent, ref, unref, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import 'nostics';
import 'nostics/formatters/ansi';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '../routes/renderer.mjs';
import 'unhead/server';
import 'unhead/legacy';
import 'unhead/plugins';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import 'vue-router';
import 'unhead/utils';
import '@supabase/supabase-js';

//#region app/layouts/admin.vue?vue&type=script&setup=true&lang.ts
var admin_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "admin",
	__ssrInlineRender: true,
	setup(__props) {
		useSupabase();
		useRouter();
		const user = ref(null);
		const loading = ref(true);
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			if (unref(loading)) _push(`<div${ssrRenderAttrs(mergeProps({ class: "loading-screen" }, _attrs))} data-v-a8d10816><div class="spinner" data-v-a8d10816></div></div>`);
			else {
				_push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-layout" }, _attrs))} data-v-a8d10816><aside class="sidebar" data-v-a8d10816><div class="sidebar-header" data-v-a8d10816><h2 data-v-a8d10816>Admin Panel</h2>`);
				if (unref(user)) _push(`<p data-v-a8d10816>${ssrInterpolate(unref(user).email)}</p>`);
				else _push(`<!---->`);
				_push(`</div><nav class="sidebar-nav" data-v-a8d10816>`);
				_push(ssrRenderComponent(_component_NuxtLink, { to: "/admin" }, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Dashboard`);
						else return [createTextVNode("Dashboard")];
					}),
					_: 1
				}, _parent));
				_push(ssrRenderComponent(_component_NuxtLink, { to: "/admin/drinks" }, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Bebidas`);
						else return [createTextVNode("Bebidas")];
					}),
					_: 1
				}, _parent));
				_push(ssrRenderComponent(_component_NuxtLink, { to: "/admin/dishes" }, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Comida`);
						else return [createTextVNode("Comida")];
					}),
					_: 1
				}, _parent));
				_push(ssrRenderComponent(_component_NuxtLink, { to: "/admin/tours" }, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Tours`);
						else return [createTextVNode("Tours")];
					}),
					_: 1
				}, _parent));
				_push(ssrRenderComponent(_component_NuxtLink, { to: "/admin/gallery" }, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Galería`);
						else return [createTextVNode("Galería")];
					}),
					_: 1
				}, _parent));
				_push(ssrRenderComponent(_component_NuxtLink, { to: "/admin/settings" }, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Configuración`);
						else return [createTextVNode("Configuración")];
					}),
					_: 1
				}, _parent));
				_push(`</nav><div class="sidebar-footer" data-v-a8d10816>`);
				_push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Ver sitio`);
						else return [createTextVNode("Ver sitio")];
					}),
					_: 1
				}, _parent));
				_push(`<button class="logout-btn" data-v-a8d10816>Cerrar sesión</button></div></aside><main class="admin-main" data-v-a8d10816>`);
				ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
				_push(`</main></div>`);
			}
		};
	}
});
//#endregion
//#region app/layouts/admin.vue
var _sfc_setup = admin_vue_vue_type_script_setup_true_lang_default.setup;
admin_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/admin.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var admin_default = /*#__PURE__*/ _plugin_vue_export_helper_default(admin_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-a8d10816"]]);

export { admin_default as default };
//# sourceMappingURL=admin-76cQ6JKK.mjs.map
