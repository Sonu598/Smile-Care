const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { connection } = require('./configs/db');
const { appointmentRouter } = require('./routes/appointmentroute');
const { logoutLogic } = require('./controllers/authenticate');
const {patientRouter} = require('./routes/patientroute');
const { doctorRouter } = require('./routes/doctorsroute');

require('dotenv').config();
const app = express();

const http = require("http");
const {Server} = require("socket.io");
const httpServer = http.createServer(app);

const io = new Server(httpServer);
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/",(req,res)=>{
    res.send("Dentique Backend Home Page")
})

app.use('/patient', patientRouter);
app.use('/doctor', doctorRouter);
app.use("/appointment",appointmentRouter);
app.post('/logout', logoutLogic);

app.get('*', (req, res)=>{
    res.send('<h1>Page Not Found</h1>')
})

app.get("/",(req,res)=>{
    res.send("Smile Care Backend Home Page")
})

io.on("connection",(socket)=>{
    socket.on("chat1",(msg)=>{
        io.emit("chat2",msg)
    })
})


httpServer.listen(process.env.PORT, ()=>{
    connection();
    console.log(`Server is running on Port ${process.env.PORT}`)
})
