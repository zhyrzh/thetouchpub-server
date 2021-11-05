const app = require('express')()
require('dotenv').config()
const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.send(`<h1>Horray</h1>`)
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
