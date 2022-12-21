import express from "express";
import congig from "config";
import connect from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routes";
import deserializeUser from "./middleware/deserializeUser";
const app = express();
app.use(express.json());
app.use(deserializeUser);
const PORT = congig.get<number>("port");

app.listen(PORT, async () => {
  logger.info(`Server is listening on port ${PORT}`);
  await connect();
  routes(app);
});
