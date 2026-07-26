import { createClient } from '@supabase/supabase-js'

const URL = 'https://fzyhpsphfgiqlziomxgr.supabase.co'
const API_KEY = 'sb_publishable_eHl9H_r_hUzWnDYwg8ZchA_3ClkBhyD'
export const supabase = createClient(URL, API_KEY)