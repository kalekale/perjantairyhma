
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
        console.log('pressed')
        window.open('/bib');
    })


    //always when coming to the page
    $scope.getReferences();
    $scope.newReference={};


        
        
});


	