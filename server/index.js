import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongoDB/connect.js";
import  DalleRoutes  from "./Routes/DalleRoutes.js";
import  postRoutes  from "./Routes/postRoutes.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', DalleRoutes);

app.get("/", async (req, res) => {
  res.send("Hello from AI");
});
const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () =>
      console.log("server has started on http://localhost:8080")
    );
  } catch (error) {
      console.log(error);
  }
};
startServer();
