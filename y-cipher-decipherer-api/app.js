import express from "express";
import { rateLimit } from "express-rate-limit";
import bodyParser from "body-parser";

import { router as decodeRoutes } from "./routes/decode.js";

const app = express();

const limiter = rateLimit({
	windowMs: 60000,
	max: 30,
	handler: (req, res, next) => {
		res.status(429).send("Too many requests, please wait 1 minute");
	},
});

app.use(bodyParser.json());
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
	next();
});
app.use(limiter);

app.use("/decode", decodeRoutes);

app.listen(8000);
