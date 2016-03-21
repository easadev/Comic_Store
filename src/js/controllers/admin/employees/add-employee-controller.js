AddEmployeController.$inject = ['$scope', 'employees'];

function AddEmployeController($scope, employees){
    $scope.createEmployee = function(employee){
        employees.save(null, employee, function(){
            $scope.employees.splice(0, 0, employee);
            $scope.employee = {};
        }, function(){
            alert('Error al crear el empleado');
        });
    };
}

module.exports = AddEmployeController;