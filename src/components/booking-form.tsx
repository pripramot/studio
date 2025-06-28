
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CalendarIcon, Car } from "lucide-react";
import { format } from "date-fns";
import { th } from "date-fns/locale";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import type { Vehicle } from "@/lib/data";

const bookingSchema = z.object({
  location: z.string({ required_error: "กรุณาเลือกสถานที่รับ-คืนรถ" }),
  otherLocation: z.string().optional(),
  pickupDateTime: z.date({ required_error: "กรุณาเลือกวันและเวลารับรถ" }),
  returnDateTime: z.date({ required_error: "กรุณาเลือกวันและเวลาคืนรถ" }),
  customerName: z.string().min(2, "กรุณากรอกชื่อ-นามสกุล"),
  phone: z.string().min(10, "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง"),
  contact: z.string().optional(),
  specialRequests: z.string().optional(),
}).refine(data => {
    if (data.location === 'อื่นๆ' && (!data.otherLocation || data.otherLocation.length < 1)) {
        return false;
    }
    return true;
}, {
    message: "กรุณาระบุสถานที่อื่นๆ",
    path: ["otherLocation"],
}).refine(data => data.returnDateTime > data.pickupDateTime, {
    message: "วันและเวลาคืนรถต้องอยู่หลังวันและเวลารับรถ",
    path: ["returnDateTime"],
});

type BookingFormValues = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  vehicle: Vehicle | null;
  isOpen: boolean;
  onClose: () => void;
}

export function BookingForm({ vehicle, isOpen, onClose }: BookingFormProps) {
  const { toast } = useToast();
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      location: undefined,
      otherLocation: "",
      customerName: "",
      phone: "",
      contact: "",
      specialRequests: "",
    },
  });

  const locationValue = form.watch("location");

  const handleSubmit = (values: BookingFormValues) => {
    console.log({ bookingDetails: values, vehicle });
    toast({
      title: "ส่งข้อมูลการจองสำเร็จ",
      description: "เราได้รับข้อมูลของคุณแล้ว และจะติดต่อกลับโดยเร็วที่สุด",
    });
    onClose();
    form.reset();
  };

  React.useEffect(() => {
    if (!isOpen) {
      form.reset();
    }
  }, [isOpen, form]);

  if (!vehicle) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-headline">แบบฟอร์มการจองรถ</DialogTitle>
          <DialogDescription>
            กรุณากรอกข้อมูลด้านล่างให้ครบถ้วนเพื่อทำการจอง
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
            <Car className="h-8 w-8 text-primary" />
            <div>
                <h3 className="font-semibold">{vehicle.name}</h3>
                <p className="text-sm text-muted-foreground">ราคา: ฿{vehicle.price.toLocaleString()}/วัน</p>
            </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 px-1 py-4">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>สถานที่รับ-คืนรถ</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกสถานที่" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="สนามบินอุดรธานี">สนามบินอุดรธานี</SelectItem>
                      <SelectItem value="สาขาหลัก rungroj carrent">สาขาหลัก Rungroj Carrent</SelectItem>
                      <SelectItem value="อื่นๆ">อื่นๆ (โปรดระบุ)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {locationValue === 'อื่นๆ' && (
              <FormField
                control={form.control}
                name="otherLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ระบุสถานที่อื่นๆ</FormLabel>
                    <FormControl>
                      <Input placeholder="เช่น โรงแรม, บ้านพัก" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="pickupDateTime"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>วัน-เวลารับรถ</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP HH:mm", { locale: th })
                            ) : (
                              <span>เลือกวันและเวลา</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                          locale={th}
                          disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                        />
                        <div className="p-2 border-t border-border">
                          <Input type="time" className="w-full" onChange={(e) => {
                            const time = e.target.value.split(':');
                            const date = field.value || new Date();
                            date.setHours(parseInt(time[0]), parseInt(time[1]));
                            field.onChange(new Date(date));
                          }} />
                        </div>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="returnDateTime"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>วัน-เวลาคืนรถ</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP HH:mm", { locale: th })
                            ) : (
                              <span>เลือกวันและเวลา</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                          locale={th}
                          disabled={(date) => date < (form.getValues("pickupDateTime") || new Date())}
                        />
                         <div className="p-2 border-t border-border">
                          <Input type="time" className="w-full" onChange={(e) => {
                            const time = e.target.value.split(':');
                            const date = field.value || new Date();
                            date.setHours(parseInt(time[0]), parseInt(time[1]));
                            field.onChange(new Date(date));
                          }} />
                        </div>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
             <FormField
                control={form.control}
                name="customerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ชื่อ-นามสกุล</FormLabel>
                    <FormControl>
                      <Input placeholder="เช่น สมชาย ใจดี" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>เบอร์โทรศัพท์</FormLabel>
                    <FormControl>
                      <Input placeholder="08xxxxxxxx" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="contact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Line ID หรือ E-mail (ถ้ามี)</FormLabel>
                    <FormControl>
                      <Input placeholder="rungroj_carrent" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <FormField
              control={form.control}
              name="specialRequests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>คำขอพิเศษ</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="เช่น ต้องการเบาะนั่งสำหรับเด็ก, ส่งรถที่ประตูทางออก 2"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
                <Button type="button" variant="ghost" onClick={onClose}>ยกเลิก</Button>
                <Button type="submit">ยืนยันการจอง</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

    