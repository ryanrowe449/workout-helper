import "dotenv/config";
import express from "express";
import cors from "cors";
import analyzeRoute from "./routes/analyze";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/analyze", analyzeRoute);

app.listen(3000, () =>
  console.log("Backend running on http://localhost:3000")
);