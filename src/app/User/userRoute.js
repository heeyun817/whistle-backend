const { imageUploader_profile} = require("../../../config/s3Uploader");
module.exports = function(app){
    const user = require('./userController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 회원가입
    app.post('/app/signup',imageUploader_profile.single("image"),user.postUsers);

    //로그인
    app.post('/app/login',user.login);

    //app.get("/app/getUser/:id",user.getAllUser);

    //app.post("/app/:userid/board")
};


