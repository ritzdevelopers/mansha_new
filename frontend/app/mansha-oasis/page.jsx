import React from 'react'
import Section1 from '../component/ManshaOasis/Section1'
import Footer from '../component/Home/Footer'
import Section2 from '../component/ManshaOasis/Section2'
import Section3 from '../component/ManshaOasis/Section3'
import Section4 from '../component/ManshaOasis/Section4'
import Section5 from '../component/ManshaOasis/Section5'
import Section6 from '../component/ManshaOasis/Section6'
import Section7 from '../component/ManshaOasis/Section7'
import Section8 from '../component/ManshaOasis/Section8'
import Section9 from '../component/ManshaOasis/Section9'
import ConsultationCommon from '../component/common/Consultation-common'
import TestimoniaCommon from '../component/common/Testimonia-common'
const ManshaOasis = () => {
  return (
    <>
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      
      <Section6 />
      <div className="py-[35px] lg:py-[70px]">
      <Section7 />
      </div>
      <Section8 />
      {/* <Section9 /> */}
      <TestimoniaCommon/>
      <ConsultationCommon />
      <Footer />
    </>
  )
}

export default ManshaOasis