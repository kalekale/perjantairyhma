MainApp.controller('ReferenceController', function($scope,$location, $routeParams,$http){
    
	$scope.reference={};
    
    $http.get("/"+$routeParams.id).success(function(ref){
        $scope.reference=ref;
    });
    
    $scope.updateReference=function(){
        //console.log("calling update reference in controller")
        $http.put("/"+$routeParams.id, $scope.reference).success(function(){
            $scope.message="Update was succesful!";
        });
    };
    
    $scope.deleteReference=function(){
        if(confirm("Are you sure?")){
            $http.delete("/"+$routeParams.id).success(function(){
                $location.path("/");
            });    
        }
        
    };

     
    
    
});