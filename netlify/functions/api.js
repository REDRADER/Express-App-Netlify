import serverless from "serverless-http";
import app from "../../index.js"; // Import the Express app from server.js

// Export the serverless function handler
export const handler = serverless(app);
