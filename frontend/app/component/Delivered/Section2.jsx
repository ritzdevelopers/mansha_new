import Image from "next/image";
import Link from "next/link";

const DELIVERED_PROJECTS = [
  {
    location: "Sector-98, Faridabad, Haryana",
    image: "/logo/oaks.png",
    alt: "",
    href: "/mansha-oaks-4",
  },
  {
    location: "Sector-9, Palwal",
    image: "/logo/logo-city-palwal.png",
    alt: "Mansha City Palwal",
    href: "/mansha-city-palwal-2",
  },
  {
    location: "Aligarh Road, Palwal",
    image: "/logo/royal-logo.png",
    alt: "Mansha Royal City",
    href: "/mansha-royal-city",
  },
  {
    location: "Sector 72, Greater Faridabad",
    image: "/logo/luxuary.png",
    alt: "Mansha Luxury Floor",
    href: "/mansha-luxury-floors",
  },
  {
    location: "Sector 1 Eden SLF City, Taraori, Haryana",
    image: "/logo/eden-logo.png",
    alt: "Eden City",
    href: "/eden-slf-city",
  },
  {
    location: "Sector-1, G.T. Rd, Taraori-Nilokheri, Karnal",
    image: "/logo/inderprashta.png",
    alt: "Mansha Indr Green",
    href: "/indraprastha-greens",
  },
  {
    location: "Hasanpur Road, Deeghot, Haryana 121105",
    image: "/delieverd/mansha-estate.png",
    alt: "Mansha Estate",
    href: "/mansha-estate",
  },
  {
    location: "SRS City, Sector-6, Palwal",
    image: "/logo/floor-logo.png",
    alt: "Mansha Floor",
    href: "/mansha-floors-2",
  },
  {
    location: "Jundla, Karnal",
    image: "/logo/model-town.png",
    alt: "Mansha Model Town",
    href: "/mansha-model-town",
  },
  {
    location: "Delhi – Mathura Road, NH-2 Palwal",
    image: "/logo/residency-logo.png",
    alt: "Mansha Residence",
    href: "/mansha-residency",
  },
  {
    location: "NH No. 2, Main Mathura Road",
    image: "/logo/green-logo.png",
    alt: "Mansha project",
    href: "/mansha-greens-2",
  },
];

const MAIN_PROJECTS = DELIVERED_PROJECTS.slice(0, -2);
const LAST_ROW_PROJECTS = DELIVERED_PROJECTS.slice(-2);

const renderProjectCard = (project, extraClassName = "") => {
  const cardClassName = `delivered-project-card flex flex-col items-center gap-4 rounded-lg border-2 border-[#E0E0E0] bg-white p-5 sm:p-6 ${extraClassName}`;

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

      <p className="w-full text-center font-['Open_Sans','Open Sans',sans-serif] text-[18px] font-normal leading-[22px] tracking-normal text-[#000000] sm:text-center sm:text-[15px] sm:leading-[24px] md:text-[22px]">
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
};

const Section2 = () => {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-8xl px-5 py-[35px] sm:px-8 lg:px-[75px] lg:py-[70px]">
        <h2 className="font-optima text-[28px] md:text-[36px] sm:text-[42px] lg:text-[40px] xl:text-[48px] font-[500] not-italic leading-none tracking-normal capitalize text-[#000000] text-center md:text-left [leading-trim:none] ">
          Delivered Projects
        </h2>
        {/* <div className="mt-6 text-center md:text-left  text-[16px] font-montserrat font-normal leading-[28px] tracking-normal capitalize text-[#6B6B6B]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit aliquid tempore labore fuga, ex quo tenetur dolore temporibus inventore voluptate.</div> */}
        <div className="mt-6 delivered-cards-grid grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:hidden">
          {DELIVERED_PROJECTS.map((project) => renderProjectCard(project))}
        </div>

        <div className="mt-6 delivered-cards-grid hidden grid-cols-1 gap-4 xl:grid xl:grid-cols-3">
          {MAIN_PROJECTS.map((project) => renderProjectCard(project))}

          <div className="col-span-3 flex flex-wrap justify-center gap-4">
            {LAST_ROW_PROJECTS.map((project) =>
              renderProjectCard(
                project,
                "w-[calc(33.333%-0.67rem)]"
              )
            )}
          </div>
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
