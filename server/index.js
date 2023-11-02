const connection_function = require("./db/connect_db")
const PORT = process.env.PORT || 5000
const {io, app, express, server} = require("./socket");

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/api/v1", require("./router/routes"))

const start_server = async () => {
    try {
        await connection_function()   
        server.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start_server()