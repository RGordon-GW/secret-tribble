angular.module('project', ['project.service', 'project.staticdata']).
    config(function($routeProvider){
            $routeProvider.
            when('/', {controller:viewOptions, templateUrl:'/golfstat/www/partials/top.html'}).
            when('/teams/', {controller:teamDisplay, templateUrl:'/golfstat/www/stat/partials/teams.html'}).
            when('/teams/:team/', {controller:teamDisplay, templateUrl:'/golfstat/www/partials/team.html'}).
            when('/tournaments/', {controller:tournDisplay, templateUrl:'/golfstat/www/partials/tournaments.html'}).
            when('/tournaments/:tournament/', {controller:tournDisplay, templateUrl:'/golfstat/www/partials/tournament.html'}).
            when('/players/', {controller:playerDisplay, templateUrl:'/golfstat/www/partials/players.html'}).
            when('/players/:player/', {controller:playerDisplay, templateUrl:'/golfstat/www/partials/player.html'}).
            when('/search/', {controller:searchDisplay, templateUrl:'/golfstat/www/partials/search.html'}).
            otherwise({redirectTo:'/'});
        });

