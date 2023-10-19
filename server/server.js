const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const multer = require("multer");
const path = require("path");
const bcrypt = require('bcrypt');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('server/images'));

app.set("view engine", "ejs");

// Define multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Create a multer instance with the defined storage configuration
const upload = multer({
    storage: storage
});

app.post("/signup", async (req, res) => {
    try {
        const { email, password } = req.body

        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        //construct a query

        const query = "INSERT INTO pass(email,password) VALUES ($1,$2) RETURNING * ";
        const values = [email, hashedPassword];

        const result = await pool.query(query, values)
        res.json(result.rows[0])
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "internal service error" })
    }
})

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        const query = "SELECT password FROM pass WHERE email = $1"
        const values = [email]

        const result = await pool.query(query, values);

        if (result.rows.length === 1) {
            const hashedPassword = result.rows[0].password;
            const passwordMatch = await bcrypt.compare(password, hashedPassword)

            if (passwordMatch) {
                res.status(200).json({ message: "login succesful" })
            } else {
                res.status(401).json({ error: "invalid" })
            }

        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "internal service error" })
    }
})


// Health Routes
app.get("/health", async (req, res) => {
    try {
        const data = await pool.query("SELECT * FROM health;");
        res.json(data.rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/health", async (req, res) => {
    const { doctorName, doctorNum, appointments, feedtimes, diaperCount } = req.body;
    const newData = await pool.query(
        "INSERT INTO health(doctorName, doctorNum, appointments, feedtimes, diaperCount) VALUES($1, $2, $3, $4, $5) RETURNING *",
        [doctorName, doctorNum, appointments, feedtimes, diaperCount]
    );
    res.json(newData.rows[0]);
});

// Wealth Routes
app.post("/wealth", async (req, res) => {
    const { cryptoName, cryptoPrice, stockName, stockPrice } = req.body;
    const newData = await pool.query(
        "INSERT INTO wealth(cryptoName, cryptoPrice, stockName, stockPrice) VALUES($1,$2,$3,$4) RETURNING *",
        [cryptoName, cryptoPrice, stockName, stockPrice]
    );

    res.json(newData.rows[0]);
});

app.get("/wealth", async (req, res) => {

    try {
        const data = await pool.query(
            "SELECT * FROM wealth;"
        );
        res.json(data.rows)
    } catch (error) {
        console.log(error)
    }
});

app.get("/health", async (req, res) => {
    try {
        const data = await pool.query("SELECT * FROM health;");
        res.json(data.rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Shelf Routes
app.get("/shelf", async (req, res) => {
    try {
        const data = await pool.query("SELECT * FROM shelf;");
        const rowsWithImages = data.rows.map(row => ({
            ...row,
            pic: {
                filename: row.pic, // Include the original filename

            }
        }));
        res.json(rowsWithImages);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.post("/shelf", upload.single("pics"), async (req, res) => {
    const { namee, birthdate } = req.body;

    // Check if req.file exists before accessing its properties
    if (req.file.filename) {
        const picFilename = req.file.filename; // no brakceys
        console.log(picFilename)
        // Insert data into the database
        const newData = await pool.query(
            "INSERT INTO shelf(name, birthdate, pic) VALUES ($1, $2, $3) RETURNING *",
            [namee, birthdate, picFilename]
        );

        // Send the response with the inserted data as JSON
        res.json(newData.rows[0]);
        console.log(newData.rows)
    } else {
        // Send a 400 Bad Request response if no file was uploaded
        res.status(400).json({ error: 'No file uploaded' });
        console(res.status(400))
    }
});

// Start the server
app.listen(5000, () => {
    console.log("Server started on port 5000");
});
