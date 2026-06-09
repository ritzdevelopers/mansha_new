import React from 'react'
import Section1 from '../component/mansha-oaks-4/Section1'
import Footer from '../component/Home/Footer'
import Section2 from '../component/mansha-oaks-4/Section2'
import Section3 from '../component/mansha-oaks-4/Section3'
import Section4 from '../component/mansha-oaks-4/Section4'
import InvertmentCommmon from '../component/common/InvertmentCommmon'
import MapCommon from '../component/common/Map-Common'
import OaksMap from '../component/mansha-oaks-4/oaks-map'


const ManshaOaks4 = () => {
  return (
    <>
     <Section1 />
     <Section2 />
     <Section3 />
     <Section4 />
     <div className="">
     <InvertmentCommmon />
     </div>
     <OaksMap />
     <Footer /> 
    </>
  )
}

export default ManshaOaks4