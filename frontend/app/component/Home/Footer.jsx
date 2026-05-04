import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative w-full overflow-hidden bg-[#652A27] px-0 text-white">
      <div className="mx-auto max-w-8xl px-5 py-[35px] sm:px-8 md:px-6 lg:px-[75px] lg:pt-[70px] lg:pb-[40px]  ">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[1.2fr_0.6fr_0.6fr_0.8fr]">
          <div className="col-span-2 lg:col-span-1">
            <Image
              src="/mansha-image/footer-logo.png"
              alt="Mansha footer logo"
              width={94}
              height={94}
              className="h-auto w-[80px]"
            />
            <p className="mt-4 max-w-[380px] font-montserrat text-[15px] font-normal leading-[22px] tracking-normal text-[#FFFFFF]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation
            </p>
          </div>

          <div>
            <h3 className="font-montserrat text-[16px] font-semibold uppercase leading-[28px] tracking-normal text-[#FFFFFF]">Projects</h3>
            <ul className="lg:mt-4 mt-0 space-y-0 font-montserrat text-[15px] font-normal leading-[39px] tracking-normal text-[#FFFFFF]">
              <li><Link href="#">Residential</Link></li>
              <li><Link href="#">Commercial</Link></li>
            </ul>
          </div>

          <div className="xl:-ml-[70px]">
            <h3 className="font-montserrat text-[16px] font-semibold uppercase leading-[28px] tracking-normal text-[#FFFFFF]">Our Story</h3>
            <ul className="lg:mt-4 mt-0 space-y-0 font-montserrat text-[15px] font-normal leading-[39px] tracking-normal text-[#FFFFFF]">
              <li><Link href="#">About Us</Link></li>
              <li><Link href="#">Blogs</Link></li>
              <li><Link href="#">FAQ</Link></li>
              <li><Link href="#">Contact Us</Link></li>
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-1">
            <div className="relative mx-auto inline-block pb-3 before:absolute before:bottom-0 before:left-0 before:h-px before:w-1/2 before:bg-white after:absolute after:bottom-0 after:right-0 after:h-px after:w-1/2 after:bg-white lg:mx-0">
              <h3 className="text-center font-['Optima','Optima_LT_Pro',Candara,'Segoe_UI',sans-serif] text-[36px] lg:text-[30px] text-[28px] font-bold leading-[100%] tracking-normal text-[#FFFFFF] lg:text-left">
                Stay connected
              </h3>
            </div>
            <div className="mt-5 flex w-fit items-center gap-3 bg-[#652A27] py-1">
              <Image
                src="/mansha-image/google-review-footer.png"
                alt="Google review icon"
                width={26}
                height={40}
                className="h-[40px] w-[30px]"
              />
              <div className="font-montserrat">
                <p className="text-[14px] font-normal leading-[100%] text-white">Google review</p>
                <div className="mt-1 flex items-center gap-1 text-[16px] text-[#FFB800]">
                  <span className="mr-1 font-semibold leading-none">4.8</span>
                  <i className="ri-star-fill" />
                  <i className="ri-star-fill" />
                  <i className="ri-star-fill" />
                  <i className="ri-star-fill" />
                  <i className="ri-star-fill" />
                </div>
              </div>
            </div>
            <div className="mt-5 flex items-center gap-3 text-[#652A27]">
              {["ri-facebook-fill", "ri-twitter-x-line", "ri-linkedin-fill", "ri-instagram-line", "ri-youtube-line"].map((icon) => (
                <span key={icon} className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[16px]">
                  <i className={icon} />
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-[40px] md:grid-cols-[max-content_1fr] md:items-start">
          <div>
            <h4 className=" font-['Optima','Optima_LT_Pro',Candara,'Segoe_UI',sans-serif] text-[28px] font-[500] leading-[100%] tracking-normal text-[#FFFFFF] text-left">Corporate Office</h4>
            <p className="mt-2 max-w-[400px] font-montserrat text-[14px] font-normal leading-[26px] tracking-normal text-[#FFFFFF]">
              41st Floor, Tower-1, M3M International Financial Center, Sector-66, Golf
              Course Road (Extn.), Gurugram-122101, Haryana, India.
            </p>
          </div>

          <div className="space-y-4 lg:pt-1">
            <div>
              <p className="font-['Optima','Optima_LT_Pro',Candara,'Segoe_UI',sans-serif] text-[20px] font-[500] leading-[100%] tracking-normal text-[#FFFFFF]">Faridabad</p>
              <p className="mt-1 font-montserrat text-[13px] lg:text-[14px] font-normal leading-[26px] tracking-normal text-[#FFFFFF]">2715 Ash Dr. San Jose, South Dakota 83475</p>
            </div>
            <div>
              <p className="font-['Optima','Optima_LT_Pro',Candara,'Segoe_UI',sans-serif] text-[20px] font-[500] leading-[100%] tracking-normal text-[#FFFFFF]">Faridabad</p>
              <p className="mt-1 font-montserrat text-[13px] lg:text-[14px] font-normal leading-[26px] tracking-normal text-[#FFFFFF]">2715 Ash Dr. San Jose, South Dakota 83475</p>
            </div>
          </div>
        </div>

        <div className="mt-10 max-w-[800px]">
          <h4 className="text-center font-['Optima','Optima_LT_Pro',Candara,'Segoe_UI',sans-serif] text-[28px] font-[500] leading-[100%] tracking-normal text-[#FFFFFF] lg:text-left">Disclaimer</h4>
          <p className="mt-3 pb-8 max-width-[700px] text-justify font-montserrat text-[14px] font-normal leading-[26px] tracking-normal text-[#FFFFFF]">
            Mansha buildcon private limited, a trusted real estate developer, aims to
            provide accurate project information including pricing, layouts, and
            availability. However, all details are subject to change without prior
            notice. Images and amenities shown are for illustration purposes and may
            vary in actual delivery. We advise all buyers to verify information with
            authorized Mansha Group representatives before making investment decisions.
            Mansha Group is not liable for any discrepancies that may arise.
          </p>
          <div className="h-px w-screen bg-[#833E3B] relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]" />
          <p className="mt-5 font-montserrat text-[16px] font-normal leading-[26px] text-[#FFFFFFCC]">
            © 2026 Manshagroup. All Rights Reserved. Digital Media Planned By Ritz
            Media World
          </p>
        </div>
      </div>

      <div className="pointer-events-none absolute -bottom-[70px] -right-[20px] hidden h-[500px] w-[760px] overflow-hidden lg: hidden xl:block">
        <Image
          src="/mansha-image/footer-image.png"
          alt="Footer background"
          fill
          className="object-contain object-right-bottom"
        />
      </div>
    </footer>
  );
};

export default Footer;