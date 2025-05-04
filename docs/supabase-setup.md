# Supabase 설정 가이드

## 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 값들을 추가하세요:

```
# Supabase 설정
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

실제 Supabase 프로젝트의 URL과 익명 키로 대체하세요.

## 테이블 생성하기

Supabase 대시보드에서 SQL 편집기를 열고 다음 SQL을 실행하세요:

```sql
-- RSVP 테이블 생성
CREATE TABLE rsvp (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  event TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS(Row Level Security) 정책 설정
ALTER TABLE rsvp ENABLE ROW LEVEL SECURITY;

-- 익명 사용자의 삽입 허용
CREATE POLICY "Allow anonymous inserts" ON rsvp
  FOR INSERT WITH CHECK (true);

-- 관리자만 조회 허용
CREATE POLICY "Only admins can select" ON rsvp
  FOR SELECT USING (auth.role() = 'authenticated');
```

## 주의사항

- 실제 프로덕션 환경에서는 보다 엄격한 보안 정책을 설정하세요.
- 필요에 따라 테이블 스키마를 확장할 수 있습니다 (예: 이메일, 전화번호 등). 