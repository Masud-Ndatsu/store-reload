import http from "http";
import app from "./app.js";
import config from "./config/index.js";

const server = http.createServer(app);

server.listen(config.app.PORT, () => {
    console.log(`Listening on PORT: ${config.app.PORT}`);
});
