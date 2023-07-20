const express = require("express");
const app = express();
const cors = require('cors');
const mysql = require("mysql");
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "cruddatabase"
})
app.use(express.json());
app.use(cors());


app.post('/api/watched',(req,res)=>{
    const watch = "True"
    const anime_name = req.body.anime_name
    const user_id = req.body.user_id
    const sqlInsert = `Update favorites set watch = ${watch} Where anime_name = "${anime_name}" and user_id = "${user_id}"`
    db.query(sqlInsert, [watch], (err, result) => {
        console.log(err);
    })
})

app.post('/api/favorite', (req, res) => {
    const mal_id = req.body.mal_id
    const anime_name = req.body.anime_name
    const image_url = req.body.image_url
    const rating = req.body.rating
    const user_id = req.body.user_id
    const watch = req.body.watch

    const sqlInsert = "INSERT INTO favorites (mal_id, anime_name, image_url, rating, user_id,watch) VALUES (?,?,?,?,?,'False');"
    db.query(sqlInsert, [mal_id, anime_name, image_url, rating,user_id,watch], (err, result) => {
        console.log(err);
    })
})

app.post('/api/favManga', (req, res) => {
    const mal_id = req.body.mal_id
    const manga_name = req.body.manga_name
    const image_url = req.body.image_url
    const score = req.body.score
    const user_id = req.body.user_id

    const sqlInsert = "INSERT INTO favmanga (mal_id, manga_name, image_url, score, user_id) VALUES (?,?,?,?,?);"
    db.query(sqlInsert, [mal_id, manga_name, image_url, score,user_id], (err, result) => {
        console.log(err);
    })
})

app.post('/api/user', (req, res) => {
    const nickname = req.body.nickname
    const email = req.body.email

    const sqlInsert = "INSERT INTO users (nickname, email) VALUES (?,?);"
    db.query(sqlInsert, [nickname, email], (err, result) => {
        console.log(err);
    })
})

app.get("/api/get", (req, res) => {
    const sqlInsert = `SELECT * FROM favorites  ORDER BY id ASC`;
    db.query(sqlInsert, (err, result) => {
        res.send(result);
    })
})

app.get("/api/getComp", (req, res) => {
    const sqlInsert = `SELECT * FROM favorites where watch = '1' ORDER BY id ASC`;
    db.query(sqlInsert, (err, result) => {
        res.send(result);
    })
})

app.get("/api/getuser", (req, res) => {
    const sqlInsert = "SELECT * FROM users ORDER BY id ASC"
    db.query(sqlInsert, (err, result) => {
        res.send(result);
    })
})

app.get("/api/getmanga", (req, res) => {
    const sqlInsert = "SELECT * FROM favmanga ORDER BY manga_name ASC"
    db.query(sqlInsert, (err, result) => {
        res.send(result);
    })
})


// app.get('/', (req, res) => {
//     const sqlInsert = "INSERT INTO review(anime_name, anime_rev) VALUES ('test','good test');"
//     db.query(sqlInsert, (err, result) => {
//         if (err) {
//             console.log(err); // Log the error for debugging
//             res.send("Error occurred while inserting data into the database");
//         } else {
//             res.send("Data inserted successfully");
//         }
//     });
// });


app.listen(3001, () => {
    console.log('running on port 3001')
});

// ---------------------

