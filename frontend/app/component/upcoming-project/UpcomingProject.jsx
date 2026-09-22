import Image from "next/image";
import Link from "next/link";

const DELIVERED_PROJECTS = [
    {
        location: "Mansha Low-Rise & High-Rise – Sector 104, Faridabad",
        image: "/logo/oaks.png",
        alt: "Mansha Low-Rise & High-Rise",
        href: "/#",
    },
    {
        location: "Mansha Evernest – Sector 114, Faridabad",
        image: "/logo/logo-city-palwal.png",
        alt: "Mansha Evernest",
        href: "/#",
    },
    {
        location: "Senior Living High-Rise – Faridabad",
        image: "/logo/royal-logo.png",
        alt: "Senior Living High-Rise",
        href: "/#",
    },
    {
        location: "Ultra-Luxury High-Rise – Sector 83, Sonipat",
        image: "/logo/luxuary.png",
        alt: "Ultra-Luxury High-Rise",
        href: "/#",
    },
    {
        location: "Plotted Township – Faridabad",
        image: "/logo/eden-logo.png",
        alt: "Plotted Township",
        href: "/#",
    },
    {
        location: "Industrial Township – Palwal / Faridabad",
        image: "/logo/inderprashta.png",
        alt: "Industrial Township",
        href: "/#",
    },
];

const renderProjectCard = (project) => {
    const cardClassName =
        "delivered-project-card flex h-full flex-col items-center gap-4 rounded-lg border-2 border-[#E0E0E0] bg-white p-5 sm:p-6";

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

const UpcomingProject = () => {
    return (
        <section className="w-full bg-white">
            <div className="mx-auto max-w-8xl px-5 py-[35px] sm:px-8 lg:px-[75px] lg:py-[70px]">
                <div className="mx-auto max-w-4xl text-center md:mx-0 md:max-w-none md:text-left">
                    <p className="font-montserrat text-[13px] font-medium uppercase tracking-[0.18em] text-[#652A27]">
                        Building What’s Next
                    </p>
                    <h2 className="mt-3 font-optima text-[28px] font-[500] capitalize leading-none tracking-normal text-[#000000] sm:text-[36px] lg:text-[40px] xl:text-[48px]">
                        Our Upcoming Projects
                    </h2>
                    <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#652A27] md:mx-0" />
                </div>

                <div className="mx-auto mt-6 max-w-3xl text-center font-montserrat text-[16px] font-normal leading-[28px] tracking-normal text-[#6B6B6B] md:mx-0 md:max-w-none md:text-left">
                    Mansha Group continues to expand its portfolio with a new generation of residential and industrial developments across key growth corridors. From planned homes and high-rise living to large-scale townships, our upcoming projects are envisioned to create distinctive spaces that align with the evolving needs of modern communities.
                </div>

                <p className="mt-4 text-center font-montserrat text-[15px] font-medium uppercase tracking-[0.08em] text-[#333333] md:text-left">
                    Our upcoming developments include:
                </p>

                <div className="delivered-cards-grid mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {DELIVERED_PROJECTS.map((project) => renderProjectCard(project))}
                </div>

                <p className="mt-10 text-center font-optima text-[20px] font-medium capitalize leading-[30px] text-[#652A27] md:text-left md:text-[22px] md:leading-[34px] lg:text-[24px]">
                    More destinations. More possibilities. A stronger future ahead.
                </p>
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

export default UpcomingProject;
