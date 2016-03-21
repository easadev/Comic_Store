GuestController.$inject = ['$scope','$state', 'comics'];

function GuestController($scope,$state, comics){
    $scope.comics = comics.query();   
    $scope.openComic = function(id){
         $state.go('comic', {
             id : id
         });
     };
}
module.exports = GuestController;