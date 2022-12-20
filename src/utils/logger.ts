import logger from "pino";
import dayjs from "dayjs";
import pretty from "pino-pretty";

const stream = pretty({
  colorize: true,
});

const log = logger({
  level: "info",
  stream,
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default log;
