var AUTH_API = require('../settings').BASE_API + '/employees';
var COOKIE_KEY = 'COMIC_STORE_SESSION'; // This holds the cookie key
angular.module('auth', [
    require('angular-cookies'),
    require('angular-resource')
])
.factory('auth', ['$cookies', '$resource', '$q', function($cookies, $resource, $q){
    
    var session_backend = $resource(
        AUTH_API,
        {},
        {
            get : {
                isArray : true
            }
        }
    );
    
    var session = $cookies.getObject(COOKIE_KEY);
    
    var sessionExists = function(){
        return session != null;
    };
    
    var getSession = function(){
        return session;
    };
    
    
    var endSession = function(){
        setSession(null);
    };
    
    var setSession = function(_session){
        $cookies.putObject(COOKIE_KEY, _session);
        session = _session;   
    };
    
    var createSession = function(login_data){
        var deferred = $q.defer();
        session_backend.get(login_data)
            .$promise
            .then(function(result){
                // No login found with the provided credentials
                if( !result.length ){
                    throw {
                        ERROR_CODE : 'INVALID_LOGIN',
                        ERROR_MSG : 'Usuario o contraseña incorrectos'
                    };
                }
                // authentication succesful
                setSession(result[0]);
                deferred.resolve(result[0]);
            })
            .catch(function(error){
                deferred.reject(error);
            });
        return deferred.promise;
    };
   
   return {
       sessionExists : sessionExists,
       createSession : createSession,
       endSession : endSession
   };

}]);