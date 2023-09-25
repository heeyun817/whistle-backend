
const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const postDao = require("./postDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");
exports.createPost = async function (
  title,score,region,place,place_position,context,category,images,date,userid
) {
  try{
    const connection = await pool.getConnection(async (conn) => conn);
    var postId= await postDao.createPost(connection,title,score,region,place,place_position,context,date,userid); // class 추가하고, 이미지 추가를 위해 class 고유 id를 받아옴.
    postId = postId[0][0].id;
    await postDao.createImages(connection,postId,images);
    await postDao.createCategory(connection,postId,category);
    connection.release();
    return response(baseResponse.SUCCESS);
  }catch(err){
    logger.error(`App - createPost Service error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
}