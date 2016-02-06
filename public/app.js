var app = angular.module("superheroregistry", []);

/*app.controller("AllegianceController", ["$scope","$http", function($scope, $http) {
   $scope.data = {
    Allegiance: null,
    availableOptions: [
      {id: 'Captain America', descrip: 'People should be free'},
      {id: 'Iron Man', descrip: 'People should be responsible'},
      {id: 'Bernie Sanders', descrip: 'Feel the Bern'}
    ],
   };
}]);*/

app.controller("controller", ["$scope", "$http", function($scope, $http){
  //$scope.HeroCount = 0;
  $scope.rowitems = [];
  $scope.rowteams = [];

  $scope.data = {
   teamchoice: 'freelance hero-for-hire',
   availableOptions: [
     {id: 'Captain America', descrip: 'People should be free'},
     {id: 'Iron Man', descrip: 'People should be responsible'},
     {id: 'Bernie Sanders', descrip: 'Feel the Bern'}
   ],
  };

  $scope.getHeroes = function(){
    $http({
      "method": "GET",
      "url": "/registry"
    }).then(function(res){
      $scope.rowitems = res.data;
    })
  };


  $scope.getHeroes();

  $scope.updateHeroes = function(teamchoice){
    console.log("what is the value of " + teamchoice);
    $http({
      "method": "PATCH",
      "url": "/registry",
      "data": { teamchoice }
    }).then(function(){
      $scope.getHeroes();
    });
  }

  $scope.addAvenger = function(){
    //console.log("i need an adult " + $scope.inputName + " " + $scope.inputPower + " " + $scope.HeroCount);
    $http({
      "method": "POST",
      "url": "/registry",
      "data": {
        //"id": $scope.HeroCount,
        "name": $scope.inputName,
        "power": $scope.inputPower
        //"team" : "undeclared"
      }
    }).then(function(res){
        $scope.getHeroes();
        $scope.inputName = "";
        $scope.inputPower = "";
      });
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
