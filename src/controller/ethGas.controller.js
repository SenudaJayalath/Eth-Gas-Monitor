import database from "../config/mysql.config.js";
import Response from "../domain/response.js";
import logger from "../util/logger.js";
import QUERY from "../query/ethGas.query.js";
import { response_obj_gas, response_obj_average } from "../domain/response.js";

const HttpStatus = {
  OK: { code: 200, status: "OK" },
  BAD_REQUEST: { code: 400, status: "NO_DATA" },
  OUT_OF_BOUND: { code: 401, status: "PARAMETERS_OUT_OF_BOUND" },
  INVALID_PARAMETERS: { code: 400, status: "INVALID_PARAMETERS" },
  NOT_FOUND: { code: 404, status: "NOT_FOUND" },
};

//Store gas prices
export const createEntry = (data) => {
  logger.info(`creating entry`);
  database.query(QUERY.CREATE_ENTRY, data, (error, results) => {
    if (!results) {
      logger.error(error.message);
    }
  });
};

//get current gas price
export const getCurrentPrice = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, fetching gas price`);
  database.query(QUERY.SELECT_CURRENT_PRICE, (error, results) => {
    if (!results[0]) {                                        //If no entries found
      res
        .status(HttpStatus.NOT_FOUND.code)
        .send(new Response(true, HttpStatus.NOT_FOUND.status, null));
    } else {
      let res_data = new response_obj_gas(
        results[0].fast_price,
        results[0].average_price,
        results[0].low_price,
        results[0].block_number
      );
      res
        .status(HttpStatus.OK.code)
        .send(new Response(false, HttpStatus.OK.code, res_data));
    }
  });
};

//Get average gas price
export const getAveragePrice = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, fetching average gas price`);
  if (
    req.query.fromTime <= req.query.toTime &&                //Check if query params are valid
    !isNaN(req.query.fromTime) &&
    !isNaN(req.query.toTime)
  ) {
    if (req.query.fromTime <= Math.floor(Date.now() / 1000)) {
      database.query(
        QUERY.GET_AVERAGE,
        [req.query.fromTime, req.query.toTime],               
        (error, result) => {
          if (result.length != 0) {                           //Check if the data is retrieved
            let average_sum = 0;
            result.forEach((x) => (average_sum += x.mean_price)); //Calculate mean gas price
            let average = average_sum / result.length;
            let res_data = new response_obj_average(
              average,
              parseInt(req.query.fromTime),
              parseInt(req.query.toTime)
            );
            res
              .status(HttpStatus.OK.code)
              .send(new Response(false, HttpStatus.OK.code, res_data));
          } else {                                            // Response passed to data requested which are not stored in DB        
            res
              .status(HttpStatus.OK.code)
              .send(new Response(true, HttpStatus.BAD_REQUEST, null));
          }
        }
      );
    } else {                                                   //Response passed to unix timestamps in the future
      res
        .status(HttpStatus.OK.code)
        .send(new Response(true, HttpStatus.OUT_OF_BOUND, null));
    }
  } else {                                                     //Response passed to invalid query params
    res               
      .status(HttpStatus.OK.code)
      .send(new Response(true, HttpStatus.INVALID_PARAMETERS, null));
  }
};

export default HttpStatus;
