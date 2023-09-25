const { imageUploader_post} = require("../../../config/s3Uploader");
const jwtMiddleware = require('../../../config/jwtMiddleware');
module.exports = function(app){
    const post = require('./postController');

    // 게시글 올리기
    app.post('/app/post',jwtMiddleware,imageUploader_post.array("images",10),post.createPost);


};