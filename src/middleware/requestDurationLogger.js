import logger from "../utils/logger.js";

const requestDurationLogger = (req, res, next) => {
  const start = new Date();

  next();

  const end = new Date();
  // @ts-ignore
  const ms = end - start;
  logger.info(
    `${req.method} ${req.originalUrl}. Status: ${res.statusCode}. Duration: ${ms} ms`
  );
};

export default requestDurationLogger;
