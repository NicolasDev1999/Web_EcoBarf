import Banner from "./components/Banner";
import CardsSection from "./components/CardsSectio";
import GaleriaRecetas from "./components/GaleriaRecetas";
import Navbar from "./components/Navbar";
import StaticImage from "./components/StaticImage";

// app/page.tsx
export default function Home() {
  return (
      
  
    <section>
    <Navbar />
    <StaticImage/>
    <Banner />
    <CardsSection />
    <GaleriaRecetas />
    </section>
    
  );
}
