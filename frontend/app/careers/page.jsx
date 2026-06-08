import React from 'react'
import Section1 from '../component/careers/Section1'
import Footer from '../component/Home/Footer'
import TestimoniaCommon from '../component/common/Testimonia-common'
import ConsultationCommon from '../component/common/Consultation-common'
import Section2 from '../component/careers/Section2'
import Section3 from '../component/careers/Section3'
const page = () => {
  return (
    <div>
      <Section1/>
      <Section2/>
      <Section3/>
      <div className="pt-[35px] lg:pt-[70px]">
        <TestimoniaCommon/>
      </div>
      <ConsultationCommon/>
      <Footer/>
    </div>
  )
}

export default page