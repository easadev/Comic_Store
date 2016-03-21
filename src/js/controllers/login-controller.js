LoginController.$inject=['$stateParams','$scope','$state', 'auth'];

function LoginController($stateParams,$scope,$state, auth){
    
    if( auth.sessionExists() ){
        $state.go('admin.comics');
    }
    if( $stateParams.reason ){
        switch($stateParams.reason){
            case 'nosession':
                $scope.message = 'Inicie sesión antes de continuar';
            break;
            case 'logout':
                $scope.message = 'Ha cerrado sesión con éxito. Inicie de nuevo para continuar!.';
            break;
        }
    }
    
    $scope.login = function(credentials){
      auth.createSession(credentials)
        .then(function(employee_data){
            var goTo = $stateParams.requestedState || 'admin.comics';
            var goToParams = $stateParams.requestedParams || '{}';
            $state.go(goTo, JSON.parse(goToParams));
        })
        .catch(function(err){
            if(err.ERROR_CODE){
                if(err.ERROR_CODE == 'INVALID_LOGIN'){
                    $scope.message = 'Usuario o contraseña incorrectos. Intente de nuevo';
                }
            }
        });
    };
}

module.exports = LoginController;