
MainApp.controller('MainController', function($scope,$location, $http){
    
    $scope.newReference={};
    $scope.references=[];

    $scope.getReferences=(function(){
        $http.get("/getAll").success(function(references){
            $scope.references = references;
        });
    });

    
    
    $scope.addReference=(function(){
        $http.post("/new",$scope.newReference).success(function(){
            $scope.newReference={};
            $scope.getReferences();
        });

        
    });
        
        
});


	