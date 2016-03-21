ComicsController.$inject = ['$scope', '$state', '$filter', 'comics'];
function ComicsController($scope, $state, $filter, comics){
     
    $scope.openComic = function(id){
         $state.go('admin.edit-comic', {
             id : id
         });
    };
     
    var filterComics = function(searchText){
       if(searchText && searchText != ''){
           $scope.filteredComics = $filter('filter')($scope.comics, function(comic, index){
              var regob = new RegExp(searchText, 'ig');
              return regob.test(comic.title);
           });
       }
       else{
           $scope.filteredComics = $scope.comics;
       } 
    };
    
    var _start = 0;
    var _end = 9;
    // How many comics we are going to load after the first ones?
    var increment = 6;
    $scope.comics = [];
    
    
    $scope.filteredComics = [];
    $scope.searchText = '';
    $scope.$watch('searchText', filterComics);

    var fetchComics = function(){
        comics.query({
            _embed : 'comments',
            _expand : 'employee',
            _start : _start,
            _end : _end
        }).$promise
        .then(function(data){
            if( data.total_count > _end ){
                _start = _end;
                _end = _end + increment;
                $scope.showLoadMoreComics = true;
            }
            else{
                $scope.showLoadMoreComics = false;
            }
            $scope.comics = $scope.comics.concat(data.items);
            filterComics($scope.searchText);
        });
    };
    
    $scope.fetchComics = fetchComics;
    
    fetchComics();
}
module.exports = ComicsController;