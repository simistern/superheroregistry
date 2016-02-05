var app = angular.module("superheroregistry", []);

app.controller("controller", ["$scope", "$http", function($scope, $http){

  $scope.rowitems = [];

  $http({
    "method": "GET",
    "url": "/registry"
  }).then(function(res){
    $scope.rowitems = res.data;
  })

  $scope.addAvenger = function(){
    $http({
      "method": "POST",
      "url": "/registry",
      "data": {
        "supername": $scope.inputName,
        "power": $scope.inputPower,
      }
    }).then(function(res){
      $scope.rowitems.push({
        "supername": $scope.inputName,
        "power": $scope.inputPower,
      })
      $scope.inputName = "";
      $scope.inputPower = "";
    })
  }
}]);




/*.then(function(res){
  $scope.rowitems.push({
    "name": $scope.inputName,
    "power": $scope.inputPower,
    "date" : new Date()
  })
  $scope.inputName = '';
  $scope.inputPower = '';
})*/
