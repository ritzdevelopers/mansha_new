import { notFound } from "next/navigation";
import { Suspense } from "react";
import EventDetail from "../../component/event/EventDetail";
import Footer from "../../component/Home/Footer";
import { getLocationBySlug } from "../../component/event/eventData";

const page = async ({ params }) => {
  const { slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) notFound();

  return (
    <>
      <Suspense fallback={null}>
        <EventDetail location={location} />
      </Suspense>
      <Footer />
    </>
  );
};

export default page;
