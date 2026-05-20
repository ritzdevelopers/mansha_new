import React from 'react'
import Section1 from '../component/AagmanByMansha/Section1'
import Footer from '../component/Home/Footer'
import Section2 from '../component/AagmanByMansha/Section2'
import Section3 from '../component/AagmanByMansha/Section3'
import Section4 from '../component/AagmanByMansha/Section4'
import Section5 from '../component/AagmanByMansha/Section5'
import Section6 from '../component/AagmanByMansha/Section6'
import Section7 from '../component/AagmanByMansha/Section7'
import Section8 from '../component/AagmanByMansha/Section8'
import ConsultationCommon from '../component/common/Consultation-common'
import Section9 from '../component/ManshaOasis/Section9'
import TestimoniaCommon from '../component/common/Testimonia-common'

const AagmanByMansha = () => {
  return (
    <div>
      <Section1/>
      <Section2/>
      <Section3/>
      <Section4/>
      <Section5/>
      <Section6/>
      <div className="py-[35px] lg:py-[70px]">
      <Section7/>
      </div>
      <Section8/>
      <TestimoniaCommon />
      <ConsultationCommon />
      <Footer/>
    </div>
  );
};

export default AagmanByMansha;