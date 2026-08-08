import dns from "dns";
import mongoose from "mongoose";
import seedSuperAdmin from "../SuperAdmin.js";

// Windows/ISP DNS often refuses SRV lookups used by mongodb+srv:// URIs
dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);

const MAX_RETRIES = 8;
const RETRY_DELAY_MS = 3000;

let connecting = false;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const connectDb = async (attempt = 1) => {
  if (connecting) return;
  connecting = true;

  try {
    if (mongoose.connection.readyState === 1) {
      return;
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected Successfully");
    await seedSuperAdmin();
  } catch (error) {
    console.error(
      `MongoDB connection failed (attempt ${attempt}/${MAX_RETRIES}):`,
      error.message
    );

    if (attempt < MAX_RETRIES) {
      connecting = false;
      await sleep(RETRY_DELAY_MS * attempt);
      return connectDb(attempt + 1);
    }

    console.error(
      "MongoDB unavailable after retries. API will keep running; DB routes will fail until reconnect."
    );
  } finally {
    connecting = false;
  }
};

mongoose.connection.on("disconnected", () => {
  console.error("MongoDB disconnected. Attempting reconnect...");
  connectDb().catch((error) => {
    console.error("MongoDB reconnect failed:", error.message);
  });
});

export default connectDb;
