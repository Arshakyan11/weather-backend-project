import express from "express";
import dotenv from "dotenv";
import routes from "./src/routes/weatherRoutes.js";
dotenv.config();
const app = express();
app.use(express.json());

app.use(routes);

app.use((err, req, res, next) => {
  console.log(err);
  const status = err.status || 500;
  res
    .status(status)
    .json({ message: err.message || "Something went wrong!!!!" });
});

const runServer = () => {
  const PORT = 8000;
  const HOST = "localhost";
  app.listen(PORT, HOST, () => {
    console.log(`SERVER CONNECTED SUCCESSFULLY http://${HOST}:${PORT}`);
  });
};

runServer();
