
MainApp.controller('MainController', function($scope,$location, $http){
    
    //methods
    $scope.getReferences=(function(){
        $http.get("/getAll").success(function(references){
            $scope.references = references;
        });
    });

    $scope.addReference=(function(){
        $http.post("/new",$scope.newReference).success(function(){
            $scope.init();
            $scope.message="Adding was succesful!";
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

        $http.post('/bib', list).
          success(function(data, status, headers, config) {
            window.open('/bib'); //does the download
            $scope.init();
          }).
          error(function(data, status, headers, config) {
            console.log('ERROR: could not download file');
          });
          /*
        $http.post("/bib",list).success(function(){
            $scope.init();
        });
        */


        //window.open('/bib');
    })

    $scope.deleteReference=function(){

        $http.delete("/"+$routeParams.id).success(function(){
            $location.path("/");
        });
    };

    $scope.init=function(){
        $scope.message="";
        $scope.getReferences();
        $scope.newReference={};    
    }


    //always when coming to the page
    
    $scope.init();

        
        
});


	