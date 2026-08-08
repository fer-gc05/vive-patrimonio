import { _ as _plugin_vue_export_helper_default } from '../virtual/entry.mjs';
import { u as useSupabase } from './useSupabase-CJzi35Kv.mjs';
import { I as ImageUpload_default } from './ImageUpload-Cv40pE3h.mjs';
import { defineComponent, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderComponent, ssrRenderClass } from 'vue/server-renderer';
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

//#region app/pages/admin/drinks.vue?vue&type=script&setup=true&lang.ts
var drinks_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "drinks",
	__ssrInlineRender: true,
	setup(__props) {
		useSupabase();
		const drinks = ref([]);
		ref(false);
		const showForm = ref(false);
		const editingDrink = ref(null);
		const form = ref({
			name: "",
			category: "margaritas",
			category_label: "Margarita",
			description: "",
			price: null,
			image_url: "",
			available: true,
			sort_order: 0
		});
		const categories = [
			{
				value: "margaritas",
				label: "Margaritas",
				categoryLabel: "Margarita"
			},
			{
				value: "daiquiris",
				label: "Daiquiris",
				categoryLabel: "Daiquiri"
			},
			{
				value: "clasicos",
				label: "Clásicos",
				categoryLabel: "Clásico"
			},
			{
				value: "sodas",
				label: "Sodas",
				categoryLabel: "Soda"
			},
			{
				value: "cervezas",
				label: "Cervezas",
				categoryLabel: "Cerveza"
			}
		];
		const formatPrice = (price) => {
			if (!price) return "-";
			return `$${price.toLocaleString("es-CO")}`;
		};
		return (_ctx, _push, _parent, _attrs) => {
			const _component_AdminImageUpload = ImageUpload_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-page" }, _attrs))} data-v-c097f1ee><div class="page-header" data-v-c097f1ee><div data-v-c097f1ee><h1 data-v-c097f1ee>Bebidas</h1><p data-v-c097f1ee>${ssrInterpolate(unref(drinks).length)} bebidas registradas</p></div><button class="btn-primary" data-v-c097f1ee>+ Agregar bebida</button></div>`);
			if (unref(showForm)) {
				_push(`<div class="modal-overlay" data-v-c097f1ee><div class="modal" data-v-c097f1ee><h2 data-v-c097f1ee>${ssrInterpolate(unref(editingDrink) ? "Editar bebida" : "Nueva bebida")}</h2><form data-v-c097f1ee><div class="form-grid" data-v-c097f1ee><div class="form-group" data-v-c097f1ee><label data-v-c097f1ee>Nombre</label><input${ssrRenderAttr("value", unref(form).name)} type="text" required data-v-c097f1ee></div><div class="form-group" data-v-c097f1ee><label data-v-c097f1ee>Categoría</label><select required data-v-c097f1ee><!--[-->`);
				ssrRenderList(categories, (cat) => {
					_push(`<option${ssrRenderAttr("value", cat.value)} data-v-c097f1ee${ssrIncludeBooleanAttr(Array.isArray(unref(form).category) ? ssrLooseContain(unref(form).category, cat.value) : ssrLooseEqual(unref(form).category, cat.value)) ? " selected" : ""}>${ssrInterpolate(cat.label)}</option>`);
				});
				_push(`<!--]--></select></div><div class="form-group full-width" data-v-c097f1ee><label data-v-c097f1ee>Descripción</label><textarea rows="3" data-v-c097f1ee>${ssrInterpolate(unref(form).description)}</textarea></div><div class="form-group" data-v-c097f1ee><label data-v-c097f1ee>Precio (COP)</label><input${ssrRenderAttr("value", unref(form).price)} type="number" min="0" data-v-c097f1ee></div><div class="form-group" data-v-c097f1ee><label data-v-c097f1ee>Orden</label><input${ssrRenderAttr("value", unref(form).sort_order)} type="number" min="0" data-v-c097f1ee></div><div class="form-group full-width" data-v-c097f1ee>`);
				_push(ssrRenderComponent(_component_AdminImageUpload, {
					modelValue: unref(form).image_url,
					"onUpdate:modelValue": ($event) => unref(form).image_url = $event,
					bucket: "drinks",
					label: "Imagen de la bebida"
				}, null, _parent));
				_push(`</div><div class="form-group" data-v-c097f1ee><label data-v-c097f1ee><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).available) ? ssrLooseContain(unref(form).available, null) : unref(form).available) ? " checked" : ""} type="checkbox" data-v-c097f1ee> Disponible </label></div></div><div class="form-actions" data-v-c097f1ee><button type="button" class="btn-secondary" data-v-c097f1ee>Cancelar</button><button type="submit" class="btn-primary" data-v-c097f1ee>Guardar</button></div></form></div></div>`);
			} else _push(`<!---->`);
			_push(`<div class="table-container" data-v-c097f1ee><table data-v-c097f1ee><thead data-v-c097f1ee><tr data-v-c097f1ee><th data-v-c097f1ee>Imagen</th><th data-v-c097f1ee>Nombre</th><th data-v-c097f1ee>Categoría</th><th data-v-c097f1ee>Precio</th><th data-v-c097f1ee>Disponible</th><th data-v-c097f1ee>Orden</th><th data-v-c097f1ee>Acciones</th></tr></thead><tbody data-v-c097f1ee><!--[-->`);
			ssrRenderList(unref(drinks), (drink) => {
				_push(`<tr data-v-c097f1ee><td data-v-c097f1ee><div class="image-cell" data-v-c097f1ee>`);
				if (drink.image_url) _push(`<img${ssrRenderAttr("src", drink.image_url)}${ssrRenderAttr("alt", drink.name)} data-v-c097f1ee>`);
				else _push(`<div class="no-image" data-v-c097f1ee>Sin imagen</div>`);
				_push(`</div></td><td class="name-cell" data-v-c097f1ee>${ssrInterpolate(drink.name)}</td><td data-v-c097f1ee>${ssrInterpolate(drink.category_label)}</td><td data-v-c097f1ee>${ssrInterpolate(formatPrice(drink.price))}</td><td data-v-c097f1ee><span class="${ssrRenderClass(["status", drink.available ? "available" : "unavailable"])}" data-v-c097f1ee>${ssrInterpolate(drink.available ? "Sí" : "No")}</span></td><td data-v-c097f1ee>${ssrInterpolate(drink.sort_order)}</td><td class="actions-cell" data-v-c097f1ee><button class="btn-icon" data-v-c097f1ee>✏️</button><button class="btn-icon danger" data-v-c097f1ee>🗑️</button></td></tr>`);
			});
			_push(`<!--]--></tbody></table></div></div>`);
		};
	}
});
//#endregion
//#region app/pages/admin/drinks.vue
var _sfc_setup = drinks_vue_vue_type_script_setup_true_lang_default.setup;
drinks_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/drinks.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var drinks_default = /*#__PURE__*/ _plugin_vue_export_helper_default(drinks_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-c097f1ee"]]);

export { drinks_default as default };
//# sourceMappingURL=drinks-DmjgiJYy.mjs.map
