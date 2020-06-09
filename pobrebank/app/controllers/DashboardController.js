app.controller('DashboardController', function ($scope, $location) {
    $scope.activetab = $location.path();
});