angular.module('project.service', []).
    factory('GS', ['$http', function($http){
        
            return {
                    getTourn : function(callback, date1, date2){
                            var payload = {'start': decodeURIComponent(date1), 'end': decodeURIComponent(date2), 
                                           'method': 'getTournaments', 'UID': 'golfweek', 'PWD':'gsgw13',
                                           'returnFormat': 'JSON'};

                            var gsurl = 'http://www.golfstatresults.com/webservices/sec/event.cfc';

                            $http.get(gsurl, {params: payload }).
                                success(function(data, status){
                                    // This block breaks Header / Column data into
                                    // a list of json objects organized by key /value
                                        var stuf = [];
                                        // Loop over each item in the data list
                                        angular.forEach(data.DATA, function(value, key){
                                            var thing = {};    
                                            // assign a key to each value in the item
                                            angular.forEach(value, function(value, key){
                                                    this[data.COLUMNS[key]] = value;
                                                }, thing);
                                                this.push(thing);
                                            }, stuf);
                                        callback(stuf);
                                    });
                        },
                    
                    getTeam : function(callback, tournID){
                            var payload = {'tID': tournID, 'method': 'getTournamentTeams'};
                            $http.get('/stat/data/data.php', {params: payload}).
                                success(function(data,status){
                                        callback(data);
                                    });
                        },

                    getPlayers : function(callback, tournID){
                            var payload = {'tID': tournID, 'method': 'getTournamentPlayers'};
                            $http.get('/stat/data/data.php', {params: payload}).
                                success(function(data,status){
                                        callback(data);
                                    });
                        },

                    getLb : function(callback, tournID){
                            var payload = {'tID': tournID, 'method': 'teamLB'};
                            $http.get('/stat/data/data.php', {params: payload}).
                                success(function(data,status){
                                        callback(data);
                                    });
                        }

                }
        
        }]).
        config(function($httpProvider){
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
        });

angular.module('project.staticdata', []).
    factory('GSstatic', ['$http', function($http){
            
            return {
                
                    getTourn : function(callback){
                            $http.get('/stat/data/tournament_data.json').
                                success(function(data, status){
                                        callback(data);
                                    });
                        },
                    
                    getTeam : function(callback){
                            $http.get('/stat/data/team_data.json').
                                success(function(data,status){
                                        callback(data);
                                    });
                        },

                    getPlayers : function(callback){
                            $http.get('/stat/data/player_data.json').
                                success(function(data,status){
                                        callback(data);
                                    });
                        },

                    getLb : function(callback, tournamentid){
                            $http.get('/stat/data/tournament_results.json').
                                success(function(data,status){
                                        var thedata = '';
                                        angular.forEach(data, function(value, key){
                                            if (value.TOURNAMENT_ID == tournamentid){
                                               thedata = value; 
                                            }     
                                        }, thedata);
                                        
                                        callback(thedata);
                                    });
                        }
                    
                
                }

        }]);

