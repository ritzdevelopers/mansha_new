import React from 'react'
import Section1 from '../component/mansha-heritage/Section1'
import Footer from '../component/Home/Footer'
import Section2 from '../component/mansha-heritage/Section2'
import Section3 from '../component/mansha-heritage/Section3'
import Section4 from '../component/mansha-heritage/Section4'
import Section5 from '../component/mansha-heritage/Section5'
import Section6 from '../component/mansha-heritage/Section6'
import Section7 from '../component/mansha-heritage/Section7'
import Section8 from '../component/mansha-heritage/Section8'
import TestimoniaCommon from '../component/common/Testimonia-common'
import ConsultationCommon from '../component/common/Consultation-common'

const ManshaHeritage = () => {
  return (
    <>
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
    <TestimoniaCommon/>
    <ConsultationCommon/> 
    <Footer/>
    </>
  )
}

export default ManshaHeritage