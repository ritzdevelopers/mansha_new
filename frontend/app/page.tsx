import PageRefreshLoader from "./component/Home/PageRefreshLoader";
import Navbar from "./component/Home/Nav";
import Headline from "./component/Home/Headline";
import ImageSection from "./component/Home/ImageSection";
import BuildTrust from "./component/Home/BuildTrust";
import Dream from "./component/Home/Dream";
import Facility from "./component/Home/Facility";
import Vegas from "./component/Home/Vegas";
import Signature from "./component/common/Signature";
import Manshagroup from "./component/Home/Manshagroup";
import Investment from "./component/Home/Investment";
import Faq from "./component/common/FAQ";
import Testiimonial from "./component/Home/Testiimonial";
import Consultation from "./component/Home/Consultation";
import Footer from "./component/Home/Footer";
import TestimoniaCommon from "./component/common/Testimonia-common";
import ConsultationCommon from "./component/common/Consultation-common";
import FAQCommon from "./component/common/FAQCommon";
import InvertmentCommmon from "./component/common/InvertmentCommmon";
export default function Home() {
  return (
    <div>
      {/* <PageRefreshLoader /> */}
      <Navbar />
      <Headline />
      <ImageSection />
      <BuildTrust />
      <Dream />
      <Facility />
      <Vegas />
     <Signature/>
      <Manshagroup />
      <InvertmentCommmon />
      {/* <Investment /> */}
      <div className="pt-[35px] lg:pt-[70px]">
          <FAQCommon />
      </div>
      {/* <Testiimonial /> */}
      <div className="py-[35px] lg:py-[70px]"> 
      <TestimoniaCommon/>
      </div>
      {/* <Consultation /> */}
      <ConsultationCommon />
      <Footer />
    </div>
  );
}
