import { createClient } from '@supabase/supabase-js';

// Supabase URL과 익명 키를 환경 변수에서 가져옵니다.
// .env.local 파일에 이 값들을 설정해야 합니다.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Supabase 클라이언트 인스턴스를 생성합니다.
export const supabase = createClient(supabaseUrl, supabaseAnonKey); 