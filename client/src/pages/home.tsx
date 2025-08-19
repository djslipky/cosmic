import Header from "@/components/header";
import Hero from "@/components/hero";
import Facilities from "@/components/facilities";
import Reservation from "@/components/reservation";
import Pricing from "@/components/pricing";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import Particles from "@/components/particles";

export default function Home() {
  return (
    <div className="min-h-screen cosmic-bg relative">
      <Particles />
      <Header />
      <Hero />
      <Facilities />
      <Reservation />
      <Pricing />
      <Contact />
      <Footer />
    </div>
  );
}
