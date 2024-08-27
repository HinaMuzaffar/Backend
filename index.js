const express = require("express");
const app = express();
const path = require("path");

const port  =8080;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));

app.set("view engine" , "ejs");
app.set("views", path.join(__dirname,"/views"));



const methodOverride= require("method-override");
const { v4: uuidv4 } = require('uuid');
app.use(methodOverride("_method"));




let instagram = [
    {
        id : uuidv4(),
        username : "amandhattarwal",
        followers : 2000000,
        following : 20,
        posts : 574,
        about : "On a mission to teach 5 Crore students & 80,00,000+ students reached & 21 times TEDX speaker "
    },
    {
        id : uuidv4(),
        username : "hinaa_muzaffar",
        followers : 23,
        following : 42,
        posts : 45,
        about : "I will never give up! "
    },
    {
        id:uuidv4(),
        username : "microsoft",
        followers : 4400000,
        following : 235,
        posts : 1029,
        about : "Everyone wins with Copilot"
    },
    {
        id : uuidv4(),
        username : "google",
        followers : 152500000,
        following : 34,
        posts : 2509,
        about : "Google unfiltered—sometimes with filters."
    }
]

app.get("/instagram" , (req,res) => {
    res.render("index.ejs" , {instagram});
});

app.get("/instagram/new" , (req,res) => {
    res.render("new.ejs");
});
app.post("/instagram" , (req,res) => {
    let {username,followers,following,posts,about} = req.body;
    let id=uuidv4();
     instagram.push({id,username,followers,following,posts,about});
     res.redirect("/instagram");
});

app.get("/instagram/:id" , (req,res) => {
 let {id} = req.params;
 let post = instagram.find((p) => id === p.id);
 res.render("show.ejs" , {post})
});

app.patch("/instagram/:id", (req,res) => {
    let {id} = req.params;
    let newContent = req.body.about;
    let post = instagram.find((p) => id === p.id);
    post.about = newContent;
    res.redirect("/instagram");
});
app.get("/instagram/:id/edit" , (req,res) => {
    let {id} = req.params;
 let post = instagram.find((p) => id === p.id);
    res.render("edit.ejs" , {post});
});

app.delete("/instagram/:id" , (req,res) => {
    let {id} = req.params;
     instagram = instagram.filter((p) => id !== p.id);
    res.redirect("/instagram");
});
app.get("/" , (req,res) => {
    res.send("post is working");
});

app.listen(port, (req,res) => {
    console.log(`app is listening on ${port}`);
});