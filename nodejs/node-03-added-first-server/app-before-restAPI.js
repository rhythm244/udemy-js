const express = require('express')
const bodyParse = require('body-parser') //ไม่จำเป็นต้องทำแบบนี้แล้ว

const app = express();

// app.set('view engine', 'ejs')
// app.set('views', 'views')

app.use(bodyParse.urlencoded({extends: false}))

//midleware
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'text/html')
    next(); //ให้ทำ middleware ด้านล่างด้วย
})

app.use((req, res, next) => {
    let userName = req.body.username || 'Unknown user'
    // res.send(`<h1>Hi ${userName}</h1><form method="POST" action="/" ><input name="username" type="text"><button type="submit">SEND</button></form>`)
    res.render('index', {
        user: userName
    })
})


app.listen(3000);