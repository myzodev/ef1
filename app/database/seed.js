import createTables from './seeders/tables-create.js'
import seedArticles from './seeders/article-seed.js'

createTables() // Create necessary tables
seedArticles() // Seed articles table if it's empty
