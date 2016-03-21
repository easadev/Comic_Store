var COMIC_API = require('../settings').BASE_API + '/comics/:id';

var angular = require('angular');

angular.module('comics',[
    require('angular-resource')
])
.factory('comics', ['$resource', function($resource){
    return $resource(
        COMIC_API,
        {},
        {
            query : {
                isArray : false,
                params : {
                    _sort : 'id',
                    _order : 'DESC',
                },
                method : 'GET',
                transformResponse : function(response, headersGetter){
                    var data = {
                        items : angular.fromJson(response)
                    };
                    /*
                        json-server sets this header when we use _start and _end.
                        This helps us to do display a "load more comics" button..
                    */
                    total_count = headersGetter("X-Total-Count");
                    if( total_count ){
                        data.total_count = parseInt(total_count, 10);
                    }
                    return data;
                }
            },
            get : {
                params : {
                    _embed : 'comments'
                }
            },
            addComment : {
                url : require('../settings').BASE_API + '/comments',
                method : 'POST'
            }
        }
    );
}])
.directive('renderComic', function(){
    return {
        restrict : 'E',
        scope : {
            comic : '='
        },
        templateUrl : 'templates/directives/render-comic.html'
    };
})