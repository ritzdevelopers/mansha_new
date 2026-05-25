import React from 'react'   
import Navbar from '../component/commerical/Navbar'
import Invest from '../component/commerical/Invest'
import Brandsection from '../component/common/Brandsection'
import Bank from '../component/commerical/Bank'
import Footer from '../component/Home/Footer'
import FAQCommerical from '../component/commerical/FAQCommerical'
import TestimoniaCommon from '../component/common/Testimonia-common'
import Workplace from '../component/commerical/Workplace'
import Gallery from '../component/commerical/Gallery'
import Everything from '../component/commerical/Everything'

const CommercialPage = () => {
  return (
    <div>
      <Navbar />
      <Invest />
      <Brandsection />
     <Gallery/>
      <Bank />
      <Everything/>
      <FAQCommerical />
      <TestimoniaCommon/>
      <Workplace />
      <Footer />
    </div>
  );
};

export default CommercialPage;