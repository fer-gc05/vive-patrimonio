import { _ as _plugin_vue_export_helper_default } from '../virtual/entry.mjs';
import { u as useSupabase } from './useSupabase-CJzi35Kv.mjs';
import { defineComponent, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
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

//#region app/pages/admin/dishes.vue?vue&type=script&setup=true&lang.ts
var dishes_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "dishes",
	__ssrInlineRender: true,
	setup(__props) {
		useSupabase();
		const dishes = ref([]);
		ref(false);
		const showForm = ref(false);
		const editingDish = ref(null);
		const form = ref({
			name: "",
			category: "Entradas",
			description: "",
			price: null,
			sort_order: 0
		});
		const categories = [
			"Entradas",
			"Fuertes",
			"Postres"
		];
		const formatPrice = (price) => {
			if (!price) return "-";
			return `$${price.toLocaleString("es-CO")}`;
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-page" }, _attrs))} data-v-a7b42590><div class="page-header" data-v-a7b42590><div data-v-a7b42590><h1 data-v-a7b42590>Comida</h1><p data-v-a7b42590>${ssrInterpolate(unref(dishes).length)} platos registrados</p></div><button class="btn-primary" data-v-a7b42590>+ Agregar plato</button></div>`);
			if (unref(showForm)) {
				_push(`<div class="modal-overlay" data-v-a7b42590><div class="modal" data-v-a7b42590><h2 data-v-a7b42590>${ssrInterpolate(unref(editingDish) ? "Editar plato" : "Nuevo plato")}</h2><form data-v-a7b42590><div class="form-grid" data-v-a7b42590><div class="form-group" data-v-a7b42590><label data-v-a7b42590>Nombre</label><input${ssrRenderAttr("value", unref(form).name)} type="text" required data-v-a7b42590></div><div class="form-group" data-v-a7b42590><label data-v-a7b42590>Categoría</label><select required data-v-a7b42590><!--[-->`);
				ssrRenderList(categories, (cat) => {
					_push(`<option${ssrRenderAttr("value", cat)} data-v-a7b42590${ssrIncludeBooleanAttr(Array.isArray(unref(form).category) ? ssrLooseContain(unref(form).category, cat) : ssrLooseEqual(unref(form).category, cat)) ? " selected" : ""}>${ssrInterpolate(cat)}</option>`);
				});
				_push(`<!--]--></select></div><div class="form-group full-width" data-v-a7b42590><label data-v-a7b42590>Descripción</label><textarea rows="3" data-v-a7b42590>${ssrInterpolate(unref(form).description)}</textarea></div><div class="form-group" data-v-a7b42590><label data-v-a7b42590>Precio (COP)</label><input${ssrRenderAttr("value", unref(form).price)} type="number" min="0" data-v-a7b42590></div><div class="form-group" data-v-a7b42590><label data-v-a7b42590>Orden</label><input${ssrRenderAttr("value", unref(form).sort_order)} type="number" min="0" data-v-a7b42590></div></div><div class="form-actions" data-v-a7b42590><button type="button" class="btn-secondary" data-v-a7b42590>Cancelar</button><button type="submit" class="btn-primary" data-v-a7b42590>Guardar</button></div></form></div></div>`);
			} else _push(`<!---->`);
			_push(`<div class="table-container" data-v-a7b42590><table data-v-a7b42590><thead data-v-a7b42590><tr data-v-a7b42590><th data-v-a7b42590>Nombre</th><th data-v-a7b42590>Categoría</th><th data-v-a7b42590>Descripción</th><th data-v-a7b42590>Precio</th><th data-v-a7b42590>Orden</th><th data-v-a7b42590>Acciones</th></tr></thead><tbody data-v-a7b42590><!--[-->`);
			ssrRenderList(unref(dishes), (dish) => {
				_push(`<tr data-v-a7b42590><td class="name-cell" data-v-a7b42590>${ssrInterpolate(dish.name)}</td><td data-v-a7b42590>${ssrInterpolate(dish.category)}</td><td class="desc-cell" data-v-a7b42590>${ssrInterpolate(dish.description || "-")}</td><td data-v-a7b42590>${ssrInterpolate(formatPrice(dish.price))}</td><td data-v-a7b42590>${ssrInterpolate(dish.sort_order)}</td><td class="actions-cell" data-v-a7b42590><button class="btn-icon" data-v-a7b42590>✏️</button><button class="btn-icon danger" data-v-a7b42590>🗑️</button></td></tr>`);
			});
			_push(`<!--]--></tbody></table></div></div>`);
		};
	}
});
//#endregion
//#region app/pages/admin/dishes.vue
var _sfc_setup = dishes_vue_vue_type_script_setup_true_lang_default.setup;
dishes_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/dishes.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var dishes_default = /*#__PURE__*/ _plugin_vue_export_helper_default(dishes_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-a7b42590"]]);

export { dishes_default as default };
//# sourceMappingURL=dishes-yTyzdH-o.mjs.map
