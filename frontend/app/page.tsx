import PageRefreshLoader from "./component/Home/PageRefreshLoader";
import Navbar from "./component/Home/Nav";
import Headline from "./component/Home/Headline";
import ImageSection from "./component/Home/ImageSection";
import BuildTrust from "./component/Home/BuildTrust";
import Dream from "./component/Home/Dream";
import Facility from "./component/Home/Facility";
import Vegas from "./component/Home/Vegas";
import Signature from "./component/Home/signature";
import Manshagroup from "./component/Home/Manshagroup";
import Investment from "./component/Home/Investment";
import Faq from "./component/Home/Faq";
import Testiimonial from "./component/Home/Testiimonial";
import Consultation from "./component/Home/Consultation";
import Footer from "./component/Home/Footer";
export default function Home() {
  return (
    <div>
      <PageRefreshLoader />
      <Navbar />
      <Headline />
      <ImageSection />
      <BuildTrust />
      <Dream />
      <Facility />
      <Vegas />
      <Signature />
      <Manshagroup />
      <Investment />
      <Faq />
      <Testiimonial />
      <Consultation />
      <Footer />
    </div>
  );
}
