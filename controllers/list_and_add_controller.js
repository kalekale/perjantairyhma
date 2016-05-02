
MainApp.controller('MainController', function($scope,$location, $http){
    
    //methods
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

    $scope.generateBibtex=(function(){
        var list=[];
        for(var key in $scope.references){
            var obj=$scope.references[key];
            if(obj.checked){
                delete obj['checked'];
                list.push(obj);
            }
        }
        console.log('bib size: '+list.length);
        $http.post("/bib",list).success(function(){
            $scope.newReference={};
            $scope.getReferences();
        });


        //window.open('/bib');
    })

    $scope.deleteReference=function(){

        $http.delete("/"+$routeParams.id).success(function(){
            $location.path("/");
        });
    };


    //always when coming to the page
    $scope.getReferences();
    $scope.newReference={};


        
        
});


	