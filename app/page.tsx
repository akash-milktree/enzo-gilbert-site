import SmoothScroll from "@/components/ui/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import GrainOverlay from "@/components/ui/GrainOverlay";
import Preloader from "@/components/ui/Preloader";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import MeetEnzo from "@/components/MeetEnzo";
import GolfJourney from "@/components/GolfJourney";
import SportsShowcase from "@/components/SportsShowcase";
import Sponsors from "@/components/Sponsors";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <Preloader />
      <CustomCursor />
      <GrainOverlay />
      <Navigation />
      <main>
        <Hero />
        <MeetEnzo />
        <GolfJourney />
        <SportsShowcase />
        <Sponsors />
        <ContactSection />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
