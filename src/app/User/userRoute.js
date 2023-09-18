const { imageUploader_profile} = require("../../../config/s3Uploader");
module.exports = function(app){
    const user = require('./userController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 회원가입
    app.post('/app/signup',imageUploader_profile.single("image"),user.postUsers);

    //로그인
    app.get('/app/login',user.login);

};


