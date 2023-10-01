const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const multer = require("multer");
const path = require("path");

// middleware 
app.use(cors());
app.use(express.json());
app.set("view engine", "ejs"); //when we using multer middleware we hot to use express rto set the view engine to ejs embedded javascript 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./images")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({
    storage: storage
});

app.get("/health", async (req, res) => {
    try {
        const data = await pool.query(
            "SELECT * FROM health;"
        );
        res.json(data.rows)
    } catch (error) {
        console.log(error)
    }

})

app.post("/health", async (req, res) => {
    const { doctorName, doctorNum, appointments, feedtimes, diaperCount } = req.body;
    const newData = await pool.query(
        "INSERT INTO health(doctorName, doctorNum, appointments, feedtimes, diaperCount) VALUES($1, $2, $3, $4, $5) RETURNING *",
        [doctorName, doctorNum, appointments, feedtimes, diaperCount]
    );
    res.json(newData.rows[0]);
});

app.post("/wealth", async (req, res) => {
    const { cryptoName, cryptoPrice, stockName, stockPrice } = req.body;
    const newData = await pool.query(
        "INSERT INTO wealth(cryptoName, cryptoPrice, stockName, stockPrice) VALUES($1,$2,$3,$4) RETURNING *",
        [cryptoName, cryptoPrice, stockName, stockPrice]
    );

    res.json(newData.rows[0]);
});

app.post("/shelf", upload.single("pics"), async (req, res) => {
    const { namee, birthdate } = req.body;

    // Check if req.file exists before accessing its properties
    if (req.file) {
        const picFilename = req.file.filename; // dont forget to do the filename here 
        const newData = await pool.query(
            "INSERT INTO shelf(name, birthdate, pic) VALUES ($1, $2, $3) RETURNING *",
            [namee, birthdate, picFilename]
        );
        res.json(newData.rows[0]);
    } else {
        res.status(400).json({ error: 'No file uploaded' });
    }
});

app.listen("5000", () => {
    console.log("Server started on port 5000");
});
