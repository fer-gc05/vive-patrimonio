import { _ as _plugin_vue_export_helper_default } from '../virtual/entry.mjs';
import { u as useSupabase } from './useSupabase-CJzi35Kv.mjs';
import { I as ImageUpload_default } from './ImageUpload-Cv40pE3h.mjs';
import { defineComponent, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
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

//#region app/pages/admin/tours.vue?vue&type=script&setup=true&lang.ts
var tours_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "tours",
	__ssrInlineRender: true,
	setup(__props) {
		useSupabase();
		const tours = ref([]);
		ref(false);
		const showForm = ref(false);
		const editingTour = ref(null);
		const form = ref({
			name: "",
			duration: "",
			type: "",
			description: "",
			price: null,
			image_url: "",
			whatsapp_message: "",
			available: true,
			sort_order: 0
		});
		const formatPrice = (price) => {
			if (!price) return "-";
			return `$${price.toLocaleString("es-CO")}`;
		};
		return (_ctx, _push, _parent, _attrs) => {
			const _component_AdminImageUpload = ImageUpload_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-page" }, _attrs))} data-v-5f757bf5><div class="page-header" data-v-5f757bf5><div data-v-5f757bf5><h1 data-v-5f757bf5>Tours</h1><p data-v-5f757bf5>${ssrInterpolate(unref(tours).length)} tours registrados</p></div><button class="btn-primary" data-v-5f757bf5>+ Agregar tour</button></div>`);
			if (unref(showForm)) {
				_push(`<div class="modal-overlay" data-v-5f757bf5><div class="modal" data-v-5f757bf5><h2 data-v-5f757bf5>${ssrInterpolate(unref(editingTour) ? "Editar tour" : "Nuevo tour")}</h2><form data-v-5f757bf5><div class="form-grid" data-v-5f757bf5><div class="form-group" data-v-5f757bf5><label data-v-5f757bf5>Nombre</label><input${ssrRenderAttr("value", unref(form).name)} type="text" required data-v-5f757bf5></div><div class="form-group" data-v-5f757bf5><label data-v-5f757bf5>Duración</label><input${ssrRenderAttr("value", unref(form).duration)} type="text" placeholder="45 MIN" required data-v-5f757bf5></div><div class="form-group" data-v-5f757bf5><label data-v-5f757bf5>Tipo</label><input${ssrRenderAttr("value", unref(form).type)} type="text" placeholder="GRUPAL" required data-v-5f757bf5></div><div class="form-group" data-v-5f757bf5><label data-v-5f757bf5>Precio (COP)</label><input${ssrRenderAttr("value", unref(form).price)} type="number" min="0" data-v-5f757bf5></div><div class="form-group full-width" data-v-5f757bf5><label data-v-5f757bf5>Descripción</label><textarea rows="3" data-v-5f757bf5>${ssrInterpolate(unref(form).description)}</textarea></div><div class="form-group full-width" data-v-5f757bf5>`);
				_push(ssrRenderComponent(_component_AdminImageUpload, {
					modelValue: unref(form).image_url,
					"onUpdate:modelValue": ($event) => unref(form).image_url = $event,
					bucket: "tours",
					label: "Imagen del tour"
				}, null, _parent));
				_push(`</div><div class="form-group full-width" data-v-5f757bf5><label data-v-5f757bf5>Mensaje de WhatsApp</label><input${ssrRenderAttr("value", unref(form).whatsapp_message)} type="text" placeholder="Hola, quiero reservar..." data-v-5f757bf5></div><div class="form-group" data-v-5f757bf5><label data-v-5f757bf5>Orden</label><input${ssrRenderAttr("value", unref(form).sort_order)} type="number" min="0" data-v-5f757bf5></div><div class="form-group" data-v-5f757bf5><label data-v-5f757bf5><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).available) ? ssrLooseContain(unref(form).available, null) : unref(form).available) ? " checked" : ""} type="checkbox" data-v-5f757bf5> Disponible </label></div></div><div class="form-actions" data-v-5f757bf5><button type="button" class="btn-secondary" data-v-5f757bf5>Cancelar</button><button type="submit" class="btn-primary" data-v-5f757bf5>Guardar</button></div></form></div></div>`);
			} else _push(`<!---->`);
			_push(`<div class="table-container" data-v-5f757bf5><table data-v-5f757bf5><thead data-v-5f757bf5><tr data-v-5f757bf5><th data-v-5f757bf5>Imagen</th><th data-v-5f757bf5>Nombre</th><th data-v-5f757bf5>Duración</th><th data-v-5f757bf5>Tipo</th><th data-v-5f757bf5>Precio</th><th data-v-5f757bf5>Disponible</th><th data-v-5f757bf5>Acciones</th></tr></thead><tbody data-v-5f757bf5><!--[-->`);
			ssrRenderList(unref(tours), (tour) => {
				_push(`<tr data-v-5f757bf5><td data-v-5f757bf5><div class="image-cell" data-v-5f757bf5>`);
				if (tour.image_url) _push(`<img${ssrRenderAttr("src", tour.image_url)}${ssrRenderAttr("alt", tour.name)} data-v-5f757bf5>`);
				else _push(`<div class="no-image" data-v-5f757bf5>Sin imagen</div>`);
				_push(`</div></td><td class="name-cell" data-v-5f757bf5>${ssrInterpolate(tour.name)}</td><td data-v-5f757bf5>${ssrInterpolate(tour.duration)}</td><td data-v-5f757bf5>${ssrInterpolate(tour.type)}</td><td data-v-5f757bf5>${ssrInterpolate(formatPrice(tour.price))}</td><td data-v-5f757bf5><span class="${ssrRenderClass(["status", tour.available ? "available" : "unavailable"])}" data-v-5f757bf5>${ssrInterpolate(tour.available ? "Sí" : "No")}</span></td><td class="actions-cell" data-v-5f757bf5><button class="btn-icon" data-v-5f757bf5>✏️</button><button class="btn-icon danger" data-v-5f757bf5>🗑️</button></td></tr>`);
			});
			_push(`<!--]--></tbody></table></div></div>`);
		};
	}
});
//#endregion
//#region app/pages/admin/tours.vue
var _sfc_setup = tours_vue_vue_type_script_setup_true_lang_default.setup;
tours_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/tours.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var tours_default = /*#__PURE__*/ _plugin_vue_export_helper_default(tours_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-5f757bf5"]]);

export { tours_default as default };
//# sourceMappingURL=tours-BtWztLWr.mjs.map
