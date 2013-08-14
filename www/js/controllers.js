

function viewOptions($scope, $routeParams, $http){
    $scope.viewChoices = [
        {name:'Tournaments', url:'tournaments/'},   
        {name:'Teams', url:'teams/'},
        {name:'Players', url:'players/'},   
    ];    
    
}


function teamDisplay($scope, $routeParams, GS, GSstatic, gsurl, teams, $http){

    setNewTeams = function(data){
                    $scope.newTeams = data;
                }
    
    setStaticTeams = function(data){
                        $scope.teams = data;
                    }

    GS.getTeam(setNewTeams);

    GSstatic.getTeam(setStaticTeams);

    //$http.get(teams).
    //    success(function(data){
    //            $scope.teams = data;
    //        }).
    //    error(function(data, status){
    //            $scope.teams = status;
    //        });

}

function tournDisplay($scope, $routeParams, GS, GSstatic, $http){

    setNewTourn = function(data){
                        //$scope.newTournaments = data;
                        }
    
    setTourn = function(data){
                        $scope.tournaments = data;
                        }

    var counter = 0;
    setResults = function(data){
                    if(data == '' && counter == 0){
                        counter++;
                        GS.getLb(setResults);    
                    }
                    $scope.results = data;
                 }
    var d = new Date(+new Date - 12096e5);
    var today = (d.getMonth()+1) + "/" + d.getDate() + "/" + d.getFullYear();
    var d2 = new Date(+new Date + 12096e5);
    var later = (d2.getMonth()+1) + "/" + d2.getDate() + "/" + d2.getFullYear();


    GS.getTourn(setNewTourn, today, later); 
    
    var tournamentid = $routeParams.tournament;

    if(tournamentid == undefined){

        GS.getTourn(setTourn);

    }else{
        
        GSstatic.getLb(setResults, tournamentid);
            
    }
}

function playerDisplay($scope, $routeParams, playURL, $http){
    
    $http.get(playURL).
        success(function(data){
                $scope.players = data;
            }).
        error(function(data, status){
                $scope.players = status;
            });
}

function searchDisplay($scope, $routeParams, $http){
    $scope.search = 'nothing';    
}
