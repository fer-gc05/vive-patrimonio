import { _ as _plugin_vue_export_helper_default } from '../virtual/entry.mjs';
import { N as NuxtLink } from './nuxt-link-CDddPynd.mjs';
import { u as useSupabase } from './useSupabase-CJzi35Kv.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
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

//#region app/pages/admin/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		useSupabase();
		const stats = ref({
			drinks: 0,
			dishes: 0,
			tours: 0,
			gallery: 0
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "dashboard" }, _attrs))} data-v-b6a018ff><h1 data-v-b6a018ff>Dashboard</h1><p class="subtitle" data-v-b6a018ff>Panel de administración de Vive Patrimonio</p><div class="stats-grid" data-v-b6a018ff><div class="stat-card" data-v-b6a018ff><div class="stat-icon" data-v-b6a018ff>🍹</div><div class="stat-content" data-v-b6a018ff><h3 data-v-b6a018ff>${ssrInterpolate(unref(stats).drinks)}</h3><p data-v-b6a018ff>Bebidas</p></div></div><div class="stat-card" data-v-b6a018ff><div class="stat-icon" data-v-b6a018ff>🍽️</div><div class="stat-content" data-v-b6a018ff><h3 data-v-b6a018ff>${ssrInterpolate(unref(stats).dishes)}</h3><p data-v-b6a018ff>Platos</p></div></div><div class="stat-card" data-v-b6a018ff><div class="stat-icon" data-v-b6a018ff>🚤</div><div class="stat-content" data-v-b6a018ff><h3 data-v-b6a018ff>${ssrInterpolate(unref(stats).tours)}</h3><p data-v-b6a018ff>Tours</p></div></div><div class="stat-card" data-v-b6a018ff><div class="stat-icon" data-v-b6a018ff>📷</div><div class="stat-content" data-v-b6a018ff><h3 data-v-b6a018ff>${ssrInterpolate(unref(stats).gallery)}</h3><p data-v-b6a018ff>Fotos</p></div></div></div><div class="quick-actions" data-v-b6a018ff><h2 data-v-b6a018ff>Acciones rápidas</h2><div class="actions-grid" data-v-b6a018ff>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/admin/drinks",
				class: "action-card"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<span class="action-icon" data-v-b6a018ff${_scopeId}>➕</span><span data-v-b6a018ff${_scopeId}>Agregar bebida</span>`);
					else return [createVNode("span", { class: "action-icon" }, "➕"), createVNode("span", null, "Agregar bebida")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/admin/dishes",
				class: "action-card"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<span class="action-icon" data-v-b6a018ff${_scopeId}>➕</span><span data-v-b6a018ff${_scopeId}>Agregar plato</span>`);
					else return [createVNode("span", { class: "action-icon" }, "➕"), createVNode("span", null, "Agregar plato")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/admin/tours",
				class: "action-card"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<span class="action-icon" data-v-b6a018ff${_scopeId}>➕</span><span data-v-b6a018ff${_scopeId}>Agregar tour</span>`);
					else return [createVNode("span", { class: "action-icon" }, "➕"), createVNode("span", null, "Agregar tour")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/admin/gallery",
				class: "action-card"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<span class="action-icon" data-v-b6a018ff${_scopeId}>📤</span><span data-v-b6a018ff${_scopeId}>Subir foto</span>`);
					else return [createVNode("span", { class: "action-icon" }, "📤"), createVNode("span", null, "Subir foto")];
				}),
				_: 1
			}, _parent));
			_push(`</div></div></div>`);
		};
	}
});
//#endregion
//#region app/pages/admin/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var admin_default = /*#__PURE__*/ _plugin_vue_export_helper_default(index_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-b6a018ff"]]);

export { admin_default as default };
//# sourceMappingURL=admin-EYbn2p3e.mjs.map
