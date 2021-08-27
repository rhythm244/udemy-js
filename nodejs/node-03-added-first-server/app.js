const express = require('express')
const locationRouters = require('./routes/location')

const app = express();

app.use(express.json()) //ทำให้สามารถใช้ body parser ได้ ไม่งั้นมันจะไม่สามารถเก็บ ค่าที่ส่งไปไว้ใน req.body ได้

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader("Access-Control-Allow-Origin", "POST", "GET", 'OPTIONS');
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
})

app.use(locationRouters); //บอก express ว่า ใช้อันนี้ด้วยนะที่ import เข้ามาด้านบนอ่ะ มันจะมี route ที่เราสร้างไว้ด้วย


//midleware


app.listen(3000);