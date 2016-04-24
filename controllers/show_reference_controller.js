MainApp.controller('ReferenceController', function($scope,$location, $routeParams,$http){
    
	console.log($routeParams.id);
    
    $http.get("/"+$routeParams.id).success(function(ref){
        console.log("latasi elokuvan sivun");
        $scope.reference=ref;
    });
    
    $scope.updateReference=function(){
        console.log("calling update reference in controller")
        $http.put("/"+$routeParams.id, $scope.reference).success(function(){
            console.log("update succsess in controller");
        });
    };
    
    $scope.deleteReference=function(){
        $http.delete("/"+$routeParams.id).success(function(){
        	$location.path("/");
    	});
    };
    
    
});