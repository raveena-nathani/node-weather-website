 const path = require('path')
 const express = require('express');
 const hbs = require('hbs');

 const app = express();

 const geocode = require('./utils/geocode');
 const forecast = require('./utils/forecast');

//Define paths for express config

 //__dirname - gives current file, path.join helps to manipulate the path 
 const publicDirectoryPath = path.join(__dirname,'../public');
 // if views folder name needs to be changed then
const viewsPath = path.join(__dirname,'../templates/views');

const partialsPath = path.join(__dirname, '../templates/partials');

 //setup handlebars
 app.set('view engine', 'hbs'); 
 app.set('views', viewsPath)
 hbs.registerPartials(partialsPath);

 //setup static directory to serve
 app.use(express.static(publicDirectoryPath));

//By default hbs points to views directory in the root folder

//dynamic hbs view
 app.get('', (req, res) => {
   //render views
   res.render('index',{
      title: 'Weather App',
      name: 'Raveena Nathani'
   }); //filename as first argument, and dynamic data as second argument
})

app.get('/about', (req, res) => {
   res.render('about', {
       title: 'About Me',
       name: 'Raveena Nathani'
   })
})

app.get('/help', (req, res) => {
   res.render('help', {
       helpText: 'This is some helpful text.',
       title: 'Help',
       name: 'Raveena Nathani'
   })
})


 app.get('/weather', (req, res)=> {
   const address = req.query.address;
   if(!address){
      return res.send({
         error: 'Address must be provided!'
      })
   }

   geocode(address, (error, {latitude, longitude, location } = {}) => {
      console.log("Error", error);

      if(error){
          return res.send({
            error: error
          })
      }
      forecast(latitude, longitude ,(error, forecastData) => {
        console.log("Error", error);

         if(error){
            return res.send({
              error
            })
        }
        res.send({
         forecast: forecastData ,
         location,
         address
     });
      })
  })

  
 }) 

 app.get('/help/*',(req, res) => {
   res.render('404',{
      title: '404', 
      name: 'Raveena Nathani',
      errorMessage: 'Help article on found!'
   })
 })

 app.get('*', (req, res) => {
   res.render('404',{
      title: '404',
      name: 'Raveena Nathani',
      errorMessage: 'Page not found!',
   })
 })

 app.listen(3000, () => {
    console.log("Server is running on port 3000");
 });

  //configure what the server should do when someone tries to get the resource at a specific URL 
//  app.get('/help', (req, res)=> {
//     res.send({
//         name: 'Raveena',
//         age: 26
//     });
//  })
//  app.get('/about', (req, res)=> {
//     res.send('About page');
//  })