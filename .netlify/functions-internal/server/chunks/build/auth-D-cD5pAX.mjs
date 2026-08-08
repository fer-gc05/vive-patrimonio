import { d as defineNuxtRouteMiddleware, e as executeAsync, n as navigateTo } from '../virtual/entry.mjs';
import { u as useSupabase } from './useSupabase-CJzi35Kv.mjs';
import 'nostics';
import 'nostics/formatters/ansi';
import 'vue';
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
import 'vue/server-renderer';
import 'devalue';
import 'vue-router';
import 'unhead/utils';
import '@supabase/supabase-js';

//#region app/middleware/auth.ts
var auth_default = defineNuxtRouteMiddleware(async (to, from) => {
	let __temp, __restore;
	const supabase = useSupabase();
	const { data: { user } } = ([__temp, __restore] = executeAsync(() => supabase.auth.getUser()), __temp = await __temp, __restore(), __temp);
	if (!user && to.path !== "/admin/login") return navigateTo("/admin/login");
});

export { auth_default as default };
//# sourceMappingURL=auth-D-cD5pAX.mjs.map
