EditComicController.$inject = ['$scope','$stateParams', '$timeout', 'comics'];

function EditComicController($scope,$stateParams,$timeout, comics){
    
    $scope.message = '';
    
    $scope.comic = comics.get({
        id : $stateParams.id
    });
    
    $scope.saveChanges = function(){
      $scope.comic.$save(null, function(){
          $scope.message = 'Cambios guardados correctamente!';
          $timeout(function(){
              $scope.message = '';
          }, 2000);
      });  
    };
}

module.exports = EditComicController;