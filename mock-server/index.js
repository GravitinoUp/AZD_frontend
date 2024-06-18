const express = require('express')
const allPlansJson = require('./jsons/plan-all.json')
const planJson = require('./jsons/plan.json')
const allLimits = require('./jsons/limits-all.json')
const limitJson = require('./jsons/limit.json')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors())

const DELAY = 3000
const delay = (res, data) => {
    setTimeout(() => {
        res.json(data)
    }, DELAY)
}

// Получение всех план-графиков
app.post('/plan/all', (req, res) => {
    delay(res, allPlansJson)
})

// Получение одного план-графика
app.get('/plan/:id', (req, res) => {
    delay(res, planJson)
})

// Получение всех лимитов
app.post('/limit/all', (req, res) => {
    delay(res, allLimits)
})

app.get('/limit/:id', (req, res) => {
    delay(res, limitJson)
})

app.listen(port, () => {
    console.log(`Mock server running at http://localhost:${port}`)
})
