var angular = require('angular');
require('angular-ui-router');
angular.module('comic-store', [
    require('angular-sanitize'),
    require('./auth'),
    require('./comics'),
    require('./employees'),
    'ui.router'
])
.config(['$httpProvider', function($httpProvider){
    $httpProvider.defaults.headers.common = {
        "Content-Type" : "application/json",
        "Accept" : "application/json"
    };
}])
.controller('AddComicController', require('./controllers/admin/comics/add-comic-controller'))
.controller('AddEmployeeController', require('./controllers/admin/employees/add-employee-controller'))
.run(['$rootScope', '$state', 'auth', function($rootScope, $state, auth){
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams){
        /*
            toState is the same object that we define in our routes.
            See main-config-routes.j
        */
        if(/^admin/i.test(toState.name) && !auth.sessionExists()){
            //prevent transition from happening if the user is trying to access a protected resource without an existing session.
            //ideally, we would have to check this session validity with a server
            //but since it is a test.. it's ok
            //TLDR: Do not ever use this tecnic in a project
            event.preventDefault();
            
            //redirect user to the login page indicating that he needs to log-in
            $state.go('login', {
               reason : 'nosession',
               // Once the user logins, he gets redirected to the state he tried to go to previously
               requestedState : toState.name,
               requestedParams : JSON.stringify(toParams)
            });
        }
    });
}])
.config(require('./main-config-routes'));