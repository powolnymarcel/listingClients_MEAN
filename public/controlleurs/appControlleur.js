//						L'injection de dependance meme si vide doit présenter un [] vide, ici, l'injection se fait pour l'app
//sera le ng-app dans la vue
var monApp = angular.module('monApplication',[]);

//ici, l'injection se fait pour le controlleur
// Le scope permet au controlleur  de 'parler' à la vue/template
//Le scope peut etre un fn par exmple : $scope.test = function(){return 'test'}  - dans la vue on devra inserer {{test()}}
//Le $http permet au controlleur de faire des requetes get et post
// Le $location permet la redirection dans le site
//On est pas obligé d'appeler les arguments dans ma fn mais SI on utilise la version min de angular, le code va tout faire foirer....
monApp.controller('monAppCtrl',['$scope','$http','$location',function($scope,$http,$location){

	$http.get('/clients').success(function(response){
		console.log("Données reçues du serveur");
		$scope.clients = response
	});

	$scope.ajoutClient=function(){
		console.log('ajout client');
		$http.post('/client',$scope.client).success(function(response){
			console.log('client ajouté!');
			window.location.href='/';
		})
	};


	$scope.editerClient=function(id){
		$scope.cacherBoutonAjouter = true;
		$scope.cacherBoutonModifier = true;
		$http.get('/client/'+id).success(function(response){
			$scope.client = response
		})
	};



$scope.updateClient= function(){
	$scope.cacherBoutonAjouter = false;
	$scope.cacherBoutonModifier = false;
	//Requete put pour mettre à jour
	//RESTFUL API = GET POST PUT DELETE
	//On put vers la route et on y ajout les données du client
	$http.put('/client/'+$scope.client._id,$scope.client).success(function(response){
		console.log(response);
		console.log("client mis à jour");
		window.location.href='/';
	})

}

$scope.supprimerClient=function(id){
	if(confirm('Etes-vous sûr?')){
		$http.delete('/client/'+id).success(function(response){
			console.log('client supprimé!');
			window.location.href='/';
		});
	}else{
		return false
	}
}

}]);
