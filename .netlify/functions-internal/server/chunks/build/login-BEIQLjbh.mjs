import { _ as _plugin_vue_export_helper_default, u as useRouter } from '../virtual/entry.mjs';
import { u as useSupabase } from './useSupabase-CJzi35Kv.mjs';
import { defineComponent, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
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

//#region app/pages/admin/login.vue?vue&type=script&setup=true&lang.ts
var login_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "login",
	__ssrInlineRender: true,
	setup(__props) {
		useSupabase();
		useRouter();
		const email = ref("");
		const password = ref("");
		const loading = ref(false);
		const error = ref("");
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "login-page" }, _attrs))} data-v-515113c0><div class="login-card" data-v-515113c0><h1 data-v-515113c0>Admin Login</h1><p data-v-515113c0>Vive Patrimonio</p><form data-v-515113c0><div class="form-group" data-v-515113c0><label for="email" data-v-515113c0>Email</label><input id="email"${ssrRenderAttr("value", unref(email))} type="email" required placeholder="admin@vivepatrimonio.com" data-v-515113c0></div><div class="form-group" data-v-515113c0><label for="password" data-v-515113c0>Contraseña</label><input id="password"${ssrRenderAttr("value", unref(password))} type="password" required placeholder="••••••••" data-v-515113c0></div>`);
			if (unref(error)) _push(`<div class="error-message" data-v-515113c0>${ssrInterpolate(unref(error))}</div>`);
			else _push(`<!---->`);
			_push(`<button type="submit"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="login-btn" data-v-515113c0>${ssrInterpolate(unref(loading) ? "Ingresando..." : "Ingresar")}</button></form></div></div>`);
		};
	}
});
//#endregion
//#region app/pages/admin/login.vue
var _sfc_setup = login_vue_vue_type_script_setup_true_lang_default.setup;
login_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/login.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var login_default = /*#__PURE__*/ _plugin_vue_export_helper_default(login_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-515113c0"]]);

export { login_default as default };
//# sourceMappingURL=login-BEIQLjbh.mjs.map
