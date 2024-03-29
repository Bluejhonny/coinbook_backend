const express = require("express")
const bodyParser = require("body-parser") // body parser middleware
const cors = require("cors") //enable cors
const session = require("express-session") // session middleware on the server side
const MemoryStore = require('memorystore')(session)

const authUser = require("../middleware/authUser")
const registerUser = require("../middleware/registerUser")

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors())
app.set("view-engine", "ejs")
app.use(express.json())

app.use(express.urlencoded({ extended: false }))
// app.use(
//   session({
//     secret: process.env.DB_CONNECTION,
//     resave: true,
//     saveUninitialized: true,
//     cookie: { secure: false },
//   })
// )
app.use(session({
  cookie: { maxAge: 86400000 },
  store: new MemoryStore({
    checkPeriod: 86400000 // prune expired entries every 24h
  }),
  resave: false,
  secret: 'keyboard cat'
}))


app.get("/", (req, res) => {
  console.log("connected")
  })
 
//login
app.post("/login", authUser)

//register
app.post("/register", registerUser)

module.exports = app