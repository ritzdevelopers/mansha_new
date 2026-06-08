export const metadata = {
    title: "Real Estate Blogs & Insights | Mansha Group",
  
    description:
      "Read the latest real estate blogs, property investment tips, market trends, home buying guides, and industry insights from Mansha Group.",
  
    keywords: [
      "Real Estate Blog",
      "Property Investment Tips",
      "Real Estate News",
      "Property Market Trends",
      "Home Buying Guide",
      "Mansha Group Blog",
      "Real Estate Insights",
      "Property Developer Blog",
      "Faridabad Real Estate",
      "Real Estate Articles",
    ],
  
    authors: [
      {
        name: "Mansha Group",
      },
    ],
  
    publisher: "Mansha Group",
  
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
  
    alternates: {
      canonical: "https://www.manshagroup.in/blog/",
    },
  
    openGraph: {
      title: "Real Estate Blogs & Insights | Mansha Group",
      description:
        "Read the latest real estate blogs, property investment tips, market trends, home buying guides, and industry insights from Mansha Group.",
      url: "https://www.manshagroup.in/blog/",
      siteName: "Mansha Group",
      type: "website",
    },
  
    twitter: {
      card: "summary_large_image",
      title: "Real Estate Blogs & Insights | Mansha Group",
      description:
        "Read the latest real estate blogs, property investment tips, market trends, home buying guides, and industry insights from Mansha Group.",
    },
  };
  
  export default function BlogLayout({ children }) {
    return <>{children}</>;
  }