main_config_routes.$inject = ['$stateProvider','$urlRouterProvider'];

function main_config_routes($stateProvider,$urlRouterProvider){
    $stateProvider
        .state('guest', {
            url : '/comics',
            templateUrl : 'templates/guest.html',
            controller : require('./controllers/guest-controller')
        })
        .state('comic', {
            url : '/comic/{id:int}',
            templateUrl : 'templates/guest/comic.html',
            controller : require('./controllers/guest/comic-zoom-controller')
        })
        .state('login',{
            url : '/login?reason&requestedState&requestedParams',
            templateUrl : 'templates/login.html',
            controller : require('./controllers/login-controller')
        })
        .state('admin', {
            url : '/admin',
            abstract : true,
            templateUrl : 'templates/admin/admin.html',
            controller : require('./controllers/admin/admin-controller')
        })
        .state('admin.comics',{
            url : '/comics',
            templateUrl : 'templates/admin/comics/comics.html',
            controller : require('./controllers/admin/comics/comics-controller')
        })
        .state('admin.edit-comic',{
            url  : '/comic/{id:int}',
            controller : require('./controllers/admin/comics/edit-comic-controller'),
            templateUrl : 'templates/admin/comics/edit-comic.html'
        })
        .state('admin.employees',{
            url : '/employees',
            templateUrl : 'templates/admin/employees/employees.html',
            controller : require('./controllers/admin/employees/employees-controller')
        });
        
    $urlRouterProvider.otherwise('/login');
}

module.exports=main_config_routes;