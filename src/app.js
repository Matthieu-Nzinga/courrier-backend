const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const routes = require("./routes");
const setupSwagger = require("./utils/swagger");
const path = require("path");
require("dotenv").config();

const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:5173";
const app = express();

app.use(helmet());
app.use(cors());

app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan("dev"));

app.use("/uploads", (req, res, next) => {
  res.removeHeader("X-Frame-Options");
  res.setHeader(
    "Content-Security-Policy",
    `frame-ancestors 'self' ${FRONTEND_ORIGIN}`
  );
  res.setHeader("Content-Disposition", "inline");
  next();
});

app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.use("/api", routes);
setupSwagger(app);

app.get("/", (req, res) => res.json({ ok: true, service: "courrier-backend" }));

module.exports = app;
