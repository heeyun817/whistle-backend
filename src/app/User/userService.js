const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const userProvider = require("./userProvider");
const userDao = require("./userDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");

// Service: Create, Update, Delete 비즈니스 로직 처리

exports.createUser = async function (userid,password,name,introduce,imageURL) {
    try {

        // 비밀번호 암호화
        const hashedPassword = await crypto
            .createHash("sha512")
            .update(password)
            .digest("hex");

        const insertUserInfoParams = [userid,hashedPassword,name,introduce,imageURL];

        const connection = await pool.getConnection(async (conn) => conn);

        const userIdResult = await userDao.insertUserInfo(connection, insertUserInfoParams);
        
        connection.release();
        
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - createUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};


// 로그인 인증 방법 (JWT)
exports.login = async function (userid, password) {

    try {
        // 비밀번호 확인
        const hashedPassword = await crypto
        .createHash("sha512")
        .update(password)
        .digest("hex");
        
        const selectUserPasswordParams = [userid, hashedPassword];
        
        const Rows = await userProvider.loginCheck(
            selectUserPasswordParams
        );
        console.log(Rows[0]);
  
        if (!Rows[0] || Rows[0].password !== hashedPassword) {
            return errResponse(baseResponse.SIGNIN_ERROR);
        }
        console.log(Rows[0].id)
        //토큰 생성 Service
        let token = await jwt.sign(
        {
          userId: Rows[0].id,
        }, // 토큰의 내용(payload)
        secret_config.jwtsecret, // 비밀키
        {
          expiresIn: "365d",
          subject: "userInfo",
        } // 유효 기간 365일
      );
  
      return response(baseResponse.SUCCESS, {
        userId: Rows[0].userid,
        jwt: token,
      });
    } catch (err) {
      logger.error(
        `App - postSignIn Service error\n: ${err.message} \n${JSON.stringify(
          err
        )}`
      );
      return errResponse(baseResponse.DB_ERROR);
    }
  };
