const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const userDao = require("./userDao");

// Provider: Read 비즈니스 로직 처리
exports.loginCheck = async function (selectUserPasswordParams) {
  const connection = await pool.getConnection(async (conn) => conn);
  const passwordCheckResult = await userDao.loginCheck(
    connection,
    selectUserPasswordParams
  );
  connection.release();

  return passwordCheckResult[0];
};