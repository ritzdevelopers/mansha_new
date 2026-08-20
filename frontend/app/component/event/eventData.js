export const trendingLocations = [
  {
    slug: "sonipat",
    title: "Sonipat",
    subtitle: "Celebrations & community moments",
    events: [
      {
        slug: "property-carnival",
        title: "Property Carnival",
        cardLabel: "Property Carnival",
        tag: "Showcase Event",
        description:
          "An engaging on-ground celebration bringing homebuyers and partners together to explore Mansha Group's finest residential offerings, exclusive deals, and vibrant community experiences.",
        highlights: [
          "Exclusive property showcases",
          "On-site consultations & deals",
          "Live celebrations with partners",
        ],
        images: [
          "/event/property-carnival-sonipat/1.png",
          "/event/property-carnival-sonipat/2.png",
          "/event/property-carnival-sonipat/3.png",
          "/event/property-carnival-sonipat/4.png",
          "/event/property-carnival-sonipat/5.png",
        ],
      },
      {
        slug: "21-june-yoga-day",
        title: "21 June Yoga Day",
        cardLabel: "Yoga Day",
        tag: "Wellness Event",
        description:
          "A refreshing International Yoga Day celebration focused on wellness, mindfulness, and community bonding — reflecting Mansha Group's commitment to holistic living beyond four walls.",
        highlights: [
          "Community yoga sessions",
          "Wellness & mindfulness activities",
          "Residents & partners united",
        ],
        images: [
          "/event/yoga-day-sonipat/1.png",
          "/event/yoga-day-sonipat/2.png",
          "/event/yoga-day-sonipat/3.png",
          "/event/yoga-day-sonipat/4.png",
          "/event/yoga-day-sonipat/5.png",
        ],
      },
      {
        slug: "independence-day",
        title: "Independence Day",
        cardLabel: "Independence Day",
        tag: "National Celebration",
        description:
          "A proud Independence Day celebration at Mansha Group, Sonipat — honouring the spirit of the nation with flag hoisting, tree plantation, and gatherings of partners, dignitaries, and the Mansha family united in tricolour pride.",
        highlights: [
          "Flag hoisting & ceremonial celebrations",
          "Tree plantation with dignitaries",
          "Team, partners & community together",
        ],
        images: [
          "/event/independence-day-sonipat/1.png",
          "/event/independence-day-sonipat/2.png",
          "/event/independence-day-sonipat/3.png",
          "/event/independence-day-sonipat/4.png",
          "/event/independence-day-sonipat/5.png",
          "/event/independence-day-sonipat/6.png",
          "/event/independence-day-sonipat/7.png",
          "/event/independence-day-sonipat/8.png",
          "/event/independence-day-sonipat/9.png",
          "/event/independence-day-sonipat/10.png",
          "/event/independence-day-sonipat/11.png",
          "/event/independence-day-sonipat/12.png",
          "/event/independence-day-sonipat/13.png",
          "/event/independence-day-sonipat/14.png",
        ],
      },
    ],
  },
  {
    slug: "faridabad",
    title: "Faridabad",
    subtitle: "Tradition, trust & togetherness",
    events: [
      {
        slug: "bhoomi-pujan",
        title: "Bhoomi Pujan",
        cardLabel: "Bhoomi Pujan",
        tag: "Foundation Ceremony",
        description:
          "A sacred beginning marking the foundation of our latest project — rooted in trust, tradition, and Mansha Group's enduring commitment to building spaces of excellence.",
        highlights: [
          "Traditional foundation ceremony",
          "Leadership & partner presence",
          "A new chapter begins",
        ],
        images: [
          "/event/bhoomi-pujan-faridabad/1.png",
          "/event/bhoomi-pujan-faridabad/2.png",
          "/event/bhoomi-pujan-faridabad/3.png",
          "/event/bhoomi-pujan-faridabad/4.png",
          "/event/bhoomi-pujan-faridabad/5.png",
        ],
      },
      {
        slug: "new-year-at-vivanta",
        title: "26/12/2025 (New Year at Vivanta)",
        cardLabel: "New Year",
        tag: "New Year Celebration",
        description:
          "An elegant year-end gathering at Vivanta — bringing together partners, residents, and the Mansha family to celebrate achievements, relationships, and the promise of a new year ahead.",
        highlights: [
          "Premium venue celebration",
          "Partners & community together",
          "Welcoming the new year in style",
        ],
        images: [
          "/event/new-year-faridabad/1.png",
          "/event/new-year-faridabad/2.png",
          "/event/new-year-faridabad/3.png",
          "/event/new-year-faridabad/4.png",
          "/event/new-year-faridabad/5.png",
        ],
      },
    ],
  },
];

export const getLocationBySlug = (slug) =>
  trendingLocations.find((location) => location.slug === slug);
