import rateLimiter from "express-rate-limit";

const limiter = rateLimiter({
  max: 5,
  windowMs: 10000,
  message: "Too many requests",
});

export default limiter;
