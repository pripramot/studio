"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Bot, Sparkles, Loader2, Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getRecommendation } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { type Vehicle, vehicles } from "@/lib/data";

const recommendationSchema = z.object({
  purpose: z.string({
    required_error: "กรุณาเลือกวัตถุประสงค์การใช้งาน",
  }),
});

type RecommendationFormValues = z.infer<typeof recommendationSchema>;

export function RecommendationForm() {
  const [isPending, startTransition] = React.useTransition();
  const [recommendation, setRecommendation] = React.useState<{text: string, carName: string} | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<RecommendationFormValues>({
    resolver: zodResolver(recommendationSchema),
  });

  const handleSubmit = (values: RecommendationFormValues) => {
    setRecommendation(null);
    setError(null);
    startTransition(async () => {
      const { data, error } = await getRecommendation(values);
      if (error) {
        setError(error);
        toast({
          title: "เกิดข้อผิดพลาด",
          description: error,
          variant: "destructive",
        });
      } else if (data) {
        setRecommendation({ text: data.recommendation, carName: data.recommendedCar });
      }
    });
  };
  
  const recommendedVehicle = vehicles.find(v => v.name === recommendation?.carName);

  return (
    <Card className="w-full max-w-lg mx-auto shadow-2xl rounded-xl border-0">
      <CardHeader className="text-center">
        <Bot className="h-10 w-10 mx-auto text-primary" />
        <CardTitle className="text-2xl font-headline">ไม่แน่ใจว่าจะเช่าคันไหนดี?</CardTitle>
        <CardDescription>ให้ AI ช่วยแนะนำรถที่เหมาะกับคุณที่สุด</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="purpose"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>วัตถุประสงค์หลักของคุณคืออะไร?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกวัตถุประสงค์..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ขับในเมืองเป็นหลัก เน้นประหยัดน้ำมัน">ขับในเมืองเป็นหลัก เน้นประหยัดน้ำมัน</SelectItem>
                      <SelectItem value="เดินทางกับครอบครัว (3-5 คน)">เดินทางกับครอบครัว (3-5 คน)</SelectItem>
                      <SelectItem value="เดินทางกับครอบครัวใหญ่ หรือเพื่อนกลุ่มใหญ่ (6-7 คน)">เดินทางกับครอบครัวใหญ่ หรือเพื่อนกลุ่มใหญ่ (6-7 คน)</SelectItem>
                      <SelectItem value="เดินทางไกล ออกต่างจังหวัด">เดินทางไกล ออกต่างจังหวัด</SelectItem>
                      <SelectItem value="ต้องการรถที่ดูดี มีสไตล์ สำหรับการทำงานหรือพบปะผู้คน">ต้องการรถที่ดูดี มีสไตล์</SelectItem>
                      <SelectItem value="ลุยๆ ชอบผจญภัย ขับขี่แบบออฟโรด">ลุยๆ ชอบผจญภัย ออฟโรด</SelectItem>
                       <SelectItem value="ขนของ หรือใช้งานเชิงพาณิชย์">ขนของ หรือใช้งานเชิงพาณิชย์</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <Search className="mr-2" />
                  รับคำแนะนำ
                </>
              )}
            </Button>
          </form>
        </Form>
        {isPending && (
            <div className="text-center mt-6">
                <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                <p className="text-muted-foreground mt-2">กำลังค้นหารถที่ใช่สำหรับคุณ...</p>
            </div>
        )}
        {error && (
            <div className="mt-6 text-center text-destructive">
                <p>{error}</p>
            </div>
        )}
        {recommendation && recommendedVehicle && (
            <div className="mt-8 pt-6 border-t">
                <h3 className="text-lg font-semibold text-center mb-4">เราขอแนะนำ...</h3>
                <Card className="overflow-hidden">
                    <CardHeader className="p-4 bg-primary/10">
                         <CardTitle className="font-headline text-xl text-primary">{recommendedVehicle.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                        <p className="text-base"><Sparkles className="inline-block w-4 h-4 mr-2 text-accent" />{recommendation.text}</p>
                    </CardContent>
                    <CardContent className="p-4 pt-0">
                         <Button className="w-full" variant="outline" onClick={() => {
                           const vehicleSection = document.getElementById('fleet');
                           if(vehicleSection) vehicleSection.scrollIntoView({ behavior: 'smooth' });
                         }}>
                            ดูรถคันอื่นๆ <ArrowRight className="ml-2" />
                         </Button>
                    </CardContent>
                </Card>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
