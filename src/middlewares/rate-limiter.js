import rateLimiter from "express-rate-limit";

const limiter = rateLimiter({
  max: 10,
  windowMs: 60 * 1000,
  message: "Too many requests",
});

export default limiter;
