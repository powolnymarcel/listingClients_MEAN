var express = require('express');
var app = express();
var bodyParser=require('body-parser');
var mongojs=require('mongojs');
//On y passe le nom de la bd ainsi que le nom de la collection
var db = mongojs('listingClients_MEAN',['clients']);

//Definition d'un dossier statique
app.use(express.static(__dirname+ '/public'));
app.use(bodyParser.json());

app.get('/clients',function(req,res){
	console.log('Requete pour le listing clients');
		//On fait la requete tout comme dans le cli de mongodb, on y passe une fn callback avec un param erreur et un param documents(ces param seront retourné à cause du callback)
	db.clients.find().sort({nom:1},function(err,docs){
		if(err){
			res.send(err)
		}else{
			console.log('Requete find clients executée : envoi des donnéees');
			//On envoie la réponse au navigateur au format json
			res.json(docs);
		}
	});
});

	app.post('/client',function(req,res){
		console.log('le serveur a reçu une req post pour ajouter un client');
		db.clients.insert(req.body,function(err,doc){
			if(err){
				res.send(err)
			}else{
				console.log('Client ajouté');
				res.json(doc);
			}
		});
});

app.get('/client/:id',function(req,res){
	console.log('Requete pour le update client');
	var id = req.params.id;

	db.clients.findOne({_id: mongojs.ObjectId(id)},function(err,doc){
		if(err){
			res.send(err)
		}else{
			res.json(doc);
		}
	});
});

app.put('/client/:id',function(req,res){
	var id = req.params.id;

	db.clients.findAndModify({requete:{_id:mongojs.ObjectId(id)},
	update:{
		$set:{
			nom:req.body.nom,
			prenom:req.body.prenom,
			email:req.body.email,
			telephone:req.body.telephone
		}},
		//Si la requete ne trouve pas, monge créera une nvl entrée
		new:true
	},function(err,doc){
		res.json(doc);
	});
});


app.delete('/client/:id',function(req,res){
	console.log('Requete pour la suppression client');
	var id = req.params.id;

	db.clients.remove({_id:mongojs.ObjectId(id)},function(err,doc){
		if(err){
			res.send(err)
		}else{
			console.log('suppression client effectuée');
			res.json(doc);
		}
	})
});



app.listen(3000);
console.log('listening on port 3000')
