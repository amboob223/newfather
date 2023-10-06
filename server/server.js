const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const multer = require("multer");
const path = require("path");

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

// Shelf Routes
app.get("/shelf", async (req, res) => {
    try {
        const data = await pool.query("SELECT * FROM shelf;");
        const rowsWithImages = data.rows.map(row => ({
            ...row,
            pic: {
                filename: row.pic, // Include the original filename
                data: row.pic.toString("base64")
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
    if (req.file) {
        const picFilename = req.file.filename;

        // Insert data into the database
        const newData = await pool.query(
            "INSERT INTO shelf(name, birthdate, pic) VALUES ($1, $2, $3) RETURNING *",
            [namee, birthdate, picFilename]
        );

        // Send the response with the inserted data as JSON
        res.json(newData.rows[0]);
    } else {
        // Send a 400 Bad Request response if no file was uploaded
        res.status(400).json({ error: 'No file uploaded' });
    }
});

// Start the server
app.listen(5000, () => {
    console.log("Server started on port 5000");
});
