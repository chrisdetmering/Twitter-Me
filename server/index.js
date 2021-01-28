const express = require("express"); 
const path = require("path"); 
const app = express(); 
const PORT = process.env.PORT || 8080; 

app.use(express.static(path.join(__dirname, '../client', 'build')));

app.get('/', (req, res) => { 
  res.sendFile(path.join(__dirname, '../client', 'build', 'index.html')); 
})


app.get('/tweet', (req, res) => { 
  res.send('tweet'); 
})


app.listen(PORT, () => console.log(`Server Listening on ${PORT} `)); 