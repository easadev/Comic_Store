AdminController.$inject = ['$scope','$state', 'auth'];
function AdminController($scope, $state, auth){
    $scope.logout = function(){
        auth.endSession();
        $state.go('login', {
            reason : 'logout',
            requestedState : $state.current.name,
            requestedParams: JSON.stringify($state.params)
        });
        
    };
    $scope.$on('$stateChangeSuccess', function(event, toState){
        $scope.current = toState.name; 
    });
}
module.exports = AdminController;