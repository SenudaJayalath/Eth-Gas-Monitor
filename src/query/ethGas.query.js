const QUERY = {
    CREATE_ENTRY: `INSERT INTO gasprice(fast_price, average_price, low_price, mean_price,block_number,time_stamp) VALUES (?, ?, ?, ?,?,?)`,
    SELECT_CURRENT_PRICE: `SELECT fast_price, average_price, low_price, block_number FROM gasprice ORDER BY id DESC LIMIT 1`,
    GET_AVERAGE: `SELECT mean_price FROM gasprice WHERE (time_stamp >= ? and time_stamp <= ?)`
  };
  
  export default QUERY;