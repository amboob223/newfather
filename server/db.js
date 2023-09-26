const Pool = require("pg").Pool;
const pool = new Pool({
    user: "playabook",
    password: "8896",
    port: 5432,
    host: "localhost",
    database: "pop"
});

module.exports = pool; 
