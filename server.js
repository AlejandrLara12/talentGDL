const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
let app = express();

//middlewear
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// app.use((req, res, next) => {
//   let now = new Date().toString();
//   var log = `${now} ${req.method} ${req.url}`;
//   console.log(log);
//   fs.appendFile('server.log', log + '\n', (err) => {
//     if (err) { console.log('Unable to append to serve.log'); }
//   });
//   next();
// });

// app.use((req, res, next) => {
//   res.render('maitenance.hbs', {
//     pageTitle: "We'll be right back",
//     message: "The site is currentrly being updated."
//   });
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => { // request, response
  // res.send('<h1>Hello Express!</h1>');
  // res.send({
  //   name: 'Ricardo',
  //   likes: [12, 'hockey']
  // });
  res.render('home.hbs', {
    pageTitle: 'Home page',
    welcomeMessage: 'Welcome',
    // currentYear: new Date().getFullYear()
  });
});

app.get('/donaciones', (req, res) => { // request, response
  res.render('donaciones.hbs', {
    pageTitle: 'Quiero ayudar',
    message: 'Donaciones go here',
    // currentYear: new Date().getFullYear()
  });
});

app.get('/beneficiados/:grupo', (req, res) => { // request, response
  res.render('grupos.hbs', {
    pageTitle: 'Beneficiados',
    bodyMessage: 'test for the win',
    grupo: req.params.grupo
    // currentYear: new Date().getFullYear()
  });
});

app.get('/test', (req, res) => { // request, response
  res.render('temp.hbs', {
    pageTitle: 'Projects Page',
    userName: 'Rciardo Lara',
    bodyMessage: 'test for the win'
    // currentYear: new Date().getFullYear()
  });
});

app.get('/*', (req, res) => { // request, response
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(port, function() {
  console.log(`Server is up on port ${port}`);
});
