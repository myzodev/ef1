import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

const connection = await mysql.createConnection({
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
})

const createTables = async () => {
	try {
		await connection.query('CREATE DATABASE IF NOT EXISTS ef1;')

		await connection.query('USE ef1;')

		// Create users table
		await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                avatar VARCHAR(255),
                password VARCHAR(255) NOT NULL,
                is_admin BOOLEAN DEFAULT 0
            );
        `)

		// Create articles table
		await connection.query(`
            CREATE TABLE IF NOT EXISTS articles (
                id INT PRIMARY KEY AUTO_INCREMENT,
                user_id INT NOT NULL,
                title VARCHAR(255) NOT NULL,
                slug VARCHAR(255) NOT NULL,
                text TEXT NOT NULL,
                category VARCHAR(100) NOT NULL,
                image VARCHAR(255),
                FOREIGN KEY (user_id) REFERENCES users(id)
            );
        `)

        // Create comments table
		await connection.query(`
            CREATE TABLE IF NOT EXISTS comments (
                id INT PRIMARY KEY AUTO_INCREMENT,
                user_id INT NOT NULL,
                article_id INT NOT NULL,
                text TEXT NOT NULL,
                FOREIGN KEY (user_id) REFERENCES users(id),
                FOREIGN KEY (article_id) REFERENCES articles(id)
            );
        `)

		console.log('Tables created successfully')
	} catch (error) {
		console.error('Error creating tables:', error)
	} finally {
		connection.end()
	}
}

export default createTables
