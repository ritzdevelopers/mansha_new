import UpcomingHero from "../component/upcoming-project/UpcomingHero";
import UpcomingNotify from "../component/upcoming-project/UpcomingNotify";
import Footer from "../component/Home/Footer";

export default function UpcomingProjectPage() {
  return (
    <main className="bg-[#FAFAFA]">
      <UpcomingHero />
      <UpcomingNotify />
      <Footer />
    </main>
  );
}
