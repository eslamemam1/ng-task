var cors = require('cors')
const { response } = require("express")
const express = require("express")
const wordList = require('./data/wordList')
const scoreList = require('./data/scoreList')
const bp = require('body-parser')

const app = express()

app.use(cors())
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

const randomObject = (list) => {
    var randomIndex = Math.floor(Math.random() * list.length)
    var result = list[randomIndex]
    list.splice(randomIndex, 1)
    return result;
}

app.get('/words', (request, res) => {
    // Below algorithm is inspired by fisher and yates algorithm to get random items from array
    //https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
    
    //Categorize the list to make sure all types included
    var categorizedWords = 
    [
        wordList.filter(w => w.pos == "verb"),
        wordList.filter(w => w.pos == "adverb"),
        wordList.filter(w => w.pos == "noun"), 
        wordList.filter(w => w.pos == "adjective")
    ];

    var result = [];

    //Step one => achieve minimum 1 object from each type algorithm
    for (let i = 0; i < 4; i++) {
        result.push(randomObject(categorizedWords[i]))
        if (categorizedWords[i].length == 0) {
            categorizedWords.splice(i, 1)
        }
    }

    //Step two => continue randomly until 10 elements returned
    var count = 4;
    while (count < 10) {
        var randomType = Math.floor(Math.random() * categorizedWords.length)

        result.push(randomObject(categorizedWords[randomType]))
        if (categorizedWords[randomType].length == 0) {
            categorizedWords.splice(randomType, 1)
        }

        count++;
    }
    
    
    res.json(result)
})




app.post('/rank', (req, res) => {
    finalScore = req.body.finalScore;
    var noOfScores = scoreList.length
    var smallerScores = scoreList.filter(score => score < finalScore).length
    var rank = Number((100 * smallerScores/ noOfScores).toFixed(2))
    res.json({
        "rank": rank
    })
})

app.listen(9090)