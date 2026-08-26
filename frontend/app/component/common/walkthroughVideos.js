/**
 * One walkthrough video per project page.
 * Paste the YouTube link in the `url` field. Supported formats:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://www.youtube.com/shorts/VIDEO_ID
 * - VIDEO_ID (11 characters)
 */
export const PROJECT_WALKTHROUGH_VIDEOS = {
  "mansha-heritage": {
    title: "Mansha Heritage Walkthrough",
    url: "",
  },
  "mansha-orchid": {
    title: "Mansha Orchid Walkthrough",
    url: "",
  },
  "mansha-oasis": {
    title: "Mansha Oasis Walkthrough",
    url: "",
  },
  "aagman-by-mansha": {
    title: "Aagman by Mansha Walkthrough",
    url: "",
  },
  "vega-street": {
    title: "Vega Street Walkthrough",
    url: "",
  },
};

export const getYouTubeId = (url = "") => {
  const value = String(url).trim();
  if (!value) return null;

  if (/^[a-zA-Z0-9_-]{11}$/.test(value)) return value;

  const match = value.match(
    /(?:youtube\.com\/(?:watch\?.*v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match?.[1] || null;
};
