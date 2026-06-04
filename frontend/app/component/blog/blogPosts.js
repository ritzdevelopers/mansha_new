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
    image: "/blog/testblog.jpg",
    descriptionLead:
      "Formerly a small satellite city close to Delhi, Sonipat has now become among the most coveted NCR real estate locations. The city presents great chances for anyone wanting to purchase residential plots for sale in Sonipat given better infrastructure, industrial expansion, and increasing housing demand. Sonipat offers the ideal mix of affordability,",
   
  },
  {
    id: 3,
    slug: "m3m-sky-city-in-gurgaon",
    date: "Jan 28, 2026",
    title: "m3m-sky-city-in-gurgaon",
    image: "/blog/testblog.jpg",
    
    descriptionLead:
      "M3M Sky City in Gurgaon: The Ultimate Mixed-Use Hub for Luxury Living and Business Growth! M3M Sky City in Gurgaon stands as a landmark mixed-use destination that perfectly blends luxury living, thriving retail, and modern workspaces—offering residents and investors a.",
   
  },
  {
    id: 4,
    slug: "everything-you-need-to-know-mansha-heritage-sonipat",
    date: "Jan 6, 2026",
    title: "Everything You Need to Know About Mansha Heritage Sonipat",
    image: "/blog/blog-image.png",
    descriptionLead:
      "Among the new residential projects in Sonipat, Mansha Heritage Sonipat has gained attention among buyers and investors looking for high value near Delhi NCR.",
  },
];

export const getBlogPostBySlug = (slug) =>
  BLOG_POSTS.find((post) => post.slug === slug);
