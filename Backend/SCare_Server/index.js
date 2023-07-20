const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { connection } = require('./configs/db');
const { paiduserRouter } = require('./models/paidusermodel');
const { appointmentRouter } = require('./routes/appointmentroute');
const { logoutLogic } = require('./controllers/authenticate');
const {patientRouter} = require('./routes/patientroute');
const { doctorRouter } = require('./routes/doctorsroute');

require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

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


app.listen(process.env.PORT, async()=>{
    try {
        await connection;
        console.log('Connected to Database');
    } catch (err) {
        console.log(err.message);
    }
    console.log(`Server is running on Port ${process.env.PORT}`)
})
