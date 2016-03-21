EmployeesController.$inject = ['$scope', 'employees'];

function EmployeesController($scope, employees){
    $scope.employees = employees.query();
}

module.exports = EmployeesController;