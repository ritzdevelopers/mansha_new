export const trendingEvents = [
  {
    slug: "bhoomi-pujan",
    image: "/facility/Bhoomi-Pujan.jpg",
    title: "Bhoomi Pujan",
    date: "18 August, 2025",
    description:
      "A sacred beginning for our latest project — Bhoomi Pujan marked the foundation of Mansha Group's commitment to building spaces rooted in trust, tradition, and excellence.",
    images: [
      "/facility/Bhoomi-Pujan.jpg",
      "/facility/event1.JPG",
      "/facility/events.jpg",
      "/facility/evnet-party.jpg",
      "/facility/august.jpg",
    ],
  },
  {
    slug: "property-carnival",
    image: "/facility/Property-Carnival.jpg",
    title: "Property Carnival",
    date: "15 August, 2024",
    description:
      "Property Carnival brought together homebuyers and partners for an engaging showcase of Mansha Group's finest residential offerings, exclusive deals, and on-ground celebrations.",
    images: [
      "/facility/Property-Carnival.jpg",
      "/facility/Community-party.jpg",
      "/facility/events.jpg",
      "/facility/event1.JPG",
      "/facility/august.jpg",
    ],
  },
  {
    slug: "tournament",
    image: "/facility/tournament.jpg",
    title: "Tournament",
    date: "18 August, 2025",
    description:
      "Our community tournament united residents and partners through sport, teamwork, and shared spirit — reflecting the vibrant lifestyle Mansha Group builds beyond four walls.",
    images: [
      "/facility/tournament.jpg",
      "/facility/yoga.jpg",
      "/facility/events.jpg",
      "/facility/evnet-party.jpg",
      "/facility/event1.JPG",
    ],
  },
];

export const getEventBySlug = (slug) =>
  trendingEvents.find((event) => event.slug === slug);
