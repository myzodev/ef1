import mysql from 'mysql2/promise';
import dotenv from 'dotenv'

dotenv.config()

const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
});

const seedDatabase = async () => {
    try {
        await connection.query('CREATE DATABASE IF NOT EXISTS ef1;')
        
        await connection.query('USE ef1;')
        
        await connection.query(`
            CREATE TABLE IF NOT EXISTS articles (
                id INT PRIMARY KEY AUTO_INCREMENT,
                title VARCHAR(255) NOT NULL,
                slug VARCHAR(255) NOT NULL,
                text TEXT NOT NULL,
                category VARCHAR(100) NOT NULL,
                image VARCHAR(255)
            );
        `)
        
        console.log('Database seeded successfully')
    } catch (error) {
        console.error('Error seeding database:', error)
    } finally {
        connection.end()
    }
}

export default seedDatabase
