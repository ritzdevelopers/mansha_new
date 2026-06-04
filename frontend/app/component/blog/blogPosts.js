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
    slug: "mansha-vega-street-smart-commercial-investment-opportunity-faridabad",
    date: "Mar 24, 2026 ",
    title: "Buy Residential Plots for Sale in Sonipat",
    image: "/blog/testblog.jpg",
    descriptionLead:
      "Formerly a small satellite city close to Delhi, Sonipat has now become among the most coveted NCR real estate locations. The city presents great chances for anyone wanting to purchase residential plots for sale in Sonipat given better infrastructure, industrial expansion, and increasing housing demand. Sonipat offers the ideal mix of affordability,",
   
  },
  {
    id: 3,
    slug: "how-to-choose-right-real-estate-developer",
    date: "Jan 6, 2026",
    title: "How to Choose the Right Real Estate Developer? (2026 Investment Guide)",
    image: "/blog/blog-image.png",
    descriptionLead:
      "Buying a home or investing in a plot is one of the most important financial decisions of your life. You work hard, save diligently and when the moment finally comes to put your money into real estate the single biggest factor standing between a great investment and a regrettable one is the developer you choose.",
   
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
