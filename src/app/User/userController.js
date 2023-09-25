const jwtMiddleware = require("../../../config/jwtMiddleware");
const userProvider = require("../../app/User/userProvider");
const userService = require("../../app/User/userService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");


exports.postUsers = async function (req, res) {

    const {userid,password,name,introduce} = req.body;

    // 빈 값 체크(id,password,name만 필수 사항)
    if (!userid || !password || !name)
        return res.send(response(baseResponse.SIGNUP_FIELD_EMPTY));

    // 프로필 이미지
    var imageURL;
    if (req.file) {
        imageURL = req.file.location;
    } else {
        imageURL = null;
    }

    // id 중복 확인


    const signUpResponse = await userService.createUser(
        userid,password,name,introduce,imageURL
    );

    return res.send(signUpResponse);
};

exports.login = async function (req, res) {
  const { userid, password } = req.body;

  const signInResponse = await userService.login(userid, password);

  return res.send(signInResponse);
};

exports.getAllUser = async function (req,res){
    const id=req.params.id;
    console.log(id);
    const result = await userProvider.getAllUser(id);

    return res.send(result);

}
