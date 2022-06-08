import connection from "../../util/mysql.js"
import { CustomError } from "../../util/error.js"

export default async (req, res, next) => {
  const text = req.query.text
  const city = req.query.city

  try {
    if (!text) throw new CustomError(400, "Empty text field")
    if (!city) throw new CustomError(400, "No city Provided")
    const [rows] = await connection.query("SELECT userId, CONCAT(firstName, ' ', lastName) as 'fullName', picture, profession, phone, city, line, email,  avg(rating) as rating FROM user LEFT JOIN review ON user.userId = review.workerId WHERE CONCAT(firstName, ' ', lastName) LIKE ? AND role = 'worker' AND city = ?", ["%" + text + "%", city])
    const results = rows
    if (!results[0].userId) throw new CustomError(404, "NO Workers Found")
    res.status(200).json({ message: "workers found.", results })
  } catch (err) {
    next(err)
  }
}
