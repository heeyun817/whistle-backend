

// 유저 생성
async function insertUserInfo(connection, insertUserInfoParams) {
  const insertUserInfoQuery = `
        INSERT INTO user(userid,password,name,introduce,profile_image)
        VALUES (?, ?, ?, ?, ?);
    `;
  const insertUserInfoRow = await connection.query(
    insertUserInfoQuery,
    insertUserInfoParams
  );

  return insertUserInfoRow;
}
//패스워드 가져오기 + 있는지도 확인하기 위한 고런 메스드!

async function loginCheck(connection, Param) {
  console.log(Param);
  const selectUserPasswordQuery = `
        SELECT id,userid, password
        FROM user 
        WHERE userid = ? AND password = ?;`;
  const selectUserPasswordRow = await connection.query(
    selectUserPasswordQuery,
    Param
  );
  
  return selectUserPasswordRow;
  
}

module.exports = {
  insertUserInfo,loginCheck
};
