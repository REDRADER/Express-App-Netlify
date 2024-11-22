import express, { Router } from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import helmet from "helmet";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import testRoutes from "./routes/test.js"; // Route imports
import { verifyToken } from "./middleware/auth.js"; // Middleware import

let __filename;
let __dirname;


const __filenameTmp = __filename;
const __dirnameTmp = path.dirname(__filename);

  __filename = __filenameTmp;
  __dirname = __dirnameTmp;




// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const router = Router();

// Middleware setup
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Serve static files
app.use("/assets", express.static(path.resolve(__dirname, "../../public/assets")));


// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../../public/assets");
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split(".").pop();
    const filename = file.originalname.split(".")[0];
    cb(null, `${filename}-${Date.now()}.${ext}`);
  },
});
const upload = multer({ storage });



// app.post("/admin/addBooks",verifyAdminToken,upload.array("pictures"),addBooks);
app.post("/addpicture",upload.array("pictures"));


// Define routes

app.use("/", testRoutes);
app.get("/test", (req, res) => {
    res.sendFile(path.join(__dirname, "public/assets/1.png"));
  });
  
// app.use("/api/test", testRoutes);

export default app; // Export the app for use in api.js
