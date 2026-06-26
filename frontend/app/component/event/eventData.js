export const trendingEvents = [
  {
    slug: "bhoomi-pujan",
    image: "/facility/Bhoomi-Pujan.jpg",
    title: "Bhoomi Pujan",
    // date: "18 August, 2025",
    // description:
    //   "A sacred beginning for our latest project — Bhoomi Pujan marked the foundation of Mansha Group's commitment to building spaces rooted in trust, tradition, and excellence.",
    images: [
      "/event/Bhoomi-Pujan1.jpg",
      "/event/Bhoomi-Pujan2.jpg",
      "/event/Bhoomi-Pujan3.jpg",
      "/event/Bhoomi-Pujan4.jpg",
      "/event/Bhoomi-Pujan5.jpg",
    ],
  },
  {
    slug: "property-carnival",
    image: "/facility/Property-Carnival.jpg",
    title: "Property Carnival",
    date: "15 August, 2024",
    // description:
    //   "Property Carnival brought together homebuyers and partners for an engaging showcase of Mansha Group's finest residential offerings, exclusive deals, and on-ground celebrations.",
    images: [
      "/event/Property-carnival1.jpg",
      "/event/Property-carnival2.jpg",
      "/event/Property-carnival3.jpg",
      "/event/Property-carnival4.jpg",
      "/event/Property-carnival5.jpg",
    ],
  },
  {
    slug: "tournament",
    image: "/facility/tournament.jpg",
    title: "Tournament",
    // date: "18 August, 2025",
    // description:
    //   "Our community tournament united residents and partners through sport, teamwork, and shared spirit — reflecting the vibrant lifestyle Mansha Group builds beyond four walls.",
    images: [
      "/event/tournament1.jpg",
      "/event/tournament2.jpg",
      "/event/tournament3.jpg",
      "/event/tournament4.jpg",
      "/event/tournament5.jpg",
    ],
  },
];

export const getEventBySlug = (slug) =>
  trendingEvents.find((event) => event.slug === slug);
