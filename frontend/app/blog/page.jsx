import React from 'react'
import Navbar from '../component/blog/Navbar'
import Footer from '../component/Home/Footer'
import Smart from '../component/blog/Smart'
import RecentPosts from '../component/blog/Recent-Posts'
import TestimoniaCommon from '../component/common/Testimonia-common'
const page = () => {
  return (
    <div>
      <Navbar />
      <Smart />
      <RecentPosts />

      <div className="py-[35px] lg:py-[70px]">
        <TestimoniaCommon />
      </div>
      <Footer />
    </div>
  )
}

export default page
