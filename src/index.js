import express from "express";
import ip from "ip";
import dotenv from "dotenv";
import cors from "cors";
import Response from "./domain/response.js";
import HttpStatus from "./controller/ethGas.controller.js";
import gasRoutes from "./route/ethGas.route.js";
import logger from "./util/logger.js";

import {GetGasPrice} from "./services/api-req.js"
import {createEntry} from "./controller/ethGas.controller.js"

dotenv.config();

const PORT = process.env.SERVER_PORT || 3000;
const app = express();
const appKey = process.env.APP_KEY

app.use(cors({ origin: "*" }));
app.use(express.json());

 setInterval(function () {
  GetGasPrice("gastracker", "gasoracle", appKey).then((response) => {
   let fastPrice= parseInt(response.result.FastGasPrice)
   let avgPrice= parseInt(response.result.ProposeGasPrice)
   let lowPrice =parseInt(response.result.SafeGasPrice)
   let meanPrice = parseFloat((fastPrice+avgPrice+lowPrice)/3)
   let blockNumber =parseInt(response.result.LastBlock)
   console.log(response)
   createEntry([fastPrice,avgPrice,lowPrice,meanPrice,blockNumber,Math.floor(Date.now()/1000)])
  });
 }, 5000);                                                             // Call API req once in 5 secs

app.use("/", gasRoutes);
app.get("/", (req, res) =>
  res.send(new Response(200, "OK", "Eth Gas Monitor v1.0.0 - All Good to Go!!"))
);
app.all("*", (req, res) =>
  res
    .status(HttpStatus.NOT_FOUND.code)
    .send(
      new Response(
        HttpStatus.NOT_FOUND.code,
        HttpStatus.NOT_FOUND.status,
        "Route does not exist on the server"
      )
    )
);

app.listen(PORT, () =>
  logger.info(`Server running on: ${ip.address()}:${PORT}`)
);
