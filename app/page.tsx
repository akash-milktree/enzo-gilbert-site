import SmoothScroll from "@/components/ui/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import GrainOverlay from "@/components/ui/GrainOverlay";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import MeetEnzo from "@/components/MeetEnzo";
import GolfJourney from "@/components/GolfJourney";
import OtherSports from "@/components/OtherSports";
import Sponsors from "@/components/Sponsors";
import BlogGrid from "@/components/BlogGrid";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <GrainOverlay />
      <Navigation />
      <main>
        <Hero />
        <MeetEnzo />
        <GolfJourney />
        <OtherSports />
        <Sponsors />
        <BlogGrid />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
