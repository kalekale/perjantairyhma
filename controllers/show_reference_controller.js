MainApp.controller('ReferenceController', function($scope,$location, $routeParams,$http){
    
	console.log($routeParams.id);
    
    $http.get("/"+$routeParams.id).success(function(ref){
        console.log("latasi elokuvan sivun");
        $scope.reference=ref;
    });
    
    
    
    $scope.deleteReference=function(){
        $http.delete("/"+$routeParams.id).success(function(){
        	$location.path("/");
    	});
    };
    
    
});