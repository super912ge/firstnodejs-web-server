const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.SET.PORT||3000;
var app = express();
hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurrentYear',()=>new Date().getFullYear());
app.set('view engine', 'hbs');
hbs.registerHelper('screamIt',(text)=>text.toUpperCase());
app.use(express.static(__dirname+'/public'));
app.use((req,res,next)=>{
  var now = new Date().toString();
  console.log(`${now}: ${req.method} ${req.url}`);
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log',log+'\n',(err)=>{
    if (err) {
      console.log('unable to append to server.log.');
    }

  });

  next();
});

app.get('/',(req,res)=>{
//  res.send('<h1>hello express</h1>');
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage: 'welcome to home page',
    name: 'Yiwei',
    likes:[
      'Swimming',
      'Jogging'
  ],
  currentYear: new Date().getFullYear()
  })
});
app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle:'About page',
    currentYear: new Date().getFullYear()

  });
});
app.get('/projects',(req,res)=>{
  res.render('projects.hbs',{
    pageTitle:'Projects'
  });
})

app.get('/bad',(req,res)=>{
  res.send({
    errorMessage: 'Unable to handle request'
  });
});
app.listen(port,()=>{

  console.log('server is up on port 3000');
});
