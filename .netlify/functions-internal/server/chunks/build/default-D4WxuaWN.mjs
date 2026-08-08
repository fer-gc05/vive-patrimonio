import { _ as _plugin_vue_export_helper_default } from '../virtual/entry.mjs';
import { defineComponent, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrRenderAttr, ssrRenderClass, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
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

//#region app/components/layout/AppHeader.vue?vue&type=script&setup=true&lang.ts
var AppHeader_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AppHeader",
	__ssrInlineRender: true,
	setup(__props) {
		const isOpen = ref(false);
		const navLinks = [
			{
				label: "Inicio",
				href: "#inicio"
			},
			{
				label: "Bebidas",
				href: "#carta"
			},
			{
				label: "Comida",
				href: "#comida"
			},
			{
				label: "Tours",
				href: "#tours"
			},
			{
				label: "Experiencia",
				href: "#experiencia"
			},
			{
				label: "Galería",
				href: "#galeria"
			},
			{
				label: "Contacto",
				href: "#contacto"
			}
		];
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<header${ssrRenderAttrs(mergeProps({ class: "header" }, _attrs))} data-v-afd6bf74><a href="#inicio" class="logo" data-v-afd6bf74><span class="logo-vp" data-v-afd6bf74>VP</span><span class="logo-text" data-v-afd6bf74><strong data-v-afd6bf74>VIVE</strong><small data-v-afd6bf74>PATRIMONIO</small></span></a><button class="menu-button" aria-label="Abrir menú"${ssrRenderAttr("aria-expanded", unref(isOpen))} data-v-afd6bf74><span data-v-afd6bf74></span><span data-v-afd6bf74></span><span data-v-afd6bf74></span></button><nav class="${ssrRenderClass([{ open: unref(isOpen) }, "nav"])}" id="nav" data-v-afd6bf74><!--[-->`);
			ssrRenderList(navLinks, (link) => {
				_push(`<a${ssrRenderAttr("href", link.href)} data-v-afd6bf74>${ssrInterpolate(link.label)}</a>`);
			});
			_push(`<!--]--></nav></header>`);
		};
	}
});
//#endregion
//#region app/components/layout/AppHeader.vue
var _sfc_setup$3 = AppHeader_vue_vue_type_script_setup_true_lang_default.setup;
AppHeader_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/AppHeader.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var AppHeader_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(AppHeader_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-afd6bf74"]]), { __name: "LayoutAppHeader" });
//#endregion
//#region app/components/layout/AppFooter.vue?vue&type=script&setup=true&lang.ts
var AppFooter_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AppFooter",
	__ssrInlineRender: true,
	setup(__props) {
		const year = (/* @__PURE__ */ new Date()).getFullYear();
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<footer${ssrRenderAttrs(_attrs)} data-v-8c76e83a><div class="footer-logo" data-v-8c76e83a> VIVE <span data-v-8c76e83a>PATRIMONIO</span></div><p data-v-8c76e83a>Bar &amp; Restaurante &amp; Tours · Río Sinú</p><small data-v-8c76e83a>© ${ssrInterpolate(unref(year))} Vive Patrimonio</small></footer>`);
		};
	}
});
//#endregion
//#region app/components/layout/AppFooter.vue
var _sfc_setup$2 = AppFooter_vue_vue_type_script_setup_true_lang_default.setup;
AppFooter_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/AppFooter.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var AppFooter_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(AppFooter_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-8c76e83a"]]), { __name: "LayoutAppFooter" });
//#endregion
//#region app/components/layout/WhatsAppFloat.vue?vue&type=script&setup=true&lang.ts
var whatsappLink = "https://wa.me/573001234567";
var WhatsAppFloat_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "WhatsAppFloat",
	__ssrInlineRender: true,
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<a${ssrRenderAttrs(mergeProps({
				href: whatsappLink,
				class: "float-wa",
				"aria-label": "Escribir por WhatsApp",
				target: "_blank",
				rel: "noopener"
			}, _attrs))} data-v-4df99d01><svg viewBox="0 0 24 24" fill="currentColor" data-v-4df99d01><path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm5.7 14.2c-.2.6-1.4 1.2-1.9 1.3-.5.1-1.1.1-1.8-.1-.4-.1-1-.3-1.7-.6-2.9-1.3-4.8-4.2-5-4.4-.1-.2-1.2-1.6-1.2-3s.8-2.1 1-2.4c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5.2.6.8 2 .9 2.1.1.2.1.4 0 .6-.1.2-.1.3-.3.5l-.4.5c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.6-.1.2-.2.7-.8.9-1.1.2-.3.4-.2.6-.1.2.1 1.6.8 1.9 1 .3.1.5.2.5.3.1.2.1.7-.1 1.3z" data-v-4df99d01></path></svg></a>`);
		};
	}
});
//#endregion
//#region app/components/layout/WhatsAppFloat.vue
var _sfc_setup$1 = WhatsAppFloat_vue_vue_type_script_setup_true_lang_default.setup;
WhatsAppFloat_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/WhatsAppFloat.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var WhatsAppFloat_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(WhatsAppFloat_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-4df99d01"]]), { __name: "LayoutWhatsAppFloat" });
//#endregion
//#region app/layouts/default.vue
var _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
	const _component_LayoutAppHeader = AppHeader_default;
	const _component_LayoutAppFooter = AppFooter_default;
	const _component_LayoutWhatsAppFloat = WhatsAppFloat_default;
	_push(`<div${ssrRenderAttrs(_attrs)}>`);
	_push(ssrRenderComponent(_component_LayoutAppHeader, null, null, _parent));
	ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
	_push(ssrRenderComponent(_component_LayoutAppFooter, null, null, _parent));
	_push(ssrRenderComponent(_component_LayoutWhatsAppFloat, null, null, _parent));
	_push(`</div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var default_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { default_default as default };
//# sourceMappingURL=default-D4WxuaWN.mjs.map
