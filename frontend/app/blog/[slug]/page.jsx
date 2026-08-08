import { redirect } from "next/navigation";

// Blog section temporarily hidden — restore previous page content when re-enabling
const page = () => {
  redirect("/");
};

export default page;
