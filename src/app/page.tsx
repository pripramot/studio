'use client';

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Car, Star, Users, Award, Flame, Truck } from "lucide-react";
import { type Vehicle, vehicles } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { BookingForm } from "@/components/booking-form";

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string;

function Header() {
  return (
    <header className="py-4 px-4 md:px-8 border-b border-border/40 bg-background/95 backdrop-blur-sm sticky top-0 z-40">
      <div className="container mx-auto flex items-center justify-between">
        <a href="#" className="flex items-center gap-2" aria-label="Carrent Home">
          <img src="/logo-rungroj.png" alt="โลโก้" className="h-10 w-10 rounded-full bg-white shadow" />
          <h1 className="text-2xl font-bold text-foreground font-headline tracking-tight">รุ่งโรจน์คาร์เร้นท์</h1>
        </a>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-black text-white mt-16">
      <div className="container mx-auto py-10 px-4 flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
        <div className="flex items-center gap-3 mb-4 md:mb-0">
          <img src="/logo-rungroj.png" alt="โลโก้ รุ่งโรจน์คาร์เร้นท์" className="h-14 w-14 rounded-full bg-white shadow" />
          <div>
            <h2 className="text-xl font-bold font-headline">รุ่งโรจน์คาร์เร้นท์</h2>
            <p className="text-sm text-gray-300">รถเช่าอุดรธานี</p>
          </div>
        </div>
        <div className="flex flex-col items-center md:items-end gap-2">
          <div className="mb-2 text-center md:text-right">
            <p className="font-semibold">ติดต่อเรา</p>
            <p className="text-sm">12/6 หมู่ที่ 7 ซอยบ้านช้าง ตำบลหมู่ม่น, Udon Thani, Thailand, Udon Thani</p>
            <p className="text-sm mt-1">โทร: <a href="tel:+66866348619" className="hover:text-pink-400">+66 86 634 8619</a> | Line: <a href="https://line.me/R/ti/p/@rungroj" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400">@rungroj</a></p>
          </div>
          <div className="flex gap-4">
            <a href="https://www.facebook.com/rungrojcarrentudon" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 flex items-center gap-2">
              <img src="/images/facebook.png" alt="Facebook" className="h-6 w-6" /> Facebook
            </a>
            <a href="https://m.me/553199731216723" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 flex items-center gap-2">
              <img src="/images/facebook-chat-logo.png" alt="Messenger" className="h-6 w-6" /> Messenger
            </a>
            <a href="https://line.me/R/ti/p/@rungroj" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 flex items-center gap-2">
              <img src="/images/logo-line-chat.png" alt="Line" className="h-6 w-6" /> Line
            </a>
          </div>
        </div>
      </div>
      <div className="text-center text-xs text-gray-400 py-4 border-t border-gray-800 mt-6">
        &copy; {new Date().getFullYear()} รุ่งโรจน์คาร์เร้นท์. All rights reserved.
      </div>
    </footer>
  );
}

function VehicleCard({ vehicle, onBookNow }: { vehicle: Vehicle, onBookNow: () => void }) {
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group">
      <div className="w-full bg-gray-100 flex justify-center items-center aspect-square max-w-[960px] mx-auto">
        <Image
          src={vehicle.image}
          alt={vehicle.name}
          width={960}
          height={960}
          className="object-cover w-full h-full"
        />
      </div>
      <CardContent className="flex flex-col flex-1 p-6">
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
        <Button className="bg-pink-500 hover:bg-pink-600 text-white" onClick={onBookNow}>
          เช่าเลย
        </Button>
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
  const [bookingVehicle, setBookingVehicle] = useState<Vehicle | null>(null);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { role: 'user', content: input }]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: input }] }]
          }),
        }
      );
      const data = await res.json();
      const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'ขออภัย เกิดข้อผิดพลาด';
      setMessages((msgs) => [...msgs, { role: 'assistant', content: aiText }]);
    } catch (err) {
      setMessages((msgs) => [...msgs, { role: 'assistant', content: 'เกิดข้อผิดพลาดในการเชื่อมต่อ API' }]);
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1">
        <section className="relative py-20 md:py-32">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1504215680853-026ed2a45def?q=80&w=2070&auto=format&fit=crop"
              alt="Car driving on a beautiful road"
              fill
              className="object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          </div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-headline text-foreground drop-shadow-lg">
              ค้นหารถเช่าที่สมบูรณ์แบบของคุณ
            </h1>
            <p className="mt-4 text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto drop-shadow-md">
              บริการรถเช่าคุณภาพ พร้อมรับและส่งฟรีถึงสนามบิน
            </p>
            <Button
              size="lg"
              className="mt-8 bg-pink-500 hover:bg-pink-600 text-white font-bold text-lg px-8 py-3 rounded-full shadow"
              onClick={() => document.getElementById('fleet')?.scrollIntoView({ behavior: 'smooth' })}
            >
              ดูรถทั้งหมด
            </Button>

            {/* Chatbot Section: กว้างเหมือน Google Search ใต้ปุ่มดูรถทั้งหมด */}
            <div className="flex flex-col items-center justify-center mt-10">
              <div className="w-full max-w-2xl bg-black rounded-2xl shadow-2xl border border-pink-500">
                <div className="flex items-center justify-between px-6 py-4 border-b bg-pink-500 rounded-t-2xl">
                  <div className="flex items-center gap-2">
                    <img src="/logo-rungroj.png" alt="โลโก้" className="h-8 w-8 rounded-full bg-white" />
                    <span className="text-white font-bold">AI ผู้ช่วย (Gemini)</span>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-6 bg-black text-white min-h-[200px]" style={{ maxHeight: 350 }}>
                  {messages.length === 0 && (
                    <div className="text-center text-gray-400 italic py-8">
                      สอบถามข้อมูลรถเช่า โปรโมชั่น หรือบริการของเราได้ที่นี่
                    </div>
                  )}
                  {messages.map((msg, idx) => (
                    <div key={idx} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                      <span
                        className={
                          msg.role === 'user'
                            ? 'inline-block bg-pink-500 text-white rounded-lg px-3 py-2'
                            : msg.role === 'assistant'
                            ? 'inline-block bg-white text-black rounded-lg px-3 py-2'
                            : 'inline-block bg-gray-700 text-white rounded-lg px-3 py-2'
                        }
                      >
                        {msg.content}
                      </span>
                    </div>
                  ))}
                  {loading && <div className="text-gray-400">AI กำลังพิมพ์...</div>}
                  <div ref={chatEndRef} />
                </div>
                <form onSubmit={sendMessage} className="flex gap-2 p-4 border-t bg-white rounded-b-2xl">
                  <input
                    className="flex-1 border rounded px-3 py-2 text-black"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="พิมพ์ข้อความหรือสอบถามข้อมูลรถเช่า..."
                    disabled={loading}
                    autoFocus
                  />
                  <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded font-bold" type="submit" disabled={loading}>
                    ส่ง
                  </button>
                </form>
                <div className="px-4 pb-3">
                  <label className="block text-xs text-gray-400 mb-1">ฐานความรู้ (Knowledge Base)</label>
                  <span className="text-xs text-gray-400">AI จะตอบโดยอิงจากข้อมูลบริษัทและเอกสารภายใน</span>
                </div>
              </div>
            </div>
            {/* End Chatbot Section */}
          </div>
        </section>

        <section id="fleet" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">รถของเรา</h2>
              <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
                มีรถให้เลือกมากมาย ตอบโจทย์ทุกความต้องการของคุณ
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {vehicles.map((vehicle) => (
                <div key={vehicle.name} className="h-full flex">
                  <VehicleCard vehicle={vehicle} onBookNow={() => setBookingVehicle(vehicle)} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

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
              description="บริการส่งฟรีในพื้นที่ที่กำหนด"
            />
            <FeatureCard
              icon={<Award className="h-8 w-8" />}
              title="การให้บริการที่เป็นเลิศ"
              description="มั่นใจได้ในคุณภาพรถและการบริการ"
            />
            <FeatureCard
              icon={<Flame className="h-8 w-8" />}
              title="โปรสุดปัง! ลดค่าเช่าถูกสุด"
              description="เช่ารถเริ่มต้นราคาประหยัด รถทุกคันมีประกันภัย"
            />
          </div>
        </div>
      </section>

      <Footer />
      <BookingForm
        vehicle={bookingVehicle}
        isOpen={!!bookingVehicle}
        onClose={() => setBookingVehicle(null)}
      />
    </div>
  );
}