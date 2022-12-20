import express from "express";
import congig from "config";
import connect from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routes";

const app = express();
app.use(express.json());
const PORT = congig.get<number>("port");

app.listen(PORT, async () => {
  logger.info(`Server is listening on port ${PORT}`);
  await connect();
  routes(app);
});
