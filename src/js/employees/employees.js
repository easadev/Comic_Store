var EMPLOYEES_API = require('../settings').BASE_API + '/employees/:id';
var angular = require('angular');

angular.module('employees', [
    require('angular-resource')
])
.directive('validPassword', function(){
    var linkFunc = function(scope, element, attr, ctrl){
        ctrl.$validators.validPassword = function(modelValue, viewValue){
            if( !modelValue ){
                return true;
            }
            if( modelValue.length<8 ){
                return false;
            }
            if( /[A-Z]*/.test(modelValue) && /\d{2}/.test(modelValue) && /\W/.test(modelValue) ){
              return true;
            }
            return false;
        };
    };
    return {
        restrict : 'A',
        require : '^ngModel',
        link : linkFunc
    }
})
.factory('employees', ['$resource', function($resource){
    return $resource(EMPLOYEES_API);
}]);