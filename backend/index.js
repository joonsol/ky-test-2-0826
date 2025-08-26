const express = require("express")
const mongoose=require("mongoose")
const dotenv =require("dotenv")
const cors=require("cors")
const cookieParser = require("cookie-parser");
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000



app.use(cookieParser()); // ★ 쿠키 파싱
app.use(express.json())
app.use(cors({
    origin:process.env.FRONT_ORIGIN,
    
    credentials:true
}))



const authRoutes = require('./routes/authRoutes');
const bucketRoutes = require('./routes/bucketRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/buckets', bucketRoutes);


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB 연결 성공'))
    .catch(err => console.error('MongoDB 연결 실패:', err.message));

app.get('/', (_req, res) => res.send('Hello Express'));

app.listen(PORT, () => console.log(`Server is Running on ${PORT}`));
