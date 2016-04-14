
MainApp.controller('MainController', function($scope,$location, $http){
    
    $scope.newReference={};
    $scope.references=[];

    $http.get("/getAll").success(function(references){
    	
    	$scope.references = references;
    });
    
    $scope.addReference=(function(){
        $scope.references.push($scope.newReference);
        $scope.newReference={};
    	$http.post("/new",$scope.newReference);
    });
        
        
});


	