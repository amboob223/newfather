const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const multer = require("multer");
const path = require("path");


// middleware 
app.use(cors);
app.use(express.json());
app.set("view engine", "ejs");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "/images")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });


app.post("/health", async (req, res) => {
    const { doctorName, doctorNum, appointments, feedtimes, diaperCount } = req.body;
    const newData = await pool.query(
        "INSERT INTO health(id,doctorName, doctorNum,appointments,feedtimes,diaperCount) VALUES($1,$2,$3,$4,$5,$5) RETURNING *",
        [doctorName, doctorNum, appointments, feedtimes, diaperCount]
    );
    res.json(newData.rows[0]);

})

app.post("/wealth", async (req, res) => {
    const { cryptoName, cryptoPrice, stockName, stockPrice } = req.body
    const newData = await pool.query(
        "INSERT INTO wealth(cryptoName,cryptoPrice,stockName,stockPrice) RETUNING *",
        [cryptoName, cryptoPrice, stockName, stockPrice]
    )
    res.json(newData.rows[0])
});

app.post("/shelf", upload.single("image"), async (req, res) => {
    const { namee, birthdate } = req.body
    const { pic } = req.file
    const newData = await pool.query(
        "INSERT INTO shelf(name,birthdate,pic) VALUES ($1,$2,$3) RETURNING *",
        [namee, birthdate, pic]
    )
    res.json(newData.rows[0]);
});


