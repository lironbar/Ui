angular.module('app')
.factory('graphFactory', ['$http', function($http) {
  return {
    users: function(cb){
      $http.get('app/data/users.json').then(function(response){
        cb(response);
      });
    },
    tasks: function(cb){
      $http.get('app/data/tasks.json').then(function(response){
        cb(response);
      });
    }
  }
}]);
