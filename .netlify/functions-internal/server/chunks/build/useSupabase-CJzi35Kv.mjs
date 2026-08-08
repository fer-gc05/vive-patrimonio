import { b as useRuntimeConfig } from '../virtual/entry.mjs';
import { createClient } from '@supabase/supabase-js';

//#region app/composables/useSupabase.ts
var useSupabase = () => {
	const config = useRuntimeConfig();
	return createClient(config.public.supabaseUrl, config.public.supabaseKey);
};

export { useSupabase as u };
//# sourceMappingURL=useSupabase-CJzi35Kv.mjs.map
