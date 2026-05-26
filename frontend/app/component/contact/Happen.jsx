import React from "react";

const MAP_EMBED_SRC =
  "https://www.google.com/maps?q=P-2%2F3%2C+Sector+75%2C+Faridabad%2C+Haryana+121006&output=embed";

const OFFICE_ADDRESSES = [
  {
    label: "Corporate Office Address :",
    value: "P-23, Sector 75, Faridabad",
  },
  {
    label: "Project Address (Sonipat):",
    value: "Sector 83 & 84, Sonipat, Bang On Main GT Karnal Road",
    valueOnNewLineLg: true,
  },
];

const OFFICE_CONTACT = [
  { label: "Phone :", value: "+91 8010003838", href: "tel:+918010003838" },
  {
    label: "Email :",
    value: "info@manshagroup.in",
    href: "mailto:info@manshagroup.in",
  },
];

const Happen = () => {
  return (
    <section className="w-full bg-white py-[35px] lg:py-[70px]">
      <div className=" mx-auto max-w-[1525px] px-5 sm:px-8 lg:px-[75px] 2xl:px-[70px]">
        <div className="min-w-0">
          <div>
            <h2 className="font-optima text-[28px] md:text-[36px] font-[500] capitalize leading-[30px] tracking-normal text-[#111111] text-center md:text-left">
            Want to Work with a Trusted Real Estate Developer?
            </h2>
            <div className="lg:mt-4 mt-2 h-px w-full bg-[#E5E5E5] xl:w-[650px]" aria-hidden />
            <p className="font-montserrat md:mt-10 mt-5 text-[18px] font-normal capitalize leading-[24px] tracking-normal text-[#333333] text-center md:text-left">
            Get in touch with us.
            </p>
          </div>

          <div className="lg:mt-8 mt-5 flex min-w-0 flex-col gap-8 lg:flex-row lg:items-start lg:gap-10 xl:gap-30">
            <div className="mt-5 min-w-0 flex-1 lg:mt-10 lg:flex-[1]">
              <h3 className="font-optima text-[28px] font-[500] capitalize leading-[100%] tracking-normal text-[#111111] md:text-[36px]">
                Corporate Office
              </h3>

              <div className="mt-6 space-y-4">
                {OFFICE_ADDRESSES.map((row) => (
                  <div
                    key={row.label}
                    className={`flex flex-col gap-1 sm:flex-row sm:items-start sm:gap-3 ${
                      row.valueOnNewLineLg ? "lg:flex-col xl:flex-row" : ""
                    }`}
                  >
                    <span className="shrink-0 font-montserrat text-[16px] font-semibold capitalize leading-[27px] tracking-normal text-[#111111]">
                      {row.label}
                    </span>
                    <span className="font-montserrat text-[16px] font-normal capitalize leading-[27px] tracking-normal text-[#333333]">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="my-6 h-px w-full bg-[#E5E5E5]" aria-hidden />

              {OFFICE_CONTACT.map((row, index) => (
                <React.Fragment key={row.label}>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
                    <span className="shrink-0 font-montserrat text-[16px] font-semibold capitalize leading-[27px] tracking-normal text-[#111111]">
                      {row.label}
                    </span>
                    <a
                      href={row.href}
                      className="font-montserrat text-[16px] font-normal capitalize leading-[27px] tracking-normal text-[#333333] transition-colors hover:text-[#652A27]"
                    >
                      {row.value}
                    </a>
                  </div>
                  {index < OFFICE_CONTACT.length - 1 ? (
                    <div className="my-6 h-px w-full bg-[#E5E5E5]" aria-hidden />
                  ) : null}
                </React.Fragment>
              ))}
            </div>

            <div className="relative xl:h-[400px] lg:h-[450px] h-[450px] w-full min-w-0 shrink-0 overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)] ring-1 ring-black/[0.06] lg:flex-[1.12]">
              <iframe
                title="Mansha office location map"
                src={MAP_EMBED_SRC}
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 block h-full w-full border-0"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Happen;
