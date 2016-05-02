MainApp.controller('ReferenceController', function($scope,$location, $routeParams,$http){
    
	$scope.reference={};
    
    $http.get("/"+$routeParams.id).success(function(ref){
        $scope.reference=ref;
    });
    
    $scope.updateReference=function(){
        //console.log("calling update reference in controller")
        $http.put("/"+$routeParams.id, $scope.reference).success(function(){
            //console.log("update succsess in controller");
        });
    };
    
    $scope.deleteReference=function(){
        if(confirm("Are you sure?")){
            $http.delete("/"+$routeParams.id).success(function(){
                $location.path("/");
            });    
        }
        
    };

    $scope.showConfirmation=function(){
        $scope.showConfirm=true;
    }

    $scope.hideConfirmation=function(){
        $scope.showConfirm=false;
    }
    
    
});