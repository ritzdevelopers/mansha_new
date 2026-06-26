import { notFound } from "next/navigation";
import EventDetail from "../../component/event/EventDetail";
import Footer from "../../component/Home/Footer";
import { getEventBySlug } from "../../component/event/eventData";

const page = async ({ params }) => {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) notFound();

  return (
    <>
      <EventDetail event={event} />
      <Footer />
    </>
  );
};

export default page;
