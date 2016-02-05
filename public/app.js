var app = angular.module("superheroregistry", []);


app.controller("AllegianceController", ["$scope","$http", function($scope, $http) {
   $scope.data = {
    repeatSelect: null,
    availableOptions: [
      {id: 'Captain America', name: 'People should be free'},
      {id: 'Iron Man', name: 'People should be responsible'},
      {id: 'Bernie Sanders', name: 'Feel the Bern'}
    ],
   };
}]);

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
        "name": $scope.inputName,
        "power": $scope.inputPower,
      }
    }).then(function(res){
      $scope.rowitems.push({
        "name": $scope.inputName,
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
