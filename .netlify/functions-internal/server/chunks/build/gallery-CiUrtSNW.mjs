import { _ as _plugin_vue_export_helper_default } from '../virtual/entry.mjs';
import { u as useSupabase } from './useSupabase-CJzi35Kv.mjs';
import { I as ImageUpload_default } from './ImageUpload-Cv40pE3h.mjs';
import { defineComponent, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderAttr, ssrRenderList } from 'vue/server-renderer';
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

//#region app/pages/admin/gallery.vue?vue&type=script&setup=true&lang.ts
var gallery_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "gallery",
	__ssrInlineRender: true,
	setup(__props) {
		useSupabase();
		const images = ref([]);
		ref(false);
		const showForm = ref(false);
		const editingImage = ref(null);
		const form = ref({
			image_url: "",
			alt: "",
			sort_order: 0
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_AdminImageUpload = ImageUpload_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-page" }, _attrs))} data-v-b93ca160><div class="page-header" data-v-b93ca160><div data-v-b93ca160><h1 data-v-b93ca160>Galería</h1><p data-v-b93ca160>${ssrInterpolate(unref(images).length)} imágenes registradas</p></div><button class="btn-primary" data-v-b93ca160>+ Agregar imagen</button></div>`);
			if (unref(showForm)) {
				_push(`<div class="modal-overlay" data-v-b93ca160><div class="modal" data-v-b93ca160><h2 data-v-b93ca160>${ssrInterpolate(unref(editingImage) ? "Editar imagen" : "Nueva imagen")}</h2><form data-v-b93ca160><div class="form-grid" data-v-b93ca160><div class="form-group full-width" data-v-b93ca160>`);
				_push(ssrRenderComponent(_component_AdminImageUpload, {
					modelValue: unref(form).image_url,
					"onUpdate:modelValue": ($event) => unref(form).image_url = $event,
					bucket: "gallery",
					label: "Imagen de galería"
				}, null, _parent));
				_push(`</div><div class="form-group full-width" data-v-b93ca160><label data-v-b93ca160>Texto alternativo (alt)</label><input${ssrRenderAttr("value", unref(form).alt)} type="text" placeholder="Descripción de la imagen" data-v-b93ca160></div><div class="form-group" data-v-b93ca160><label data-v-b93ca160>Orden</label><input${ssrRenderAttr("value", unref(form).sort_order)} type="number" min="0" data-v-b93ca160></div></div><div class="form-actions" data-v-b93ca160><button type="button" class="btn-secondary" data-v-b93ca160>Cancelar</button><button type="submit" class="btn-primary" data-v-b93ca160>Guardar</button></div></form></div></div>`);
			} else _push(`<!---->`);
			_push(`<div class="gallery-grid" data-v-b93ca160><!--[-->`);
			ssrRenderList(unref(images), (image) => {
				_push(`<div class="gallery-item" data-v-b93ca160><img${ssrRenderAttr("src", image.image_url)}${ssrRenderAttr("alt", image.alt)} data-v-b93ca160><div class="gallery-overlay" data-v-b93ca160><p data-v-b93ca160>${ssrInterpolate(image.alt || "Sin descripción")}</p><div class="gallery-actions" data-v-b93ca160><button class="btn-icon" data-v-b93ca160>✏️</button><button class="btn-icon danger" data-v-b93ca160>🗑️</button></div></div></div>`);
			});
			_push(`<!--]--></div></div>`);
		};
	}
});
//#endregion
//#region app/pages/admin/gallery.vue
var _sfc_setup = gallery_vue_vue_type_script_setup_true_lang_default.setup;
gallery_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/gallery.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var gallery_default = /*#__PURE__*/ _plugin_vue_export_helper_default(gallery_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-b93ca160"]]);

export { gallery_default as default };
//# sourceMappingURL=gallery-CiUrtSNW.mjs.map
