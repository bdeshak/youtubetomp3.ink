const port = process.env.PORT || 3000;
const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const app = express();
const fs = require('fs');
const path = require('path');
var nodemailer = require('nodemailer');
const youtubesearchapi = require("youtube-search-api");
const { PDFDocument, rgb } = require('pdf-lib');
const { createReport } = require('docxtemplater');
const pdfParse = require('pdf-parse');
const { Document, Packer, Paragraph } = require('docx');







app.use('/', express('./'));
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.listen(port, () => {
    console.log("Server listening on port=>>" + port);
});




app.get('/', (req, res) => {
    res.sendFile('index.html', { root: './' });
  
});

app.get('/hello', (req, res) => {
    
res.send(8);

 
});



   

app.get('/youtubeSearch', async(req, res) => {
    var url = req.query.username;
const items = await youtubesearchapi.GetListByKeyword(url,[false],[20],[{type:"video"}]);

  //const items = await youtubesearchapi.GetListByKeyword(url,[false],[20],[{type:"video/channel/playlist/movie"}]);
/*
items.items.forEach((obj, i) => {      
           
          console.log(obj.id); 
           });

  */
res.json({"items":items});





/*
console.log(video.items);
console.log(video.items[0].id);
console.log(video.items[0].thumbnail.thumbnails[0].url);
console.log(video.items[0].shortBylineText.runs[0].navigationEndpoint.clickTrackingPara>



video.items.map((product) => {
console.log(product.shortBylineText.runs[0].navigationEndpoint.clickTrackingParams);
console.log(product.id);
  console.log(product.thumbnail.thumbnails[0].url);
*/
})







//file url
app.get('/youtubetomp3.svg', function (req, res) {
    res.sendFile(path.join(__dirname, 'youtubetomp3.svg'));
});
app.get('/youtubetomp3.ico', function (req, res) {
    res.sendFile(path.join(__dirname, 'youtubetomp3.ico'));
});
app.get('/youtubetomp3.png', function (req, res) {
    res.sendFile(path.join(__dirname, 'youtubetomp3.png'));
});
app.get('/loading.gif', function (req, res) {
    res.sendFile(path.join(__dirname, 'loading.gif'));
});
app.get('/gmail.png', function (req, res) {
    res.sendFile(path.join(__dirname, 'gmail.png'));
});
app.get('/favicon.ico', function (req, res) {
    res.sendFile(path.join(__dirname, 'favicon.ico'));
});
app.get('/facebook.png', function (req, res) {
    res.sendFile(path.join(__dirname, 'facebook.png'));
});
app.get('/twitter.png', function (req, res) {
    res.sendFile(path.join(__dirname, 'twitter.png'));
});
app.get('/style.css', function (req, res) {
    res.sendFile(path.join(__dirname, 'style.css'));
});
app.get('/controll.js', function (req, res) {
    res.sendFile(path.join(__dirname, 'controll.js'));
});
app.get('/pattern.png', function (req, res) {
    res.sendFile(path.join(__dirname, 'pattern.png'));
});
app.get('/sitemap.xml', function (req, res) {
    res.sendFile(path.join(__dirname, 'sitemap.xml'));
});
app.get('/guide_email.pdf', function (req, res) {
    res.sendFile(path.join(__dirname, 'guide_email.pdf'));
});

app.get('/ads.txt', function (req, res) {
    res.sendFile(path.join(__dirname, 'ads.txt'));
});

  app.get('/watch', function (req, res) {
    res.sendFile(path.join(__dirname, 'watch.jpg'));
});                  
        

/*app.get('/sw.js', function (req, res) {
    res.sendFile(path.join(__dirname, 'sw.js'));
});
*/

//end file url

//routes
app.get('/termofservice', (req, res) => {
    res.sendFile('termofservice.html', { root: './' });
})

app.get('/privacy', (req, res) => {
    res.sendFile('privacy&policy.html', { root: './' });
})

app.get('/contact', (req, res) => {
    res.sendFile('contactus.html', { root: './' });
})

app.get('/blog', (req, res, next) => {
    res.sendFile('blog.html', { root: './' });
       
})

app.get('/ytconverter', (req, res, next) => {
    res.sendFile('ytconverter.html', { root: './' });
       
})




app.get('/download', async(req, res, next) => {
//res.setHeader('Content-Type', 'application/json'); 
    var url = req.query.username;
   // res.send({title:77653});
   // console.log(req.query.username);
    
    var videoID = ytdl.getURLVideoID(url);
 //  console.log(ytdl.videoInfo);
    
  //  let info = ytdl.getInfo(videoID);       
    
    
   // let format = ytdl.chooseFormat(info.formats, { quality: '134' });
    
    //console.log('Format found!'+ format);
     
     const info = await ytdl.getInfo(req.query.username);
    //console.log(info.formats[4]);
    //console.log(info.formats[13].url);
    //console.log(info.formats[13].qualityLabel);
    
   // console.log(info.formats.length);
    
   // let qu = info.formats[13].quality;
     
     console.log(info.formats);
     
    let videoTitle = info.videoDetails.title;
    //console.log(info.player_response.videoDetails.thumbnail.thumbnails);
    
    let thumb = info.player_response.videoDetails.thumbnail.thumbnails;
    
  //  const video = ytdl(url,{ quality: '144p', format: 'mp4' }); 

//video.pipe(fs.createWriteStream(Output))


    let items = info.formats;





  
    /*
    let data = {
      "messages": [{
           "msgFrom": "13223821242",
           "msgBody": "Hi there"
       }, {
          "msgFrom": "Bill",
          "msgBody": "Hello!"
       }]
 };
 
 let ar=[];
 
    data.messages.forEach((obj, i) => { 
    ar.push(obj.msgBody);
    console.log("msgFrom", obj.msgFrom); console.log("msgBody", obj.msgBody); });
    
    */
  res.json({"items":items, "thumb":thumb, "videoTitle": videoTitle});
next();
    
    var transporter = nodemailer.createTransport({
    service: "gmail",
     //host: "smtp-relay.brevo.com",
     //port: 587,
     //secure: true,
  auth: {
    user: "bdeshak5@gmail.com",
    pass: "zkigvvfbezcohexj"
  }
});

   const mailOptions = {
  from: 'bdeshak5@gmail.com',
  to: 'mdalonebd@gmail.com', //list of receivers
  subject: videoTitle, // Subject line
  html:videoTitle //plain text body
};

transporter.sendMail(mailOptions, function (err, info) {
  if (err)
    
    
    console.log(err)
    /*
  else
    console.log(info);
    
    */
    //res.render('f_success');
})
    

  
    
    /*
    items.forEach(function (item) { 

            console.log(item.quality); 

        });

*/
    
    
    //res.header("Content-Disposition", 'attachment; filename="Vide.mp4');
    
   // ytdl(url, {format: 'mp4'}).pipe(res);
   // video.pipe(res);
    //ytdl(url).pipe(fs.createWriteStream('video.mp4'));
    
   // ytdl(url, { filter: (format) => format.container === 'mp4' }) .pipe(fs.createWriteStream('video.mp4'), res);
    
    
});
   
