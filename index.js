const express = require('express');
const morgan = require('morgan');
 require('dotenv').config();
const app = express();
const port = process.env.PORT ||3000;
const helmet = require('helmet');
const { apiLimiter } = require('./utils/rateLimiter');
const cors = require('cors');
const authRouter = require('./routes/auth.route');
const employeeRouter = require('./routes/employees.route');
const { connectDB } = require('./config/db');

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))
app.use(helmet())
connectDB()
app.use(cors({
    origin:"*"
}))
app.use('/api', apiLimiter);


app.use('/api/auth',authRouter );
app.use('/api/employee',employeeRouter );


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
