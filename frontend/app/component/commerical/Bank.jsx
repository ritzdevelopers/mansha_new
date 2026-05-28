import Image from "next/image";
import React from "react";

const Bank = () => {
  return (
    <section className="w-full pb-[0px] lg:pb-[0px]">
      <div className="mx-auto max-w-[1525px] ">
        <div
          className="w-full  bg-repeat py-8 sm:py-10 lg:py-12"
          style={{ backgroundImage: "url('/mansha-image/bank-detial-bg.png')" }}
        >
          <div className="mx-auto max-w-[760px] md:w-full bg-[#ffff] px-4 md:px-9 lg:px-0">
            <Image
              src="/mansha-image/detail.jpg"
              alt="Bank details"
              width={1200}
              height={280}
              className="h-auto w-full object-contain "
              sizes="(max-width: 768px) 100vw, 760px"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bank;