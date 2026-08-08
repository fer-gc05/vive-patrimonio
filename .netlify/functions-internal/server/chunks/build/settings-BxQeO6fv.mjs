import { _ as _plugin_vue_export_helper_default } from '../virtual/entry.mjs';
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

//#region app/pages/admin/settings.vue?vue&type=script&setup=true&lang.ts
var settings_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "settings",
	__ssrInlineRender: true,
	setup(__props) {
		useSupabase();
		ref(null);
		ref(false);
		const saving = ref(false);
		const success = ref(false);
		const form = ref({
			whatsapp_number: "",
			instagram_url: "",
			hero_title: "",
			hero_subtitle: ""
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-page" }, _attrs))} data-v-5b02e856><div class="page-header" data-v-5b02e856><div data-v-5b02e856><h1 data-v-5b02e856>Configuración</h1><p data-v-5b02e856>Configuración general del sitio</p></div></div><div class="settings-card" data-v-5b02e856><form data-v-5b02e856><div class="form-section" data-v-5b02e856><h2 data-v-5b02e856>Redes sociales</h2><div class="form-grid" data-v-5b02e856><div class="form-group" data-v-5b02e856><label data-v-5b02e856>Número de WhatsApp</label><input${ssrRenderAttr("value", unref(form).whatsapp_number)} type="text" placeholder="573001234567" data-v-5b02e856><small data-v-5b02e856>Solo números, con código de país</small></div><div class="form-group" data-v-5b02e856><label data-v-5b02e856>URL de Instagram</label><input${ssrRenderAttr("value", unref(form).instagram_url)} type="url" placeholder="https://www.instagram.com/vivepatrimoni0/" data-v-5b02e856></div></div></div><div class="form-section" data-v-5b02e856><h2 data-v-5b02e856>Hero (inicio)</h2><div class="form-grid" data-v-5b02e856><div class="form-group full-width" data-v-5b02e856><label data-v-5b02e856>Título principal</label><input${ssrRenderAttr("value", unref(form).hero_title)} type="text" placeholder="Vive el río. Vive Patrimonio." data-v-5b02e856></div><div class="form-group full-width" data-v-5b02e856><label data-v-5b02e856>Subtítulo</label><textarea rows="3" placeholder="Una experiencia frente al río Sinú..." data-v-5b02e856>${ssrInterpolate(unref(form).hero_subtitle)}</textarea></div></div></div><div class="form-actions" data-v-5b02e856>`);
			if (unref(success)) _push(`<div class="success-message" data-v-5b02e856> ✓ Configuración guardada </div>`);
			else _push(`<!---->`);
			_push(`<button type="submit"${ssrIncludeBooleanAttr(unref(saving)) ? " disabled" : ""} class="btn-primary" data-v-5b02e856>${ssrInterpolate(unref(saving) ? "Guardando..." : "Guardar cambios")}</button></div></form></div></div>`);
		};
	}
});
//#endregion
//#region app/pages/admin/settings.vue
var _sfc_setup = settings_vue_vue_type_script_setup_true_lang_default.setup;
settings_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/settings.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var settings_default = /*#__PURE__*/ _plugin_vue_export_helper_default(settings_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-5b02e856"]]);

export { settings_default as default };
//# sourceMappingURL=settings-BxQeO6fv.mjs.map
