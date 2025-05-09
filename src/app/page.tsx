import { Banner, CardsSection, GaleriaRecetas, StaticImage, Footer, Navbar  } from './imports';
export default function Home() {
  return (
    <section>        
      <Navbar />
      <StaticImage />
      <Banner />
      <CardsSection />
      <GaleriaRecetas />
      <Footer />
    </section>
  );
}
