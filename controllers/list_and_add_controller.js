
MainApp.controller('MainController', function($scope,$location, $http){
    
    $scope.newReference={};
    $scope.references=[];

    $http.get("/getAll").success(function(references){
    	
    	$scope.references = references;
    });
    
    $scope.addReference=(function(){
    	$http.post("/new",$scope.newReference).then(function(){
            
            $scope.$applyAsync(function(){
                console.log("apply");
                   
            })
            

        });
    });
        
        
});


	