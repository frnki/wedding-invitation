"use server";

import { supabase } from "@/lib/supabase";
import { z } from "zod";

// RSVP 데이터를 위한 스키마 정의
const RsvpSchema = z.object({
  name: z.string().min(1, "이름을 입력해주세요"),
});

export async function submitRsvp(formData: FormData) {
  const name = formData.get("name") as string;
  
  // 입력 데이터 검증
  const validatedFields = RsvpSchema.safeParse({ name });
  
  if (!validatedFields.success) {
    return { 
      error: "유효하지 않은 입력입니다.", 
      details: validatedFields.error.format() 
    };
  }

  try {
    // Supabase에 데이터 저장
    const { data, error } = await supabase
      .from('rsvp')
      .insert([
        { 
          name: validatedFields.data.name,
          event: 'after-party',
          created_at: new Date().toISOString()
        }
      ]);
    
    if (error) {
      console.error("Supabase 저장 오류:", error);
      return { error: "참석 등록 중 오류가 발생했습니다." };
    }
    
    console.log("RSVP 저장 성공:", data);
    
    // 성공 응답
    return { success: true, message: "파티에서 만나요!" };
  } catch (error) {
    console.error("RSVP 저장 실패:", error);
    return { error: "참석 등록 중 오류가 발생했습니다." };
  }
} 