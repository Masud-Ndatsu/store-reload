import rateLimiter from "express-rate-limit";

const limiter = rateLimiter({
     windowMs: 1 * 60 * 1000, // 1 minutes
     max: 15,
     message: "Too many requests from this IP, please try again later.",
});

export default limiter;
