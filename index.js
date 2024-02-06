const express = require("express");
const mongoose = require("mongoose");
const Article = require("./models/article.js")
mongoose.connect(
    "mongodb+srv://masalim:11qqww22@cluster0.4raq5m4.mongodb.net/?retryWrites=true&w=majority").then((res)=>{
        console.log("connected succesfully")
    }
).catch((err)=>{
    console.error("err",err)
})
// console.log(express)
const app = express()

app.use(express.json())
// console.log(app)
// use / for root or main local host
app.get("/",(req,res)=>{
res.send("Hello local host")
})
// app.get("/hello",(req,res)=>{
// res.send("hello")
// // go to hocalhost:3000/hello
// })
// app.put("/test",(req,res)=>{
// res.send("you visited test")
// // go to hocalhost:3000/hi
// })
// app.post("/addComment",(req,res)=>{
//     res.send("post request")
// })
// app.delete("/delete",(req,res)=>{
//     res.send("delete one")
// })
// write : after slash for url variables
app.get("/findNum/:number1/:number2",(req,res)=>{
    const num1 = req.params.number1;
    const num2 = req.params.number2;
    let total = +num1 + +num2
    // console.log(`the numbers are ${num1} and ${num2}`)
res.send(`the total is ${total}`)
})
app.get("/sayHello",(req,res)=>{


// res.send(`hello ${req.body.name} Age is ${req.query.age}`)
// console.log(req.query)
// return res json format
// we wrote in both types body and query
// query is in the url
// body that u sent in fetch
res.json({
    name : req.body.name,
    age :req.query.age,
    language:"arabic"
})

})

app.get("/html",(req,res)=>{
    // res.send(`<h1>Hello world</h>`)
    // if youwrite without _dirname you should use all path and with dirname just use from server file path
    // res.sendFile("D:/muhammad/programming/backend course/node crush course/htmlFiles/getFiles.html")
    // res.sendFile(__dirname,"/htmlFiles/getFiles.html")
    // in ejs files use res.render
    // must be in views folder
    let numbers = "";
    for(let i =0;i<= 100;i++){
        numbers+=`${i}-`
    }
    res.render("getFiles.ejs",{
        name:"mo",
        numbers : numbers
    })
})

app.post("/db.json",(req,res)=>{
    res.json({
        "name":"mo"
    })
})
// mongoos end point
app.post("/articles",async (req,res)=>{

    const newArticle = new Article();

    newArticle.title =  req.body.Articletitle;
    newArticle.body = req.body.body;
    newArticle.numOflikes = 0;
       await newArticle.save()
res.json(newArticle)
})
app.get("/articles",async (req,res)=>{
    const allArticle =  await Article.find()
    res.json(allArticle)
})
app.get("/articles/:articleId",async (req,res)=>{
    const id = req.params.articleId
    const article = await Article.findById(id) 
    res.json(article)
})
app.delete("/articles/:articleId",async (req,res)=>{
    const id = req.params.articleId
    const article = await Article.findByIdAndDelete(id) 
    res.json(article)
})
app.get("/showArticles", async (req,res)=> {
    const allArticle = await Article.find();
    // console.log(allArticle)

    res.render("articles.ejs",{
        allArticles:allArticle
    })
})
app.listen(3000,()=>{
    console.log("Iam listeng in port" ,3000)
})




