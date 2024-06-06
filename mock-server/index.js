const express = require('express')
const allPlanSchedules = require('./jsons/plan-all.json')
const planSchedule = require('./jsons/plan.json')
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
app.get('/plan/all', (req, res) => {
    delay(res, allPlanSchedules)
})

// Получение одного план-графика
app.get('/plan/:id', (req, res) => {
    delay(res, planSchedule)
})

app.listen(port, () => {
    console.log(`Mock server running at http://localhost:${port}`)
})
