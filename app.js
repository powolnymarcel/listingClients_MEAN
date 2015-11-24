var express = require('express');
var app = express();
var bodyParser=require('body-parser');
var mongojs=require('mongojs');


//Definition d'un dossier statique
app.use(express.static(__dirname+ '/public'));
app.use(bodyParser.json());

app.get('/',function(req,res){
	res.send('ça fonctionne !')
});

app.listen(3000);
console.log('listening on port 3000')
