// 클래스 생성 -> 간단하게 작성하기 위해 그냥 바로 class id 반환하게 작성
async function createPost(connection,title,score,region,place,place_position,context,date,userid) {
  const Query = `
        INSERT INTO post(title,score,region,place,place_position,context,date,userid)
        VALUES (?, ?, ?, ?,?,?,?,?);
    `;
  await connection.query(Query, [title,score,region,place,place_position,context,date,userid]);
  const id = await connection.query(
    `SELECT id FROM post WHERE title = ? AND userid = ? AND date = ?`,
    [title, userid, date]
  );
  return id;
}

async function createImages(connection, post_id, images) {
  for (i = 0; i < images.length; i++) {
    await connection.query(
      `INSERT INTO post_image(post_id,image_url) VALUES (?, ?)`,
      [post_id, images[i]]
    );
  }
}
async function createCategory(connection, post_id, category) {
  for (i = 0; i < category.length; i++) {
    await connection.query(
      `INSERT INTO post_category(post_id,name) VALUES (?,?)`,
      [post_id, category[i]]
    );
  }
}

module.exports = {
  createPost,createImages,createCategory
}