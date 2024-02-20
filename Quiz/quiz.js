let readLineSync = require('readline-sync');
let kuler = require("kuler")

let numberOfPlayers = readLineSync.question(kuler('Enter the number of players: ', "#15803d"))
let score = 0;

const questionSet = {
  data: [
    {
      question: 'Which Set class should be most popular in a multi-threading environment, considering performance constraint?',
      options: {
        a: 'HashSet',
        b: 'ConcurrentSkipListSet',
        c: 'LinkedHashSet',
        d: 'CopyOnWriteArraySet'
      },
      correctAnswer: 'b'
    },
    {
      question: 'Which Map class should be most popular in a multi-threading environment, considering performance constraint?',
      options: {
        a: 'Hashtable',
        b: 'CopyOnWriteMap',
        c: 'ConcurrentHashMap',
        d: 'ConcurrentMap'
      },
      correctAnswer: 'b'
    },
    {
      question: 'Which allows the removal of elements from a collection?',
      options: {
        a: 'Enumeration',
        b: 'Iterator',
        c: 'Both',
        d: 'None'
      },
      correctAnswer: 'd'
    }
  ]
}

let leaderBoard = {
  data: []
}

for (let player=0; player<numberOfPlayers; player++) {
    let username = readLineSync.question(`Enter the name of player ${player+1}: `);
    let showQuestions = (questionSet) => {
        for (let i=0; i<questionSet.data.length; i++) {
        console.log(`\nQ${i+1}: ${questionSet.data[i].question}\n`)
            for (let j in questionSet.data[i].options) {
              console.log(`${j} - ${questionSet.data[i].options[j]}`)
            }
            let userAnswer = readLineSync.question('\nEnter your answer (a/b/c/d): ').toLowerCase()
            showResult(userAnswer, questionSet.data[i].correctAnswer)
        }
    }
    
    let showResult = (userAnswer, correctAnswer) => {
      if (userAnswer === correctAnswer) {
        console.log(kuler("Correct Answer\n", "#16a34a"))
        score++;
      }else {
        console.log(kuler(`Incorrect Answer
        Correct Answer is ${correctAnswer}\n`, "#b91c1c"))
      }
    }
    
    let showLeaderBoard = (leaderBoard) => {
      leaderBoard.data.push({name: username, score: score})
    }
    
    showQuestions(questionSet)
    showLeaderBoard(leaderBoard)

    console.log(`\nYour Score is ${score}`)
}

let sortedScoreList = leaderBoard.data.sort((a, b) => b.score - a.score)
console.log(`\nLeader Board
------------`)
  for(let i of sortedScoreList){
    console.log(`${i.name} : ${i.score}`)
  }