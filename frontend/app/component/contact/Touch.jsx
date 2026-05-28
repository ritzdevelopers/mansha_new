import Image from "next/image";
import React from "react";

const CONTACT_ITEMS = [
  {
    icon: "/contact-image/customer-support.svg",
    title: "Customer Support",
    lines: ["info@manshagroup.in", "+91- 8010003838"],
  },
  {
    icon: "/contact-image/sale-enquiry.svg",
    title: "Sales Enquiries",
    lines: ["Call:", "+91- 8010003838", "email:", "info@manshagroup.in"],
  },
  {
    icon: "/contact-image/press.svg",
    title: "For Press / Media Queries:",
    lines: ["Call:", "+91- 8010003838", "mail:", "info@manshagroup.in"],
  },
];

const CONTACT_LABELS = new Set(["Call:", "email:", "mail:"]);

const Touch = () => {
  return (
    <section className="w-full bg-white pb-[0px] lg:pb-[0px]">
      <div className="mx-auto max-w-[1525px] px-5 sm:px-8 lg:px-[75px]">
        <div>
          <h2 className="font-optima text-[28px] md:text-[36px] font-[500] leading-[100%] tracking-normal text-[#111111] text-center md:text-left">
            Get In Touch
          </h2>
          <div className="md:mt-4 mt-2 h-px w-full bg-[#E5E5E5] max-w-[1030px]" aria-hidden />
          <p className="mt-5 max-w-[1080px] font-montserrat text-[14px] font-normal capitalize leading-[24px] tracking-normal text-[#515151] text-center md:text-left">
          Reach out to our team for expert advice, quick responses, and seamless support for your needs.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.9fr)] lg:gap-12">
          <form className="rounded-xl bg-white p-5 shadow-[0px_4px_16px_0px_#7F7F7F40] md:p-6 xl:py-13 xl:px-5">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

              <input
                type="text"
                name="name"
                placeholder="Name *"
                className="h-[56px] w-full bg-[#FAFAFA] px-5 font-montserrat text-[14px] font-normal leading-[24px] text-[#515151] outline-none placeholder:text-[#515151]"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone No *"
                className="h-[56px] w-full bg-[#FAFAFA] px-5 font-montserrat text-[14px] font-normal leading-[24px] text-[#515151] outline-none placeholder:text-[#515151]"
              />
              <input
                type="email"
                name="email"
                placeholder="Email *"
                className="h-[56px] w-full bg-[#FAFAFA] px-5 font-montserrat text-[14px] font-normal leading-[24px] text-[#515151] outline-none placeholder:text-[#515151]"
              />
            </div>

            <textarea
              name="message"
              placeholder="Message"
              rows={3}
              className="mt-5 w-full resize-none bg-[#FAFAFA] px-5 py-4 font-montserrat text-[14px] font-normal leading-[24px] text-[#515151] outline-none placeholder:text-[#515151]"
            />

            <button
              type="button"
              className="mt-5 w-full cursor-pointer rounded-md bg-[#652A27] py-4 font-montserrat text-[16px] font-semibold leading-[100%] text-white transition-colors duration-300 hover:bg-[#4f201e]"
            >
              Get a Call Back
            </button>
          </form>

          <div className="relative mx-auto h-[260px] w-full max-w-[500px] lg:h-[310px]">
            <Image
              src="/contact-image/touch-section.jpg"
              alt="Construction planning discussion"
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 36vw"
            />
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-2 md:gap-10 lg:gap-6 xl:mt-25 xl:grid-cols-3 xl:gap-8">
  {CONTACT_ITEMS.map((item) => (
    <div key={item.title} className="flex items-start gap-6">
      <div className="flex h-[64px] w-[64px] shrink-0 items-center justify-center rounded-full bg-white shadow-[0px_4px_16px_0px_#0000001A]">
        <Image
          src={item.icon}
          alt=""
          width={24}
          height={24}
          className="h-6 w-6 object-contain"
          aria-hidden
        />
      </div>

      <div>
        <h3
          className={`font-montserrat md:text-[20px] text-[18px] font-medium leading-[100%] tracking-normal text-[#111111] ${
            item.title === "For Press / Media Queries:" ? "md:whitespace-nowrap" : ""
          }`}
        >
          {item.title}
        </h3>

        <div className="mt-3 font-montserrat text-[16px] font-normal leading-[25px] tracking-normal text-[#515151]">
          {item.lines.map((line, index) => {
            if (CONTACT_LABELS.has(line)) {
              const value = item.lines[index + 1];

              return (
                <React.Fragment key={`${item.title}-${line}`}>
                  <p className="hidden font-semibold leading-[25px] text-[#515151] lg:block">
                    {line}
                  </p>
                  <p className="hidden lg:block">{value}</p>
                  <p className="lg:hidden">
                    <span className="font-semibold leading-[25px] text-[#515151]">
                      {line}
                    </span>{" "}
                    {value}
                  </p>
                </React.Fragment>
              );
            }

            if (CONTACT_LABELS.has(item.lines[index - 1])) {
              return null;
            }

            return <p key={`${item.title}-${line}`}>{line}</p>;
          })}
        </div>
      </div>
    </div>
  ))}
</div>
      </div>
    </section>
  );
};

export default Touch;