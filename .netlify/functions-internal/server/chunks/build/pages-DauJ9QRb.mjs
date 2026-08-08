import { a as useSeoMeta$1, _ as _plugin_vue_export_helper_default } from '../virtual/entry.mjs';
import { u as useSupabase } from './useSupabase-CJzi35Kv.mjs';
import { defineComponent, mergeProps, withCtx, createTextVNode, ref, computed, unref, watch, useSSRContext } from 'vue';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrRenderSlot, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
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
import 'vue-router';
import 'unhead/plugins';
import 'unhead/utils';
import '@supabase/supabase-js';
import 'unhead/server';
import 'unhead/legacy';
import 'vue-bundle-renderer/runtime';
import 'devalue';

//#region app/components/ui/MainButton.vue?vue&type=script&setup=true&lang.ts
var MainButton_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "MainButton",
	__ssrInlineRender: true,
	props: { href: {} },
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<a${ssrRenderAttrs(mergeProps({
				class: "main-button",
				href: __props.href
			}, _attrs))} data-v-263201a2>`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</a>`);
		};
	}
});
//#endregion
//#region app/components/ui/MainButton.vue
var _sfc_setup$16 = MainButton_vue_vue_type_script_setup_true_lang_default.setup;
MainButton_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/MainButton.vue");
	return _sfc_setup$16 ? _sfc_setup$16(props, ctx) : void 0;
};
var MainButton_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(MainButton_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-263201a2"]]), { __name: "UiMainButton" });
//#endregion
//#region app/components/ui/GhostButton.vue?vue&type=script&setup=true&lang.ts
var GhostButton_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "GhostButton",
	__ssrInlineRender: true,
	props: { href: {} },
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<a${ssrRenderAttrs(mergeProps({
				class: "ghost-button",
				href: __props.href
			}, _attrs))} data-v-cd33f120>`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</a>`);
		};
	}
});
//#endregion
//#region app/components/ui/GhostButton.vue
var _sfc_setup$15 = GhostButton_vue_vue_type_script_setup_true_lang_default.setup;
GhostButton_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/GhostButton.vue");
	return _sfc_setup$15 ? _sfc_setup$15(props, ctx) : void 0;
};
var GhostButton_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(GhostButton_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-cd33f120"]]), { __name: "UiGhostButton" });
//#endregion
//#region \0virtual:public?%2Fimg%2Fhero.jpg
var _virtual_public__2Fimg_2Fhero_default = publicAssetsURL("/img/hero.jpg");
//#endregion
//#region \0virtual:public?%2Fvideo%2Fvive-patrimonio.mp4
var _virtual_public__2Fvideo_2Fvive_patrimonio_default = publicAssetsURL("/video/vive-patrimonio.mp4");
//#endregion
//#region app/components/home/HeroSection.vue
var _sfc_main$3 = {};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs) {
	const _component_UiMainButton = MainButton_default;
	const _component_UiGhostButton = GhostButton_default;
	_push(`<section${ssrRenderAttrs(mergeProps({
		class: "hero",
		id: "inicio"
	}, _attrs))} data-v-ffb9f2f7><video class="hero-video" autoplay muted loop playsinline${ssrRenderAttr("poster", _virtual_public__2Fimg_2Fhero_default)} aria-hidden="true" data-v-ffb9f2f7><source${ssrRenderAttr("src", _virtual_public__2Fvideo_2Fvive_patrimonio_default)} type="video/mp4" data-v-ffb9f2f7></video><img${ssrRenderAttr("src", _virtual_public__2Fimg_2Fhero_default)} alt="Vive Patrimonio sobre el río Sinú" class="hero-image" data-v-ffb9f2f7><div class="hero-overlay" data-v-ffb9f2f7></div><div class="hero-content" data-v-ffb9f2f7><span class="eyebrow" data-v-ffb9f2f7>BAR · RESTAURANTE · TOURS · RÍO SINÚ</span><h1 data-v-ffb9f2f7>Vive el río.<br data-v-ffb9f2f7><em data-v-ffb9f2f7>Vive Patrimonio.</em></h1><p data-v-ffb9f2f7> Una experiencia frente al río Sinú, acompañada de bebidas, sabores, tours en lancha y atardeceres inolvidables. </p><div class="hero-actions" data-v-ffb9f2f7>`);
	_push(ssrRenderComponent(_component_UiMainButton, { href: "#carta" }, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) _push(`VER CARTA`);
			else return [createTextVNode("VER CARTA")];
		}),
		_: 1
	}, _parent));
	_push(ssrRenderComponent(_component_UiGhostButton, { href: "#tours" }, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) _push(`VER TOURS`);
			else return [createTextVNode("VER TOURS")];
		}),
		_: 1
	}, _parent));
	_push(`</div></div><div class="scroll" data-v-ffb9f2f7>DESLIZA ↓</div></section>`);
}
var _sfc_setup$14 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/HeroSection.vue");
	return _sfc_setup$14 ? _sfc_setup$14(props, ctx) : void 0;
};
var HeroSection_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main$3, [["ssrRender", _sfc_ssrRender$3], ["__scopeId", "data-v-ffb9f2f7"]]), { __name: "HomeHeroSection" });
//#endregion
//#region app/components/ui/SectionLabel.vue
var _sfc_main$2 = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
	_push(`<span${ssrRenderAttrs(mergeProps({ class: "section-label" }, _attrs))} data-v-61ead0c3>`);
	ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
	_push(`</span>`);
}
var _sfc_setup$13 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/SectionLabel.vue");
	return _sfc_setup$13 ? _sfc_setup$13(props, ctx) : void 0;
};
var SectionLabel_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2], ["__scopeId", "data-v-61ead0c3"]]), { __name: "UiSectionLabel" });
//#endregion
//#region app/components/home/PresentationSection.vue
var _sfc_main$1 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
	const _component_UiSectionLabel = SectionLabel_default;
	_push(`<section${ssrRenderAttrs(mergeProps({ class: "presentation" }, _attrs))} data-v-9d0cd732>`);
	_push(ssrRenderComponent(_component_UiSectionLabel, null, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) _push(`Nuestra carta`);
			else return [createTextVNode("Nuestra carta")];
		}),
		_: 1
	}, _parent));
	_push(`<h2 data-v-9d0cd732>Una bebida para cada <span data-v-9d0cd732>momento</span></h2><p data-v-9d0cd732>Descubre nuestra selección de margaritas, daiquiris, clásicos, sodas y cervezas.</p></section>`);
}
var _sfc_setup$12 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/PresentationSection.vue");
	return _sfc_setup$12 ? _sfc_setup$12(props, ctx) : void 0;
};
var PresentationSection_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-9d0cd732"]]), { __name: "HomePresentationSection" });
//#endregion
//#region app/components/ui/CategoryFilter.vue?vue&type=script&setup=true&lang.ts
var CategoryFilter_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "CategoryFilter",
	__ssrInlineRender: true,
	props: {
		categories: {},
		active: {}
	},
	emits: ["select"],
	setup(__props, { emit: __emit }) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "categories" }, _attrs))} data-v-85df610c><!--[-->`);
			ssrRenderList(__props.categories, (category) => {
				_push(`<button class="${ssrRenderClass([{ active: __props.active === category.key }, "category"])}" data-v-85df610c>${ssrInterpolate(category.label)}</button>`);
			});
			_push(`<!--]--></div>`);
		};
	}
});
//#endregion
//#region app/components/ui/CategoryFilter.vue
var _sfc_setup$11 = CategoryFilter_vue_vue_type_script_setup_true_lang_default.setup;
CategoryFilter_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/CategoryFilter.vue");
	return _sfc_setup$11 ? _sfc_setup$11(props, ctx) : void 0;
};
var CategoryFilter_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(CategoryFilter_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-85df610c"]]), { __name: "UiCategoryFilter" });
//#endregion
//#region app/components/ui/DrinkCard.vue?vue&type=script&setup=true&lang.ts
var DrinkCard_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "DrinkCard",
	__ssrInlineRender: true,
	props: { drink: {} },
	setup(__props) {
		const props = __props;
		const hasError = ref(false);
		watch(() => props.drink.image, () => {
			hasError.value = false;
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<article${ssrRenderAttrs(mergeProps({
				class: "drink",
				"data-reveal": ""
			}, _attrs))} data-v-3b7e3994><div class="${ssrRenderClass([{ "no-photo": !__props.drink.image || unref(hasError) }, "drink-photo"])}" data-v-3b7e3994>`);
			if (__props.drink.image) _push(`<img${ssrRenderAttr("src", __props.drink.image)}${ssrRenderAttr("alt", __props.drink.name)} loading="lazy" data-v-3b7e3994>`);
			else _push(`<!---->`);
			_push(`<span data-v-3b7e3994>${ssrInterpolate(__props.drink.categoryLabel)}</span></div><div class="drink-content" data-v-3b7e3994><h3 data-v-3b7e3994>${ssrInterpolate(__props.drink.name)}</h3><p data-v-3b7e3994>${ssrInterpolate(__props.drink.description)}</p></div></article>`);
		};
	}
});
//#endregion
//#region app/components/ui/DrinkCard.vue
var _sfc_setup$10 = DrinkCard_vue_vue_type_script_setup_true_lang_default.setup;
DrinkCard_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/DrinkCard.vue");
	return _sfc_setup$10 ? _sfc_setup$10(props, ctx) : void 0;
};
var DrinkCard_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(DrinkCard_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-3b7e3994"]]), { __name: "UiDrinkCard" });
//#endregion
//#region app/composables/useDrinks.ts
var useDrinks = () => {
	const supabase = useSupabase();
	const fetchDrinks = async () => {
		const { data, error } = await supabase.from("drinks").select("*").eq("available", true).order("sort_order", { ascending: true });
		if (error) {
			console.error("Error fetching drinks:", error);
			return [];
		}
		return data;
	};
	return {
		fetchDrinks,
		categories: [
			{
				key: "todos",
				label: "Todas"
			},
			{
				key: "margaritas",
				label: "Margaritas"
			},
			{
				key: "daiquiris",
				label: "Daiquiris"
			},
			{
				key: "clasicos",
				label: "Clásicos"
			},
			{
				key: "sodas",
				label: "Sodas"
			},
			{
				key: "cervezas",
				label: "Cervezas"
			}
		]
	};
};
//#endregion
//#region app/components/home/DrinksSection.vue?vue&type=script&setup=true&lang.ts
var DrinksSection_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "DrinksSection",
	__ssrInlineRender: true,
	setup(__props) {
		const { categories } = useDrinks();
		const drinks = ref([]);
		const activeCategory = ref("todos");
		const filteredDrinks = computed(() => {
			if (activeCategory.value === "todos") return drinks.value;
			return drinks.value.filter((drink) => drink.category === activeCategory.value);
		});
		const selectCategory = (key) => {
			activeCategory.value = key;
		};
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UiSectionLabel = SectionLabel_default;
			const _component_UiCategoryFilter = CategoryFilter_default;
			const _component_UiDrinkCard = DrinkCard_default;
			_push(`<section${ssrRenderAttrs(mergeProps({
				class: "menu",
				id: "carta"
			}, _attrs))} data-v-13f11c36><div class="menu-header" data-v-13f11c36>`);
			_push(ssrRenderComponent(_component_UiSectionLabel, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Carta de bebidas`);
					else return [createTextVNode("Carta de bebidas")];
				}),
				_: 1
			}, _parent));
			_push(`<h2 data-v-13f11c36>Elige tu bebida</h2><p data-v-13f11c36>Explora nuestras categorías y descubre cada preparación.</p></div>`);
			_push(ssrRenderComponent(_component_UiCategoryFilter, {
				categories: unref(categories),
				active: unref(activeCategory),
				onSelect: selectCategory
			}, null, _parent));
			_push(`<div class="drinks-grid" data-v-13f11c36><!--[-->`);
			ssrRenderList(unref(filteredDrinks), (drink) => {
				_push(ssrRenderComponent(_component_UiDrinkCard, {
					key: drink.id,
					drink
				}, null, _parent));
			});
			_push(`<!--]--></div></section>`);
		};
	}
});
//#endregion
//#region app/components/home/DrinksSection.vue
var _sfc_setup$9 = DrinksSection_vue_vue_type_script_setup_true_lang_default.setup;
DrinksSection_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/DrinksSection.vue");
	return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
var DrinksSection_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(DrinksSection_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-13f11c36"]]), { __name: "HomeDrinksSection" });
//#endregion
//#region app/components/ui/FoodItem.vue?vue&type=script&setup=true&lang.ts
var FoodItem_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "FoodItem",
	__ssrInlineRender: true,
	props: { item: {} },
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<li${ssrRenderAttrs(_attrs)} data-v-2be4dd1b><div class="food-row" data-v-2be4dd1b><span class="food-name" data-v-2be4dd1b>${ssrInterpolate(__props.item.name)}</span><span class="food-dots" data-v-2be4dd1b></span><span class="food-price" data-v-2be4dd1b>${ssrInterpolate(__props.item.price)}</span></div>`);
			if (__props.item.description) _push(`<p class="food-desc" data-v-2be4dd1b>${ssrInterpolate(__props.item.description)}</p>`);
			else _push(`<!---->`);
			_push(`</li>`);
		};
	}
});
//#endregion
//#region app/components/ui/FoodItem.vue
var _sfc_setup$8 = FoodItem_vue_vue_type_script_setup_true_lang_default.setup;
FoodItem_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/FoodItem.vue");
	return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
var FoodItem_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(FoodItem_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-2be4dd1b"]]), { __name: "UiFoodItem" });
//#endregion
//#region app/components/ui/FoodGroup.vue?vue&type=script&setup=true&lang.ts
var FoodGroup_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "FoodGroup",
	__ssrInlineRender: true,
	props: { group: {} },
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UiFoodItem = FoodItem_default;
			_push(`<div${ssrRenderAttrs(mergeProps({
				class: "food-group",
				"data-reveal": ""
			}, _attrs))} data-v-8d088977><h3 class="food-group-title" data-v-8d088977>${ssrInterpolate(__props.group.group)}</h3><ul class="food-list" data-v-8d088977><!--[-->`);
			ssrRenderList(__props.group.items, (item, index) => {
				_push(ssrRenderComponent(_component_UiFoodItem, {
					key: `${item.name}-${index}`,
					item
				}, null, _parent));
			});
			_push(`<!--]--></ul></div>`);
		};
	}
});
//#endregion
//#region app/components/ui/FoodGroup.vue
var _sfc_setup$7 = FoodGroup_vue_vue_type_script_setup_true_lang_default.setup;
FoodGroup_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/FoodGroup.vue");
	return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
var FoodGroup_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(FoodGroup_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-8d088977"]]), { __name: "UiFoodGroup" });
//#endregion
//#region app/composables/useDishes.ts
var useDishes = () => {
	const supabase = useSupabase();
	const fetchDishes = async () => {
		const { data, error } = await supabase.from("dishes").select("*").order("sort_order", { ascending: true });
		if (error) {
			console.error("Error fetching dishes:", error);
			return [];
		}
		const grouped = {};
		data.forEach((dish) => {
			if (!grouped[dish.category]) grouped[dish.category] = [];
			grouped[dish.category].push(dish);
		});
		return Object.entries(grouped).map(([group, items]) => ({
			group,
			items
		}));
	};
	return { fetchDishes };
};
//#endregion
//#region app/components/home/FoodSection.vue?vue&type=script&setup=true&lang.ts
var FoodSection_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "FoodSection",
	__ssrInlineRender: true,
	setup(__props) {
		useDishes();
		const foodGroups = ref([]);
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UiSectionLabel = SectionLabel_default;
			const _component_UiFoodGroup = FoodGroup_default;
			_push(`<section${ssrRenderAttrs(mergeProps({
				class: "food",
				id: "comida"
			}, _attrs))} data-v-504f3791><div class="menu-header" data-v-504f3791>`);
			_push(ssrRenderComponent(_component_UiSectionLabel, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Para comer`);
					else return [createTextVNode("Para comer")];
				}),
				_: 1
			}, _parent));
			_push(`<h2 data-v-504f3791>Sabores del <span data-v-504f3791>río</span></h2><p data-v-504f3791> Cocina típica de la región, pensada para compartir en la mesa mientras cae la tarde. Menú sujeto a disponibilidad de pesca del día. </p></div><div class="food-groups" data-v-504f3791><!--[-->`);
			ssrRenderList(unref(foodGroups), (group, index) => {
				_push(ssrRenderComponent(_component_UiFoodGroup, {
					key: `${group.group}-${index}`,
					group
				}, null, _parent));
			});
			_push(`<!--]--></div><p class="food-note" data-v-504f3791> * Precios y platos de referencia — reemplázalos por tu carta gastronómica definitiva. </p></section>`);
		};
	}
});
//#endregion
//#region app/components/home/FoodSection.vue
var _sfc_setup$6 = FoodSection_vue_vue_type_script_setup_true_lang_default.setup;
FoodSection_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/FoodSection.vue");
	return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
var FoodSection_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(FoodSection_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-504f3791"]]), { __name: "HomeFoodSection" });
//#endregion
//#region app/components/ui/TourCard.vue?vue&type=script&setup=true&lang.ts
var TourCard_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "TourCard",
	__ssrInlineRender: true,
	props: {
		tour: {},
		whatsappLink: {}
	},
	setup(__props) {
		const props = __props;
		const hasError = ref(false);
		watch(() => props.tour.image, () => {
			hasError.value = false;
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<article${ssrRenderAttrs(mergeProps({
				class: "tour",
				"data-reveal": ""
			}, _attrs))} data-v-2bd5ba2c><div class="${ssrRenderClass([{ "no-photo": !__props.tour.image || unref(hasError) }, "tour-photo"])}" data-v-2bd5ba2c>`);
			if (__props.tour.image) _push(`<img${ssrRenderAttr("src", __props.tour.image)}${ssrRenderAttr("alt", __props.tour.name)} loading="lazy" data-v-2bd5ba2c>`);
			else _push(`<!---->`);
			_push(`</div><div class="tour-content" data-v-2bd5ba2c><span class="tour-duration" data-v-2bd5ba2c>${ssrInterpolate(__props.tour.duration)} · ${ssrInterpolate(__props.tour.type)}</span><h3 data-v-2bd5ba2c>${ssrInterpolate(__props.tour.name)}</h3><p data-v-2bd5ba2c>${ssrInterpolate(__props.tour.description)}</p><div class="tour-footer" data-v-2bd5ba2c><span class="tour-price" data-v-2bd5ba2c>${ssrInterpolate(__props.tour.price)}</span><a${ssrRenderAttr("href", __props.whatsappLink)} class="tour-button" target="_blank" rel="noopener" data-v-2bd5ba2c> Reservar </a></div></div></article>`);
		};
	}
});
//#endregion
//#region app/components/ui/TourCard.vue
var _sfc_setup$5 = TourCard_vue_vue_type_script_setup_true_lang_default.setup;
TourCard_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/TourCard.vue");
	return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
var TourCard_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(TourCard_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-2bd5ba2c"]]), { __name: "UiTourCard" });
//#endregion
//#region app/composables/useTours.ts
var useTours = () => {
	const supabase = useSupabase();
	const fetchTours = async () => {
		const { data, error } = await supabase.from("tours").select("*").eq("available", true).order("sort_order", { ascending: true });
		if (error) {
			console.error("Error fetching tours:", error);
			return [];
		}
		return data;
	};
	const getWhatsappLink = (message, number = "573001234567") => {
		return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
	};
	return {
		fetchTours,
		getWhatsappLink
	};
};
//#endregion
//#region app/components/home/ToursSection.vue?vue&type=script&setup=true&lang.ts
var ToursSection_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "ToursSection",
	__ssrInlineRender: true,
	setup(__props) {
		const { getWhatsappLink } = useTours();
		const tours = ref([]);
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UiSectionLabel = SectionLabel_default;
			const _component_UiTourCard = TourCard_default;
			_push(`<section${ssrRenderAttrs(mergeProps({
				class: "tours",
				id: "tours"
			}, _attrs))} data-v-76df03ed><div class="menu-header" data-v-76df03ed>`);
			_push(ssrRenderComponent(_component_UiSectionLabel, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Vive el río`);
					else return [createTextVNode("Vive el río")];
				}),
				_: 1
			}, _parent));
			_push(`<h2 data-v-76df03ed>Tours y <span data-v-76df03ed>paseos</span></h2><p data-v-76df03ed>Recorridos guiados por el río Sinú, pensados para grupos, familias y parejas.</p></div><div class="tours-grid" data-v-76df03ed><!--[-->`);
			ssrRenderList(unref(tours), (tour) => {
				_push(ssrRenderComponent(_component_UiTourCard, {
					key: tour.id,
					tour,
					"whatsapp-link": unref(getWhatsappLink)(tour.whatsappMessage)
				}, null, _parent));
			});
			_push(`<!--]--></div><p class="food-note" data-v-76df03ed> * Duraciones y precios de referencia — ajústalos a tus recorridos reales. </p></section>`);
		};
	}
});
//#endregion
//#region app/components/home/ToursSection.vue
var _sfc_setup$4 = ToursSection_vue_vue_type_script_setup_true_lang_default.setup;
ToursSection_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/ToursSection.vue");
	return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
var ToursSection_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(ToursSection_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-76df03ed"]]), { __name: "HomeToursSection" });
//#endregion
//#region \0virtual:public?%2Fimg%2Fatardecer.jpg
var _virtual_public__2Fimg_2Fatardecer_default = publicAssetsURL("/img/atardecer.jpg");
//#endregion
//#region app/components/home/ExperienceSection.vue
var _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
	const _component_UiSectionLabel = SectionLabel_default;
	_push(`<section${ssrRenderAttrs(mergeProps({
		class: "experience",
		id: "experiencia"
	}, _attrs))} data-v-de4ddc27><div class="experience-image" data-v-de4ddc27><img${ssrRenderAttr("src", _virtual_public__2Fimg_2Fatardecer_default)} alt="Atardecer sobre el río Sinú" loading="lazy" data-v-de4ddc27></div><div class="experience-content" data-v-de4ddc27>`);
	_push(ssrRenderComponent(_component_UiSectionLabel, null, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) _push(`La experiencia`);
			else return [createTextVNode("La experiencia")];
		}),
		_: 1
	}, _parent));
	_push(`<h2 data-v-de4ddc27>El río es parte <span data-v-de4ddc27>de nosotros.</span></h2><p data-v-de4ddc27> Vive Patrimonio es un espacio sobre el río Sinú donde cada bebida y cada plato se disfrutan acompañados por el paisaje. </p><p data-v-de4ddc27>Ven a disfrutar, compartir y vivir el momento.</p></div></section>`);
}
var _sfc_setup$3 = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/ExperienceSection.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var ExperienceSection_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-de4ddc27"]]), { __name: "HomeExperienceSection" });
//#endregion
//#region app/composables/useGallery.ts
var useGallery = () => {
	const supabase = useSupabase();
	const fetchGallery = async () => {
		const { data, error } = await supabase.from("gallery").select("*").order("sort_order", { ascending: true });
		if (error) {
			console.error("Error fetching gallery:", error);
			return [];
		}
		return data;
	};
	return { fetchGallery };
};
//#endregion
//#region app/components/home/GallerySection.vue?vue&type=script&setup=true&lang.ts
var GallerySection_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "GallerySection",
	__ssrInlineRender: true,
	setup(__props) {
		useGallery();
		const images = ref([]);
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UiSectionLabel = SectionLabel_default;
			_push(`<section${ssrRenderAttrs(mergeProps({
				class: "gallery",
				id: "galeria"
			}, _attrs))} data-v-2cc33c6d><div class="gallery-title" data-v-2cc33c6d>`);
			_push(ssrRenderComponent(_component_UiSectionLabel, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Galería`);
					else return [createTextVNode("Galería")];
				}),
				_: 1
			}, _parent));
			_push(`<h2 data-v-2cc33c6d>Vive el momento.</h2></div><div class="gallery-grid" data-v-2cc33c6d><!--[-->`);
			ssrRenderList(unref(images), (image, index) => {
				_push(`<img${ssrRenderAttr("src", image.image_url)}${ssrRenderAttr("alt", image.alt)} loading="lazy" data-v-2cc33c6d>`);
			});
			_push(`<!--]--></div></section>`);
		};
	}
});
//#endregion
//#region app/components/home/GallerySection.vue
var _sfc_setup$2 = GallerySection_vue_vue_type_script_setup_true_lang_default.setup;
GallerySection_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/GallerySection.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var GallerySection_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(GallerySection_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-2cc33c6d"]]), { __name: "HomeGallerySection" });
//#endregion
//#region app/components/home/ContactSection.vue?vue&type=script&setup=true&lang.ts
var whatsappLink = "https://wa.me/573001234567";
var instagramLink = "https://www.instagram.com/vivepatrimoni0/";
var ContactSection_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "ContactSection",
	__ssrInlineRender: true,
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UiSectionLabel = SectionLabel_default;
			_push(`<section${ssrRenderAttrs(mergeProps({
				class: "contact",
				id: "contacto"
			}, _attrs))} data-v-185074ad><div class="contact-inner" data-v-185074ad>`);
			_push(ssrRenderComponent(_component_UiSectionLabel, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Visítanos`);
					else return [createTextVNode("Visítanos")];
				}),
				_: 1
			}, _parent));
			_push(`<h2 data-v-185074ad>Nos vemos frente <span data-v-185074ad>al río.</span></h2><p data-v-185074ad>Vive una experiencia diferente en Vive Patrimonio.</p><div class="contact-buttons" data-v-185074ad><a${ssrRenderAttr("href", whatsappLink)} class="contact-button" target="_blank" rel="noopener" data-v-185074ad> WhatsApp </a><a${ssrRenderAttr("href", instagramLink)} class="contact-button" target="_blank" rel="noopener" data-v-185074ad> Instagram </a></div></div></section>`);
		};
	}
});
//#endregion
//#region app/components/home/ContactSection.vue
var _sfc_setup$1 = ContactSection_vue_vue_type_script_setup_true_lang_default.setup;
ContactSection_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/ContactSection.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var ContactSection_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(ContactSection_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-185074ad"]]), { __name: "HomeContactSection" });
//#endregion
//#region app/pages/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		useSeoMeta$1({
			title: "Vive Patrimonio | Bar y Restaurante Río Sinú",
			description: "Vive Patrimonio - Bar y restaurante sobre el río Sinú. Carta de bebidas, comida típica de la región y tours en lancha por el río.",
			ogTitle: "Vive Patrimonio | Bar y Restaurante Río Sinú",
			ogDescription: "Disfruta bebidas, sabores y tours frente al río Sinú. Una experiencia inolvidable en Vive Patrimonio.",
			ogImage: "/img/hero.jpg",
			twitterCard: "summary_large_image"
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_HomeHeroSection = HeroSection_default;
			const _component_HomePresentationSection = PresentationSection_default;
			const _component_HomeDrinksSection = DrinksSection_default;
			const _component_HomeFoodSection = FoodSection_default;
			const _component_HomeToursSection = ToursSection_default;
			const _component_HomeExperienceSection = ExperienceSection_default;
			const _component_HomeGallerySection = GallerySection_default;
			const _component_HomeContactSection = ContactSection_default;
			_push(`<main${ssrRenderAttrs(_attrs)}>`);
			_push(ssrRenderComponent(_component_HomeHeroSection, null, null, _parent));
			_push(ssrRenderComponent(_component_HomePresentationSection, null, null, _parent));
			_push(ssrRenderComponent(_component_HomeDrinksSection, null, null, _parent));
			_push(ssrRenderComponent(_component_HomeFoodSection, null, null, _parent));
			_push(ssrRenderComponent(_component_HomeToursSection, null, null, _parent));
			_push(ssrRenderComponent(_component_HomeExperienceSection, null, null, _parent));
			_push(ssrRenderComponent(_component_HomeGallerySection, null, null, _parent));
			_push(ssrRenderComponent(_component_HomeContactSection, null, null, _parent));
			_push(`</main>`);
		};
	}
});
//#endregion
//#region app/pages/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var pages_default = index_vue_vue_type_script_setup_true_lang_default;

export { pages_default as default };
//# sourceMappingURL=pages-DauJ9QRb.mjs.map
