const express = require('express');
const app = express ();
const path = require('path');
const router = require("express").Router();
// const store = require("./db/store.js")
var database = require("./db/db.json");

const PORT = process.env.PORT || 3001;


app.use(express.urlencoded({ 
    extended: true 
}));
app.use(express.json());
app.use(express.static('public'));


app.get('/notes',(req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// app.get('/api/notes', (req,res) => {
//     // // store
//     //     .getNotes()
//         .then((notes) => {
//             return res.json(notes);
//         })
//         .catch((err) => res.status(500).json(err));
// });

app.get("/api/notes", (req, res) => {
    let results = database
    res.json(results)
})

app.post("/api/notes", (req, res) => {
    req.body.id = database.length.toString();
    const note = req.body;
      database.push(note);
      fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes: database }, null, 2)
      );
      res.json(note);
    ;
  
  });

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT,()=>{
    console.log('listening on port' + PORT);
});

module.exports = router;