import React from 'react'
import Section1 from '../component/careers/Section1'
import Footer from '../component/Home/Footer'
import TestimoniaCommon from '../component/common/Testimonia-common'
import ConsultationCommon from '../component/common/Consultation-common'
import Section2 from '../component/careers/Section2'
const page = () => {
  return (
    <div>
      <Section1/>
      <Section2/>
      <div className="py-[35px] lg:py-[70px]">
        <TestimoniaCommon/>
      </div>
      <ConsultationCommon/>
      <Footer/>
    </div>
  )
}

export default page