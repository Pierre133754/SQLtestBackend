import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function getComments() {
    const [rows] = await pool.query('select * from comments order by id desc')
    return rows
}

export async function createComment(user, comment) {
    const [result] = await pool.query('insert into comments (user, comment) values (?, ?)', [user, comment])
    return result.insertId
}

