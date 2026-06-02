import Image from "next/image";
import Link from "next/link";

const DELIVERED_PROJECTS = [
  {
    location: "Sector-98, Faridabad, Haryana",
    image: "/delieverd/mansha.png",
    alt: "",
    href: "/mansha-oaks-4",
  },
  {
    location: "Sector-9, Palwal",
    image: "/delieverd/mansha-city-palwal.png",
    alt: "Mansha City Palwal",
    href: "/mansha-city-palwal-2",
  },
  {
    location: "Aligarh Road, Palwal",
    image: "/delieverd/mansha-royal-city.png",
    alt: "Mansha Royal City",
    href: "/mansha-royal-city",
  },
  {
    location: "Sector 72, Greater Faridabad",
    image: "/delieverd/mansha-luxury-floor.png",
    alt: "Mansha Luxury Floor",
    href: "/mansha-luxury-floors",
  },
  {
    location: "Sector 1 Eden SLF City, Taraori, Haryana",
    image: "/delieverd/eden-city.png",
    alt: "Eden City",
    href: "/eden-slf-city",
  },
  {
    location: "SECTOR-1, G.T. RD, TARAORI-NILOKHORI, KARNAL",
    image: "/delieverd/mansha-indr-green.png",
    alt: "Mansha Indr Green",
    href: "/indraprastha-greens",
  },
  {
    location: "HASANPUR ROAD, DEEGHOT, HARYANA 121105",
    image: "/delieverd/mansha-estate.png",
    alt: "Mansha Estate",
    href: "/mansha-estate",
  },
  {
    location: "SRS CITY, SECTOR-6, Palwal",
    image: "/delieverd/mansha-floor.png",
    alt: "Mansha Floor",
    href: "/mansha-floors-2",
  },
  {
    location: "JUNDLA, KARNAL",
    image: "/delieverd/mansha-model-town.png",
    alt: "Mansha Model Town",
    href: "/mansha-model-town",
  },
  {
    location: "DELHI – MATHURA ROAD, NH-2 palwal",
    image: "/delieverd/mansha-residence.png",
    alt: "Mansha Residence",
    href: "/mansha-residency",
  },
  {
    location: "NH NO. 2, MAIN MATHURA ROAD",
    image: "/delieverd/Logos-For-Website-11.png",
    alt: "Mansha project",
    href: "/mansha-greens-2",
  },
];

const Section2 = () => {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-8xl px-5 py-[35px] sm:px-8 lg:px-[75px] lg:py-[70px]">
        <h2 className="font-optima text-[28px] md:text-[36px] sm:text-[42px] lg:text-[40px] xl:text-[48px] font-[500] not-italic leading-none tracking-normal capitalize text-[#000000] text-center md:text-left [leading-trim:none] ">
          Delivered Projects
        </h2>
        {/* <div className="mt-6 text-center md:text-left  text-[16px] font-montserrat font-normal leading-[28px] tracking-normal capitalize text-[#6B6B6B]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit aliquid tempore labore fuga, ex quo tenetur dolore temporibus inventore voluptate.</div> */}
        <div className=" mt-6 delivered-cards-grid grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
          {DELIVERED_PROJECTS.map((project) => {
            const cardClassName =
              "delivered-project-card flex flex-col items-center gap-4 rounded-lg border-2 border-[#E0E0E0] bg-white p-5 sm:p-6 xl:flex-row xl:items-center xl:gap-6";

            const cardContent = (
              <>
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.alt}
                    width={120}
                    height={43}
                    className="h-auto w-auto max-w-[280px] shrink-0 object-contain"
                  />
                ) : null}

                <p className="w-full text-center font-['Open_Sans','Open Sans',sans-serif] text-[18px] font-normal leading-[22px] tracking-normal text-[#000000] sm:text-center sm:text-[15px] sm:leading-[24px] md:text-[22px] xl:text-left">
                  {project.location}
                </p>
              </>
            );

            return project.href ? (
              <Link
                key={project.location}
                href={project.href}
                className={`${cardClassName} no-underline`}
              >
                {cardContent}
              </Link>
            ) : (
              <article key={project.location} className={cardClassName}>
                {cardContent}
              </article>
            );
          })}
        </div>
      </div>

      <style>{`
        .delivered-cards-grid {
          overflow: visible;
        }

        .delivered-project-card {
          cursor: pointer;
          position: relative;
          z-index: 0;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .delivered-project-card:hover {
          z-index: 1;
          transform: translateY(-2px);
          box-shadow: 0 8px 12px rgba(101, 42, 39, 0.28);
        }
      `}</style>
    </section>
  );
};

export default Section2;
