export const BLOG_POSTS = [
  {
    id: 2,
    slug: "affordable-residential-plots-in-sonipat-near-delhi",
    date: "Mar 24, 2026 ",
    title: "Affordable Residential Plots in Sonipat Near Delhi",
    image: "/blog/testblog.jpg",
    descriptionLead:
      "Investing in Residential Land in Sonipat – A Good Decision | Mansha Group Sonipat is repeatedly gaining popularity as a destination for investment in land near Delhi NCR, mainly due to the speed of development in infrastructure, increasing level of connectivity, and",
  },
  {
    id: 2,
    slug: "buy-residential-plots-for-sale-in-sonipat",
    date: "Mar 24, 2026 ",
    title: "Buy Residential Plots for Sale in Sonipat",
    image: "/blog/Buy-Residential.jpg",
    descriptionLead:
      "Formerly a small satellite city close to Delhi, Sonipat has now become among the most coveted NCR real estate locations. The city presents great chances for anyone wanting to purchase residential plots for sale in Sonipat given better infrastructure, industrial expansion, and increasing housing demand. Sonipat offers the ideal mix of affordability,",
   
  },
  {
    id: 3,
    slug: "m3m-sky-city-in-gurgaon",
    date: "Jan 28, 2026",
    title: "m3m-sky-city-in-gurgaon",
    image: "/blog/m3m-sky-city.png",
    
    descriptionLead:
      "M3M Sky City in Gurgaon: The Ultimate Mixed-Use Hub for Luxury Living and Business Growth! M3M Sky City in Gurgaon stands as a landmark mixed-use destination that perfectly blends luxury living, thriving retail, and modern workspaces—offering residents and investors a.",
   
  },
  {
    id: 4,
    slug: "real-estate-developer-in-ncr",
    date: "Jan 28, 2026",
    title: "Real Estate Developer in NCR",
    image: "/blog/real-estate.png",
    descriptionLead:
      "Real Estate Developer in NCR - Mansha Group We at Mansha Group view Real Estate Development as much more than just the construction of an empty project; we consider the development process to encapsulate the totality of building a safe, well-planned, and designed.",
  },


  {
    id: 5,
    slug: "builder-floors-in-sonipat",
    date: "Oct 6, 2025",
    title: "Builder Floors in Sonipat",
    image: "/blog/sonipat.jpg",
    descriptionLead:
      "Builder Floors in Sonipat: Independent Living, Modern Comfort, Strong Value What Are Builder Floors?Rather than high-rise towers, builder floors are individual housing apartments—usually whole floors within a multi-story residential structure. Often in smaller",
  },

  {
    id: 6,
    slug: "eldeco-mystic-greens",
    date: "Oct 6, 2025 ",
    title: "eldeco mystic greens",
    image: "/blog/eldeco.jpg",
    descriptionLead:
      "Eldeco Mystic Greens – A Lifestyle of Serenity and Comfort in Greater Noida Eldeco Mystic Greens is a premium residential project developed by the Eldeco Group, one of India’s most trusted names in real estate. Located in the heart of Greater Noida, this development...",
  },
];

export const getBlogPostBySlug = (slug) =>
  BLOG_POSTS.find((post) => post.slug === slug);
