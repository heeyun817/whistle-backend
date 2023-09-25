const jwtMiddleware = require("../../../config/jwtMiddleware");
const postService = require("../../app/Post/postService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");
const moment = require("moment");
const regexEmail = require("regex-email");
const {emit} = require("nodemon");

exports.createPost = async function (req, res){
  const {
    title,score,region,place,place_position,context,category
  } = await req.body;

  console.log(req.files[0].location)
  //이미지 파일 경로 -> 변수에 담음
  var images=[];
  for(i=0;i<req.files.length;i++){
    images[i]=req.files[i].location
  }

  // 사용자 user_id 로 id 가져오기 -> 변수에 저장
  const userid=req.verifiedToken.userId
  
  // 필수 정보가 누락된 경우
  if(!title || !score || !region || !place || !place_position || !context || !category){
    //await deleteImages(req.files);
    return res.send("필수정보 누락"); 
  }

  // 현재 날짜와 시간을 DATETIME 형식의 문자열로 생성 -> 변수에 담음
  const date = await moment().format('YYYY-MM-DD HH:mm:ss');
  
  const response = await postService.createPost(
    title,score,region,place,place_position,context,category,images,date,userid
  );

  return res.send(response);
};