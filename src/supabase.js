import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || 'https://zpdokuxxerzrnnxillpi.supabase.co'
const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_KEY || 'sb_publishable_fNjywf4-9lV56T2CojEMCw_TMsmvJZ2'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)