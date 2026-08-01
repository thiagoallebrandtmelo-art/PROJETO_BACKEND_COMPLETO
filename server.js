const express = require("express");
const app = express();
const path = require("path");
const PORT = 3000;


app.get("/Login", (req, res)=>{
    res.sendFile(path.join(__dirname, "public", "login.html"));
})


app.listen(PORT, ()=>{
    console.log(`Servidor e localhost: ${PORT}`)
})
