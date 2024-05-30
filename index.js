const express = require('express');
const path=require('path');
const fs=require('fs');
const app = express();

app.set('view engine','ejs');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>{
    fs.readdir(`./Files`,(err,files)=>{
        res.render('index',{files:files});
    })
});

app.get('/edit/:filename',(req,res)=>{
     res.render('edit',{filename:req.params.filename});
});

app.get('/Files/:filename',(req,res)=>{
     fs.readFile(`./Files/${req.params.filename}`,"utf-8",function(err,filedata){
        res.render('show',{filename:req.params.filename,filedata:filedata});
     })
});

app.post('/edit',(req,res)=>{
     fs.rename(`./Files/${req.body.previous}`,  `./Files/${req.body.new}`,(err)=>{
        res.redirect('/');
     });
})

app.post('/create',(req,res)=>{
    fs.writeFile(`./Files/${req.body.title.split(' ').join('')}.txt`,req.body.details,(err)=>{
        res.redirect('/');
    })
})
app.listen(3000,()=>{
    console.log("Server is running ");
})