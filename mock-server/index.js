const express = require('express')
const allPlanSchedules = require('./jsons/plan-all.json')
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

app.listen(port, () => {
    console.log(`Mock server running at http://localhost:${port}`)
})
