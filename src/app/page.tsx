
'use client';

import Image from "next/image";
import * as React from "react";
import { Car, Star, Users, Award, Flame, Truck, Bot } from "lucide-react";
import { type Vehicle, vehicles } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RecommendationForm } from "@/components/recommendation-form";
import { LogoIcon } from "@/components/icons";
import { BookingForm } from "@/components/booking-form";

function Header() {
  return (
    <header className="py-4 px-4 md:px-8 border-b border-border/40 bg-background/95 backdrop-blur-sm sticky top-0 z-40">
      <div className="container mx-auto flex items-center justify-between">
        <a href="#" className="flex items-center gap-2" aria-label="Rungroj Carrent Home">
          <LogoIcon className="h-8 w-8" />
          <h1 className="text-2xl font-bold text-foreground font-headline">Rungroj Carrent</h1>
        </a>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground mt-16">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
               <LogoIcon className="h-10 w-10" />
               <h3 className="text-xl font-bold text-foreground font-headline">Rungroj Carrent</h3>
            </div>
            <p className="text-sm">
            Rungroj Carrent รถเช่าอุดรธานี บริการให้เช่ารถยนต์ขับเอง ฟรีประกันภัยชั้น 1 ขับขี่ปลอดภัยไว้ใจเรา
            </p>
          </div>
          <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold text-foreground mb-4">บริการ</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#fleet" className="hover:text-primary transition-colors">รถของเรา</a></li>
                <li><a href="#ai-chat" className="hover:text-primary transition-colors">AI ช่วยเหลือ</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">เช่ารายวัน</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">เช่ารายเดือน</a></li>
              </ul>
            </div>
             <div>
              <h4 className="font-semibold text-foreground mb-4">เกี่ยวกับเรา</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">เกี่ยวกับเรา</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">ติดต่อเรา</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">ข้อตกลงในการใช้บริการ</a></li>
              </ul>
            </div>
          </div>
        </div>
        <Separator className="my-8 bg-border/40" />
        <div className="text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Rungroj Carrent. สงวนลิขสิทธิ์</p>
        </div>
      </div>
    </footer>
  );
}

function VehicleCard({ vehicle, onBookNow }: { vehicle: Vehicle, onBookNow: () => void }) {
  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group rounded-lg">
      <CardHeader className="p-0">
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={vehicle.image}
            alt={vehicle.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            data-ai-hint={vehicle.dataAiHint}
          />
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-1 flex flex-col">
        <CardTitle className="font-headline text-xl mb-2">{vehicle.name}</CardTitle>
        <CardDescription className="mb-4 text-sm">{vehicle.useCases}</CardDescription>
        <div className="flex-1" />
        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground my-4">
          <div className="flex items-center gap-2"><Users className="h-4 w-4 text-primary" />{vehicle.seats} ที่นั่ง</div>
          <div className="flex items-center gap-2"><Car className="h-4 w-4 text-primary" />{vehicle.type}</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 text-accent fill-accent" />
            <span className="font-bold">{vehicle.rating.toFixed(1)}</span>
            <span className="text-sm text-muted-foreground">({vehicle.reviews} รีวิว)</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 p-4 flex items-center justify-between">
        <div>
          <span className="text-2xl font-bold">฿{vehicle.price.toLocaleString()}</span>
          <span className="text-sm text-muted-foreground">/วัน</span>
        </div>
        <Button onClick={onBookNow}>เช่าเลย</Button>
      </CardFooter>
    </Card>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="text-center p-6 shadow-md hover:shadow-lg transition-shadow">
      <div className="mb-4 inline-block p-4 bg-primary/10 text-primary rounded-full">
        {icon}
      </div>
      <h3 className="text-xl font-bold font-headline mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </Card>
  );
}


export default function Home() {
  const [bookingVehicle, setBookingVehicle] = React.useState<Vehicle | null>(null);

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1">
        <section id="ai-chat" className="relative py-20 md:py-32">
           <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1504215680853-026ed2a45def?q=80&w=2070&auto=format&fit=crop"
              alt="Car driving on a beautiful road"
              fill
              className="object-cover opacity-20"
              data-ai-hint="car road"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <Bot className="h-10 w-10 mx-auto text-primary mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold font-headline">ให้ AI ช่วยเหลือคุณ</h2>
              <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
                มีคำถามเกี่ยวกับการเช่ารถ? "รุ่งโรจน์ AI" พร้อมให้ความช่วยเหลือ 24 ชั่วโมง
              </p>
            </div>
            <RecommendationForm />
          </div>
        </section>

        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <Image 
                  src="https://placehold.co/800x600.png"
                  alt="Rungroj Carrent Office" 
                  width={800} 
                  height={600}
                  className="w-full h-full object-cover"
                  data-ai-hint="car rental office"
                />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold font-headline">RungRoj รถเช่าอุดรธานี</h2>
                <p className="text-lg text-muted-foreground mb-4">
                  หจก.รุ่งโรจน์การชำนาญ มีรถให้เลือกกว่า 40 คัน ให้บริการรถเช่าคุณภาพเยี่ยมที่สนามบินอุดรธานี
                </p>
                <p className="text-muted-foreground">
                  เพลิดเพลินกับการยกเลิกฟรีและการเช่ารถขับเองแบบรายวัน, รายสัปดาห์, หรือรายเดือนในราคาที่จับต้องได้ รถในฝันของคุณอยู่แค่ปลายนิ้ว
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">ทำไมต้องเลือกเรา?</h2>
              <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
                เรามอบประสบการณ์การเช่าที่ราบรื่น ราคาไม่แพง และเชื่อถือได้
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<Truck className="h-8 w-8" />}
                title="ส่งรถเช่าถึงบ้านฟรี"
                description="เรามีบริการส่งฟรีในเขตอุดรธานี รวมถึงสวนสาธารณะหนองประจักษ์ โดยไม่มีค่าใช้จ่ายเพิ่มเติม"
              />
              <FeatureCard 
                icon={<Award className="h-8 w-8" />}
                title="การให้บริการที่เป็นเลิศ"
                description="มั่นใจได้ในคุณภาพรถและการบริการที่เป็นเลิศ เริ่มต้นการเดินทางที่ราบรื่นกับเรา"
              />
              <FeatureCard 
                icon={<Flame className="h-8 w-8" />}
                title="โปรสุดปัง! ลดค่าเช่าถูกสุด"
                description="เช่ารถเริ่มต้นราคาเพียง 699/วัน รถทุกคันมีประกันภัยชั้น 1 และเจ้าของร้านเป็นผู้ส่งมอบด้วยตนเอง"
              />
            </div>
          </div>
        </section>

        <Separator className="container mx-auto" />

        <section id="fleet" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">รถของเรา</h2>
              <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
              มีรถให้เลือกมากมาย ตอบโจทย์ทุกความต้องการของคุณในประเทศไทย
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {vehicles.map((vehicle) => (
                <VehicleCard key={vehicle.name} vehicle={vehicle} onBookNow={() => setBookingVehicle(vehicle)} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <BookingForm 
        vehicle={bookingVehicle} 
        isOpen={!!bookingVehicle} 
        onClose={() => setBookingVehicle(null)} 
      />
    </div>
  );
}
