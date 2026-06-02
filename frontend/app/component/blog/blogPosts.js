export const BLOG_POSTS = [
  {
    id: 3,
    slug: "top-5-locations-to-buy-residential-plots-in-faridabad",
    date: "Jan 6, 2026",
    title: "Top 5 Locations to Buy Residential Plots in Faridabad – Mansha Group Perspective",
    image: "/blog/blog-image.png",
    descriptionLead:
      "As a result of its ever-developing infrastructure and easy accessibility through expressways and the ever-expanding metro, Faridabad is becoming a hotspot for real-estate investments within the NCR region. It holds great potential for investments with a high return on investment. However, the location chosen for investing in a residential plot within Faridabad is an essential factor in determining the appreciation and return on investment.",
  },
  {
    id: 4,
    slug: "mansha-vega-street-smart-commercial-investment-opportunity-faridabad",
    date: "Jan 6, 2026",
    title: "Mansha Vega Street: A Smart Commercial Investment Opportunity in Faridabad",
    image: "/blog/blog-image.png",
    descriptionLead:
      "Faridabad is emerging as one of the most promising real estate destinations in NCR, and smart investors are entering before the next growth wave. Mansha Vega Street offers a future-ready commercial opportunity with strong footfall potential, infrastructure support, and long-term appreciation.",
   
  },
  {
    id: 2,
    slug: "how-to-choose-right-real-estate-developer",
    date: "Jan 6, 2026",
    title: "How to Choose the Right Real Estate Developer? (2026 Investment Guide)",
    image: "/blog/blog-image.png",
    descriptionLead:
      "Buying a home or investing in a plot is one of the most important financial decisions of your life. You work hard, save diligently and when the moment finally comes to put your money into real estate the single biggest factor standing between a great investment and a regrettable one is the developer you choose.",
   
  },
];

export const getBlogPostBySlug = (slug) =>
  BLOG_POSTS.find((post) => post.slug === slug);
