require("dotenv").config();
import express = require("express");
import path = require("path");
import cookieParser = require("cookie-parser");
import logger = require("morgan");
import { PORT, __prod__ } from "./constants";

import cors = require("cors");

import redis from "redis";
import session from "express-session";
import redisSession from "connect-redis";

let RedisStore = redisSession(session);
let redisClient = redis.createClient();

//ROUTES
import userRouter from "./routes/users";
import productRouter from "./routes/products";

var app = express();

app.listen(PORT, () => {
  console.log("Server listening on http://localhost:" + PORT);
});

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

//SESSION
app.use(
  session({
    name: "qid",
    store: new RedisStore({ client: redisClient, disableTouch: true }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
      sameSite: "lax",
      httpOnly: true,
      secure: __prod__,
    },
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    resave: false,
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static("uploads"));

app.get("/", (_, res) => {
  res.send(`<h2>User api</h2>`);
});

//user route
app.use("/api/v1/", userRouter);

//products route
app.use("/api/v1", productRouter);
export default app;
