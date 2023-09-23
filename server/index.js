const express = require("express")
const connection_function = require("./db/connect_db")
const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api/v1", require("./router/routes"))

const start_server = async () => {
    try {
        await connection_function()   
        app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start_server()