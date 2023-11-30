import * as Sentry from "@sentry/node";
import { ProfilingIntegration } from "@sentry/profiling-node";
import express from "express";
import errorHandler from "./middleware/errorhandler.js";
import requestDurationLogger from "./middleware/requestDurationLogger.js";
import loginRouter from "./routes/login.js";
import usersRouter from "./routes/users.js";
import hostsRouter from "./routes/hosts.js";
import amenitiesRouter from "./routes/amenities.js";
import propertiesRouter from "./routes/properties.js";
import reviewsRouter from "./routes/reviews.js";
import bookingsRouter from "./routes/bookings.js";

const app = express();

app.use(express.json());

Sentry.init({
  dsn: "https://12edf1e6a12b6c73137284d32979ecb4@o4506173880008704.ingest.sentry.io/4506312134819840",
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
    new ProfilingIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0,
  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(requestDurationLogger);

app.use("/login", loginRouter);
app.use("/users", usersRouter);
app.use("/hosts", hostsRouter);
app.use("/amenities", amenitiesRouter);
app.use("/properties", propertiesRouter);
app.use("/reviews", reviewsRouter);
app.use("/bookings", bookingsRouter);

app.use(Sentry.Handlers.errorHandler());
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
