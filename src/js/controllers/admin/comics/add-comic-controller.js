AddComicController.$inject = ['$scope', 'comics'];

function AddComicController($scope, comics){
    $scope.createComic = function(comic){
        comics.save(null, comic,function(savedComic){
            $scope.comics.splice(0, 0, savedComic);
            $scope.comic = {};
        }, function(){
            alert('Error al crear el cómic');
        });
    };
}

module.exports = AddComicController;