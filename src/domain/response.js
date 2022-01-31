export class response_obj_gas {                            //Data template for requesting current price
  constructor(fast, average, low, block_number) {
    this.fast = fast;
    this.average = average;
    this.low = low;
    this.blockNum = block_number;
  }
}

export class response_obj_average {                         //Data template for requesting average price
  constructor(averageGasPrice, fromTime, toTime) {
    this.averageGasPrice = averageGasPrice;
    this.fromTime = fromTime;
    this.toTime = toTime;
  }
}

class Response {                                              //Response template
  constructor(error, message, data) {
    this.error = error;
    this.message = error ? message : data;
  }
}

export default Response;
