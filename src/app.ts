import express from "express";
import congig from "config";
import connect from "./utils/connect";
const app = express();
const PORT = congig.get<number>("port");

app.listen(PORT, async () => {
  console.log(`Server is listening on port ${PORT}`);
  await connect();
});
