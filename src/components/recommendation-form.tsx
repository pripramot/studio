"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, Car, ThumbsUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getRecommendation } from "@/app/actions";
import type { RecommendSuitableCarOutput } from "@/ai/flows/recommend-suitable-car";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const purposeItems = [
  { value: 'ประหยัดน้ำมัน', label: 'ประหยัดน้ำมัน' },
  { value: 'เดินทางกับครอบครัว (5-7 ที่นั่ง)', label: 'เดินทางกับครอบครัว (5-7 ที่นั่ง)' },
  { value: 'เหมาะกับการผจญภัย/ออฟโรด', label: 'ผจญภัย / ออฟโรด' },
  { value: 'ขับขี่ในเมืองคล่องตัว', label: 'ขับขี่ในเมือง' },
  { value: 'รถหรู / ติดต่อธุรกิจ', label: 'ติดต่อธุรกิจ / รถหรู' },
  { value: 'สำหรับบรรทุกของ', label: 'สำหรับบรรทุกของ' },
];

const formSchema = z.object({
  purpose: z.string({
    required_error: "กรุณาเลือกวัตถุประสงค์การใช้งาน",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function RecommendationForm() {
  const [isPending, startTransition] = React.useTransition();
  const [result, setResult] = React.useState<RecommendSuitableCarOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      purpose: undefined,
    },
  });

  function onSubmit(values: FormValues) {
    setResult(null);
    startTransition(async () => {
      const { data, error } = await getRecommendation({
        purpose: values.purpose,
      });
      if (error) {
        toast({
          title: "เกิดข้อผิดพลาด",
          description: error,
          variant: "destructive",
        });
        return;
      }
      setResult(data);
    });
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
      <Card className="shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">ค้นหารถที่ใช่สำหรับคุณ</CardTitle>
          <CardDescription>เลือกวัตถุประสงค์ของคุณ แล้วให้ AI ช่วยแนะนำ</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="purpose"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>วัตถุประสงค์การใช้งาน</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="เลือกจากรายการ..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {purposeItems.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    กำลังสร้างคำแนะนำ...
                  </>
                ) : "รับคำแนะนำ"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="mt-8 lg:mt-0">
        <Card className="bg-muted/50 rounded-lg min-h-[300px] flex items-center justify-center p-6">
          {isPending && <RecommendationSkeleton />}
          {!isPending && result && (
            <div className="text-center w-full animate-in fade-in duration-500">
               <CardHeader>
                <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit mb-4">
                  <ThumbsUp className="h-8 w-8" />
                </div>
                <CardTitle className="font-headline text-2xl">คำแนะนำของเรา</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-primary text-primary-foreground p-4 rounded-md">
                  <p className="text-lg font-semibold flex items-center justify-center gap-2">
                    <Car/>
                    {result.carRecommendation}
                  </p>
                </div>
                <p className="text-muted-foreground">{result.suitabilityExplanation}</p>
              </CardContent>
            </div>
          )}
           {!isPending && !result && (
            <div className="text-center text-muted-foreground p-8">
              <p>คำแนะนำรถยนต์ส่วนตัวของคุณจะปรากฏที่นี่</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

function RecommendationSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 w-full p-4">
      <Skeleton className="h-16 w-16 rounded-full" />
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-5/6" />
    </div>
  );
}
