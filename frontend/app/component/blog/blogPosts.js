export const BLOG_POSTS = [
  {
    id: 3,
    slug: "benefits-of-owning-commercial-property-faridabad",
    date: "Jan 6, 2026",
    title: "The Benefits of Owning a Commercial Property in Faridabad (2026 Investment Guide)",
    image: "/aagman/aagman-slider2.jpg",
    descriptionLead: "The real estate game has changed significantly. And the smart investors are not interested in homes. But interested in commercial property",
  },
  {
    id: 1,
    slug: "advantages-of-gated-community-plots-2026",
    date: "Jan 6, 2026",
    title:
      "Advantages of Gated Community Plots: Why Smart Buyers Are Choosing Secured Living in 2026?",
    image: "/aagman/aagman-slider2.jpg",
    description: [
      {
        lead: "Imagine waking up every morning in a home where",
        body: "your children play freely",
      },
      {
        lead: "Demand for gated community living has grown",
        body: "dramatically across India",
      },
      {
        lead: "Gated community plots in Faridabad are the first",
        body: "choice for families and investors",
      },
    ],
  },
  {
    id: 4,
    slug: "everything-you-need-to-know-mansha-heritage-sonipat",
    date: "Jan 6, 2026",
    title: "Everything You Need to Know About Mansha Heritage Sonipat",
    image: "/aagman/aagman-slider2.jpg",
    descriptionLead:
      "In today's market finding the best property in NCR means buying much more than just land; it is about securing a life ready for the future, a property",
    descriptionBody:
      "poised for growth and a location at the core of a rapidly developing future. This is precisely why projects in Sonipat are fast capturing the eye of many homebuyers and investors.",
  },
  {
    id: 2,
    slug: "how-to-choose-right-real-estate-developer",
    date: "Jan 6, 2026",
    title: "How to Choose the Right Real Estate Developer? (2026 Investment Guide)",
    image: "/aagman/aagman-slider2.jpg",
    descriptionLead:
      "Buying a home or investing in a plot is one of the most important financial decisions of your life. You work hard, save diligently",
    descriptionBody:
      "and when the moment finally comes to put your money into real estate the single biggest factor standing between a great investment and a regrettable one is the developer you choose.",
  },
];

export const getBlogPostBySlug = (slug) =>
  BLOG_POSTS.find((post) => post.slug === slug);
