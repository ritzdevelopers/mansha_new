import React from 'react'
import ContactNav from '../component/contact/ContactNav'
import Footer from '../component/Home/Footer'
import Happen from '../component/contact/Happen'
import Touch from '../component/contact/Touch'
import ContactFAQ from '../component/contact/Contact-FAQ'
import TestimoniaCommon from '../component/common/Testimonia-common'
import Consultation from '../component/Home/Consultation'
import FAQCommon from '../component/common/FAQCommon'
const page = () => {
  return (
    <div>
      <ContactNav/>
      <Happen/>
      <Touch/>
      <div className="pt-[35px] lg:pt-[70px]">
          <FAQCommon />
      </div>  
      <TestimoniaCommon/>
      <Consultation/>
      <Footer/>
      </div>
  
  )
}

export default page