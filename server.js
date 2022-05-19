const fs = require('fs')
const exp = require('constants')
const express = require ('express')
const path = require('path')
const notes = require('./db/db.json')

const PORT = process.env.PORT || 3001
const app = express()

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// app.get('/notes', (req, res) => {
//     res.sendFile(path.join(__dirname, './public/notes.html'))
// })

// app.post('/notes', (req, res) => {
//     res.sendFile(path.join(__dirname, '/db/db.json'))
// })
app.get('/api/notes', (req, res) => {
    res.json(notes)
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.post('/api/notes', (req, res) => {
    let noteId = (req.params.id)
    noteId = Math.floor(Math.random()* 999999999999999)
    let note = req.body
    req.body.id = noteId
    notes.push(note)
    fs.writeFileSync('./db/db.json', JSON.stringify(notes))
    res.json(notes)
})

app.delete('/api/notes:id', (req, res) => {
    console.log("AHHHHHH!!!!")
    for (let i = 0; i < notes.length; i++) {
        if(req.body.id === this.id)
        notes.splice(req.body, 1)
    }

    res.json(notes)
})

app.get('/api/note')

app.listen(PORT, () => {
    console.log(`Notes server now on port ${PORT}`)}
)