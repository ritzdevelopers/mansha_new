import React from 'react'
import AboutNav from '../component/About/Nav'
import Mansha from '../component/About/Mansha'
import Leadership from '../component/About/Leadership'
import Journey from '../component/About/Journey'
import Misson from '../component/About/Misson'
import Footer from '../component/Home/Footer'
import Map from '../component/About/Map'
import TestimoniaCommon from '../component/common/Testimonia-common'
import ConsultationCommon from '../component/common/Consultation-common'
import OurJourney from '../component/About/Our-Journey'

const AboutUs = () => {
  return (
    <div>
      <AboutNav />
    <Mansha />
    <Leadership />
    <Journey />
    {/* <OurJourney /> */}
    <Misson/>
    <Map/>
    <div className="pt-[35px] lg:pt-[0px]">
    <TestimoniaCommon/>
    </div>
    <ConsultationCommon/>
    
    <Footer/>
    </div>
  )
}

export default AboutUs