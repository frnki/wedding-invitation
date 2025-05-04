"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent, DialogFooter,
    DialogHeader, DialogTrigger
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { submitRsvp } from "../actions";

// RSVP 스키마 정의
const formSchema = z.object({
  name: z.string().min(1, "이름을 입력해주세요"),
});

export function RsvpDialog() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // React Hook Form 설정
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      
      const response = await submitRsvp(formData);
      
      if (response.success) {
        toast.success(response.message);
        form.reset();
        setOpen(false);
      } else {
        toast.error(response.error || "오류가 발생했습니다.");
      }
    } catch (error) {
      toast.error("등록 중 오류가 발생했습니다.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger asChild>
        <Button className="bg-black w-1/3 text-white px-4 py-2 rounded-md pretendard">
          참석하기
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          {/* <DialogTitle className="text-md">참석 확인</DialogTitle> */}

        </DialogHeader>
        <Form {...form} >
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">성함</FormLabel>
                  <FormControl>
                    <Input className="text-xs" placeholder="이름을 입력해주세요" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full text-xs"
              >
                {isSubmitting ? "제출 중..." : "참석하기"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
} 