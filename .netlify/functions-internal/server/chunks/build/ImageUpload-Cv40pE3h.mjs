import { _ as _plugin_vue_export_helper_default } from '../virtual/entry.mjs';
import { u as useSupabase } from './useSupabase-CJzi35Kv.mjs';
import { defineComponent, ref, watch, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';

//#region app/composables/useStorage.ts
var useStorage = () => {
	const supabase = useSupabase();
	const uploadImage = async (file, bucket) => {
		const fileExt = file.name.split(".").pop();
		const filePath = `${`${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`}`;
		const { data, error } = await supabase.storage.from(bucket).upload(filePath, file, {
			cacheControl: "3600",
			upsert: false
		});
		if (error) {
			console.error("Error uploading image:", error);
			return null;
		}
		const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(filePath);
		return urlData.publicUrl;
	};
	const deleteImage = async (bucket, filePath) => {
		const { error } = await supabase.storage.from(bucket).remove([filePath]);
		if (error) {
			console.error("Error deleting image:", error);
			return false;
		}
		return true;
	};
	return {
		uploadImage,
		deleteImage
	};
};
//#endregion
//#region app/components/admin/ImageUpload.vue?vue&type=script&setup=true&lang.ts
var ImageUpload_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "ImageUpload",
	__ssrInlineRender: true,
	props: {
		modelValue: {},
		bucket: {},
		label: { default: "Imagen" }
	},
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		useStorage();
		const uploading = ref(false);
		const previewUrl = ref(props.modelValue);
		watch(() => props.modelValue, (newVal) => {
			previewUrl.value = newVal;
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "image-upload" }, _attrs))} data-v-e5b62d16><label data-v-e5b62d16>${ssrInterpolate(__props.label)}</label>`);
			if (unref(previewUrl)) _push(`<div class="preview" data-v-e5b62d16><img${ssrRenderAttr("src", unref(previewUrl))}${ssrRenderAttr("alt", __props.label)} data-v-e5b62d16><button type="button" class="remove-btn" data-v-e5b62d16>✕</button></div>`);
			else {
				_push(`<div class="upload-area" data-v-e5b62d16><input type="file" accept="image/*"${ssrIncludeBooleanAttr(unref(uploading)) ? " disabled" : ""} class="file-input" data-v-e5b62d16><div class="upload-placeholder" data-v-e5b62d16>`);
				if (unref(uploading)) _push(`<span data-v-e5b62d16>Subiendo...</span>`);
				else _push(`<span data-v-e5b62d16>📷 Click para subir imagen</span>`);
				_push(`</div></div>`);
			}
			_push(`</div>`);
		};
	}
});
//#endregion
//#region app/components/admin/ImageUpload.vue
var _sfc_setup = ImageUpload_vue_vue_type_script_setup_true_lang_default.setup;
ImageUpload_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/ImageUpload.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var ImageUpload_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(ImageUpload_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-e5b62d16"]]), { __name: "AdminImageUpload" });

export { ImageUpload_default as I };
//# sourceMappingURL=ImageUpload-Cv40pE3h.mjs.map
