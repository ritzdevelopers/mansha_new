import Image from "next/image";
import React from "react";

const Leadership = () => {
  return (
    <section className="w-full ">
      <div className="mx-auto max-w-8xl px-5 py-[35px] text-center sm:px-8 lg:px-[75px] lg:py-[70px] bg-[#FDFDFD]">
        <h2 className="font-optima text-[28px] md:text-[36px] lg:text-[30px] xl:text-[36px] font-[500] leading-[30px] md:leading-[48px] tracking-[0%] capitalize text-[#111111]">
        Growth Driven By Leadership

        </h2>

        <p className="mx-auto mt-4 max-w-[1050px] font-montserrat text-[16px] font-normal leading-[25px] md:leading-[29px] tracking-[0px] capitalize text-[#333333]">
        Leadership is the foundation of lasting achievement. Inspiring collaboration, resilience,and continuous progress. Turning potential into measurable success every day.

        </p>

        <div className="mx-auto mt-10 grid max-w-[830px] grid-cols-1 gap-6 md:grid-cols-2">
          <article className="group overflow-hidden rounded-b-[10px] border border-[#E5E5E5] bg-white text-left">
            <div className="overflow-hidden">
              <Image
                src="/mansha-image/leader-1.jpg"
                alt="Mr Naresh Malik"
                title="Mr Naresh Malik"
                width={400}
                height={400}
                className="h-auto w-full cursor-pointer object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              />
            </div>
            <div className="px-4 py-4">
              <h3 className="font-montserrat text-[18px] font-medium leading-[100%] tracking-[0%] text-[#111111]">
                Mr Naresh Malik
              </h3>
              <p className="mt-2 font-montserrat text-[14px] font-medium leading-[100%] tracking-[0%] capitalize text-[#666666]">
                Founder, manshagroup
              </p>
              <p className="mt-3 font-montserrat text-[14px] font-medium leading-[22px] tracking-[0%] capitalize text-[#333333]">
                Mr. Naresh Malik, the visionary Founder & Chairman of Mansha
                Group, brings decades...
              </p>
              <button className="mt-4 cursor-pointer font-montserrat text-[14px] font-semibold leading-[100%] tracking-[0%] capitalize text-[#652A27]">
                Read More
              </button>
            </div>
          </article>

          <article className="group overflow-hidden rounded-b-[10px] border border-[#E5E5E5] bg-white text-left">
            <div className="overflow-hidden">
              <Image
                src="/mansha-image/leader-2.jpg"
                alt="Mr Himanshu Malik"
                title="Mr Himanshu Malik"
                width={400}
                height={400}
                className="h-auto w-full cursor-pointer object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              />
            </div>
            <div className="px-4 py-4">
              <h3 className="font-montserrat text-[18px] font-medium leading-[100%] tracking-[0%] text-[#111111]">
                Mr Himanshu Malik
              </h3>
              <p className="mt-2 font-montserrat text-[14px] font-medium leading-[100%] tracking-[0%] capitalize text-[#666666]">
                Director, manshagroup
              </p>
              <p className="mt-3 font-montserrat text-[14px] font-medium leading-[22px] tracking-[0%] capitalize text-[#333333]">
                Mr. Himanshu Malik, Director of Mansha Group, represents the
                new generation of vis...
              </p>
              <button className="mt-4 cursor-pointer font-montserrat text-[14px] font-semibold leading-[100%] tracking-[0%] capitalize text-[#652A27]">
                Read More
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Leadership;