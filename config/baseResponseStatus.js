module.exports = {

    // Success
    SUCCESS : { "isSuccess": true, "code": 200, "message":"성공" },

    // Common
    TOKEN_EMPTY : { "isSuccess": false, "code": 400, "message":"JWT 토큰을 입력해주세요." },
    TOKEN_VERIFICATION_FAILURE : { "isSuccess": false, "code": 401, "message":"JWT 토큰 검증 실패" },

    //Request error
    SIGNUP_FIELD_EMPTY : { "isSuccess": false, "code": 400, "message":"아이디,비밀번호,이름 입력은 필수입니다." },
    SIGNIN_ERROR : {"isSuccess": false, "code": 400, "message":"로그인 실패"},
    //Connection, Transaction 등의 서버 오류
    DB_ERROR : { "isSuccess": false, "code": 500, "message": "데이터 베이스 에러"},
    SERVER_ERROR : { "isSuccess": false, "code": 500, "message": "서버 에러"},
    
 
}
