export const metadata = {
    title: "About Us - Mansha",
    description: "Join us as we continue to shape the future of Faridabad’s skyline, creating communities that reflect our commitment to excellence and our passion for building",
  
    keywords: [
      "Mansha Group",
      "Real Estate Developer",
      "Faridabad",
      "Residential Projects",
      "Commercial Properties",
      "Luxury Apartments",
      "Property Developer",
    ],
  
    authors: [{ name: "Mansha Group" }],
  
    robots: {
      index: true,
      follow: true,
    },
  
    alternates: {
      canonical: "https://www.manshagroup.in/about-us-2",
    },
  
    openGraph: {
      title: "Mansha Group Real Estate Developer In Faridabad",
      description: "Want to Work with Trusted Real Estate Developer?",
      url: "https://www.manshagroup.in/",
      siteName: "Mansha Group",
      type: "website",
    },
  };
  
  export default function Layout({ children }) {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    );
  }