const express = require('express')

const app = express()

app.use(express.json())

app.use('/',(req, res)=>{
    return res.json("Olá")
})

app.listen(3000, ()=> console.log("Api Rodando"))