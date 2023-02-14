import express from "express";

import { decode as hillcipherDecoder } from "../controllers/decodeHillCipher.js";
import { decode as caesarcipherDecoder } from "../controllers/decodeCaesarCipher.js";
import { decode as railcipherDecoder } from "../controllers/decodeRailCipher.js";
const router = express.Router();

router.get("/hillcipher", hillcipherDecoder);

router.get("/caesarcipher", caesarcipherDecoder);

router.get("/railcipher", railcipherDecoder);

export { router };
