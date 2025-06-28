import Image from "next/image";
import { Car, Fuel, MapPin, Sparkles, Star, Users } from "lucide-react";
import { vehicles } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { RecommendationForm } from "@/components/recommendation-form";
import { TempleIcon } from "@/components/icons";

function Header() {
  return (
    <header className="py-4 px-4 md:px-8 border-b border-border/40 bg-background/95 backdrop-blur-sm sticky top-0 z-40">
      <div className="container mx-auto flex items-center justify-between">
        <a href="#" className="flex items-center gap-2" aria-label="Rungroj Carrent Home">
          <TempleIcon className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-foreground font-headline">รุ่งโรจน์ รถเช่า</h1>
        </a>
        <Button>ลงชื่อเข้าใช้</Button>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-muted py-8 mt-16">
      <div className="container mx-auto text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} รุ่งโรจน์ รถเช่า. สงวนลิขสิทธิ์.</p>
        <p className="text-sm mt-2">พันธมิตรที่เชื่อถือได้ของคุณในการสำรวจความมหัศจรรย์ของประเทศไทย</p>
      </div>
    </footer>
  );
}

function VehicleCard({ vehicle }: { vehicle: (typeof vehicles)[0] }) {
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
        <Button>เช่าเลย</Button>
      </CardFooter>
    </Card>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1">
        <section className="relative py-20 md:py-32 bg-card">
          <div className="absolute inset-0">
            <Image
              src="https://placehold.co/1920x1080.png"
              alt="Beautiful landscape in Thailand"
              fill
              className="object-cover opacity-20"
              data-ai-hint="thailand landscape"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          </div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h2 className="text-4xl md:text-6xl font-bold font-headline mb-4">ทุกการเดินทางของคุณ ให้เราดูแล</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            ค้นพบประเทศไทยด้วยยานพาหนะที่สมบูรณ์แบบ จากถนนในเมืองที่พลุกพล่านไปจนถึงชายหาดอันเงียบสงบ เรามีรถสำหรับทุกการผจญภัย
            </p>
            <div className="max-w-xl mx-auto bg-background/80 backdrop-blur-sm p-4 rounded-lg shadow-lg border">
              <div className="relative">
                <Input type="text" placeholder="ค้นหาด้วยเมือง, สถานที่สำคัญ, หรือจุดหมายปลายทาง..." className="w-full pl-10 h-12 text-base" />
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          </div>
        </section>

        <section id="recommend" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Sparkles className="h-10 w-10 mx-auto text-primary mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold font-headline">ไม่รู้จะเริ่มจากตรงไหน?</h2>
              <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
              ให้ AI ของเราแนะนำรถที่สมบูรณ์แบบสำหรับการเดินทางของคุณ เพียงบอกแผนการเดินทางของคุณ
              </p>
            </div>
            <RecommendationForm />
          </div>
        </section>

        <Separator className="container mx-auto" />

        <section id="fleet" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">รถของเรา</h2>
              <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
              มีรถให้เลือกมากมาย ตอบโจทย์ทุกความต้องการในประเทศไทย
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {vehicles.map((vehicle) => (
                <VehicleCard key={vehicle.name} vehicle={vehicle} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
