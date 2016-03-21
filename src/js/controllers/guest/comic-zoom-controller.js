ComicZoomController.$inject = ['$scope', '$stateParams', 'comics'];

function ComicZoomController($scope, $stateParams, comics){
    // This holds the comment model of the view
    $scope.comment = {};
    var getComic = function(){
        $scope.comic = comics.get({
            id : $stateParams.id
        });
        //once we fetch the comic object from the server
        // we need to set the comicId property of the comment object
        // in that way, we can save it later
        $scope.comic.$promise
        .then(function(comic){
            $scope.comment.comicId = comic.id;
        });
    };
    
    getComic();
    
    
    // function to send a comment to the server
    $scope.addComment = function(comment){
      comics.addComment(null, comment, function(){
          $scope.comment = {};
          getComic();
      });
    };
}

module.exports = ComicZoomController;