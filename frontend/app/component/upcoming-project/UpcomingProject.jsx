"use client";

// import Image from "next/image";

const NOTIFY_SECTION_ID = "upcoming-notify";

const UPCOMING_PROJECTS = [
    {
        name: "Mansha Low-Rise & High-Rise",
        location: "Sector 104, Faridabad",
        // image: "/logo/oaks.png",
        // alt: "Mansha Low-Rise & High-Rise",
    },
    {
        name: "Mansha Evernest",
        location: "Sector 114, Faridabad",
        // image: "/logo/logo-city-palwal.png",
        // alt: "Mansha Evernest",
    },
    {
        name: "Senior Living High-Rise",
        location: "Faridabad",
        // image: "/logo/royal-logo.png",
        // alt: "Senior Living High-Rise",
    },
    {
        name: "Ultra-Luxury High-Rise",
        location: "Sector 83, Sonipat",
        // image: "/logo/luxuary.png",
        // alt: "Ultra-Luxury High-Rise",
    },
    {
        name: "Plotted Township",
        location: "Faridabad",
        // image: "/logo/eden-logo.png",
        // alt: "Plotted Township",
    },
    {
        name: "Industrial Township",
        location: "Palwal / Faridabad",
        // image: "/logo/inderprashta.png",
        // alt: "Industrial Township",
    },
];

const scrollToNotifySection = () => {
    document.getElementById(NOTIFY_SECTION_ID)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
    });
};

const renderProjectCard = (project, index) => {
    return (
        <article
            key={project.name}
            className="upcoming-project-card group relative flex h-full min-h-[260px] flex-col overflow-hidden rounded-2xl border border-[#E8E8E8] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#652A27]/25"
        >
            <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#652A27] via-[#652A27]/70 to-[#652A27]/20" />

            {/* Logo hidden for now
            {project.image ? (
                <Image
                    src={project.image}
                    alt={project.alt}
                    width={120}
                    height={43}
                    className="h-auto w-auto max-w-[280px] shrink-0 object-contain"
                />
            ) : null}
            */}

            <div className="flex flex-1 flex-col p-6 sm:p-7">
                <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center rounded-full bg-[#652A27]/10 px-3 py-1 font-montserrat text-[10px] font-semibold uppercase tracking-[0.16em] text-[#652A27]">
                        Upcoming
                    </span>
                    <span className="font-montserrat text-[12px] font-medium tabular-nums text-[#C4C4C4]">
                        {String(index + 1).padStart(2, "0")}
                    </span>
                </div>

                <div className="flex flex-1 items-center justify-center px-1 py-8 text-center">
                    <h3 className="font-optima text-[20px] font-medium capitalize leading-[28px] text-[#111111] transition-colors duration-300 group-hover:text-[#652A27] sm:text-[21px] md:text-[22px] md:leading-[30px]">
                        {project.name}
                    </h3>
                </div>

                <div className="mt-auto border-t border-dashed border-[#ECECEC] pt-5 text-center">
                    <p className="font-montserrat text-[13px] font-medium uppercase tracking-[0.12em] text-[#999999] transition-colors duration-300 group-hover:text-[#652A27]/70">
                        Location
                    </p>
                    <p className="mt-2 font-montserrat text-[15px] font-normal leading-[24px] text-[#444444] transition-colors duration-300 group-hover:text-[#652A27]">
                        {project.location}
                    </p>

                    <button
                        type="button"
                        onClick={scrollToNotifySection}
                        className="mt-5 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#652A27] px-5 py-2.5 font-montserrat text-[13px] font-medium text-white transition-all duration-300 hover:bg-[#4A1F1F] hover:shadow-[0_8px_20px_rgba(101,42,39,0.25)]"
                    >
                        Learn More
                        <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">
                            →
                        </span>
                    </button>
                </div>
            </div>
        </article>
    );
};

const UpcomingProject = () => {
    return (
        <section className="w-full bg-white">
            <div className="mx-auto max-w-8xl px-5 py-[35px] sm:px-8 lg:px-[75px] lg:py-[70px]">
                <p className="font-montserrat text-[16px] font-normal capitalize leading-[100%] text-[#333333]">
                    Home | Upcoming Project |{" "}
                    <span className="font-semibold text-[#652A27]">Sector-104 Faridabad</span>
                </p>

                <div className="mx-auto mt-8 max-w-4xl text-center md:mx-0 md:max-w-none md:text-left">
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

                <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
                    {UPCOMING_PROJECTS.map((project, index) =>
                        renderProjectCard(project, index)
                    )}
                </div>

                <p className="mt-10 text-center font-optima text-[20px] font-medium capitalize leading-[30px] text-[#652A27] md:text-left md:text-[22px] md:leading-[34px] lg:text-[24px]">
                    More destinations. More possibilities. A stronger future ahead.
                </p>
            </div>
        </section>
    );
};

export default UpcomingProject;
