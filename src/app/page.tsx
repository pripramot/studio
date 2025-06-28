import Image from "next/image";
import { Car, Fuel, MapPin, Sparkles, Star, Users, Award, Flame, Truck } from "lucide-react";
import { vehicles } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { RecommendationForm } from "@/components/recommendation-form";
import { LogoIcon } from "@/components/icons";

function Header() {
  return (
    <header className="py-4 px-4 md:px-8 border-b border-border/40 bg-background/95 backdrop-blur-sm sticky top-0 z-40">
      <div className="container mx-auto flex items-center justify-between">
        <a href="#" className="flex items-center gap-2" aria-label="Rungroj Carrent Home">
          <LogoIcon className="h-8 w-8" />
          <h1 className="text-2xl font-bold text-foreground font-headline">Rungroj Carrent</h1>
        </a>
        <Button>Sign In</Button>
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
            Rungroj Carrent in Udon Thani offers self-drive car rentals with free Class 1 insurance. Trust us for a safe drive.
            </p>
          </div>
          <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold text-foreground mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#fleet" className="hover:text-primary transition-colors">Our Fleet</a></li>
                <li><a href="#recommend" className="hover:text-primary transition-colors">AI Recommendation</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Daily Rentals</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Monthly Rentals</a></li>
              </ul>
            </div>
             <div>
              <h4 className="font-semibold text-foreground mb-4">About</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>
        <Separator className="my-8 bg-border/40" />
        <div className="text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Rungroj Carrent. All rights reserved.</p>
        </div>
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
          <div className="flex items-center gap-2"><Users className="h-4 w-4 text-primary" />{vehicle.seats} Seats</div>
          <div className="flex items-center gap-2"><Car className="h-4 w-4 text-primary" />{vehicle.type}</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 text-accent fill-accent" />
            <span className="font-bold">{vehicle.rating.toFixed(1)}</span>
            <span className="text-sm text-muted-foreground">({vehicle.reviews} reviews)</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 p-4 flex items-center justify-between">
        <div>
          <span className="text-2xl font-bold">฿{vehicle.price.toLocaleString()}</span>
          <span className="text-sm text-muted-foreground">/day</span>
        </div>
        <Button>Rent Now</Button>
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
            <h2 className="text-4xl md:text-6xl font-bold font-headline mb-4">Your Journey, Your Car</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Discover Thailand with the perfect vehicle. From bustling city streets to serene beaches, we have a car for every adventure.
            </p>
            <div className="max-w-xl mx-auto bg-background/80 backdrop-blur-sm p-4 rounded-lg shadow-lg border">
              <div className="relative">
                <Input type="text" placeholder="Search by city, landmark, or destination..." className="w-full pl-10 h-12 text-base" />
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
            </div>
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
                <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">RungRoj Car Rental Udon Thani</h2>
                <p className="text-lg text-muted-foreground mb-4">
                  With over 40 vehicles to choose from, Rungroj Karnchamnan Ltd., Part. provides top-tier car rental services at Udon Thani Airport.
                </p>
                <p className="text-muted-foreground">
                  Enjoy free cancellations and self-drive rentals available daily, weekly, or monthly at affordable prices. Your perfect ride is just a click away.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Why Choose Us?</h2>
              <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
                We provide a seamless, affordable, and reliable rental experience.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<Truck className="h-8 w-8" />}
                title="Free Car Delivery"
                description="We offer free delivery within the Udon Thani area, including Nong Prachak Public Park, at no extra charge."
              />
              <FeatureCard 
                icon={<Award className="h-8 w-8" />}
                title="Excellent Service"
                description="Be confident in our top-quality vehicles and outstanding service. Start your smooth journey with us."
              />
              <FeatureCard 
                icon={<Flame className="h-8 w-8" />}
                title="Super Hot Deals"
                description="Rentals start at just ฿699/day. All cars include Class 1 insurance and are delivered personally by the owner."
              />
            </div>
          </div>
        </section>

        <section id="recommend" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Sparkles className="h-10 w-10 mx-auto text-primary mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Let Our AI Find Your Perfect Car</h2>
              <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
                Answer a few simple questions and our AI will recommend the ideal vehicle for your journey.
              </p>
            </div>
            <RecommendationForm />
          </div>
        </section>

        <Separator className="container mx-auto" />

        <section id="fleet" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Our Fleet</h2>
              <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
              A wide selection of vehicles to meet your needs in Thailand.
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
