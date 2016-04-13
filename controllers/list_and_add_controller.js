
MainApp.controller('MainController', function($scope, $http){
    
    $scope.newReference={};
    $scope.references=[];

    $http.get("/").success(function(references){
    	
    	$scope.references = references;
    });
    
    $scope.addReference=(function(){
    	$http.post("/new",$scope.newReference);
    });
        
        
});


	