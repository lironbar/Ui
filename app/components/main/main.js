'use strict';

angular.
module('app').
component('appComp', {
  templateUrl: 'app/components/main/main.html',
  controller: ['$scope', 'graphFactory',
  function mainCtrl($scope, graphFactory) {
    $scope.name = "John";


    $scope.toggleNav = function() {
      if ($scope.open) {
        document.getElementById("appSidenav").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
        document.getElementById("main").style.width = "100%";
      }
      else {
        document.getElementById("appSidenav").style.width = "0";
        document.getElementById("main").style.marginLeft= "0";
        document.body.style.backgroundColor = "white";
      }
    }

    graphFactory.users(function(users) {
      $scope.users = users.data;
      $scope.getUnreadMessages();
      $scope.getActivitySum();
    });

    graphFactory.tasks(function(tasks) {
      $scope.tasks = tasks.data;
      $scope.getTaskNumber();
      $scope.getDelayedTask();
    });

    $scope.firstLetter = function(name) {
      var letter = name.charAt(0);
      return letter;
    };


    $scope.getDelayClass = function(time) {
      var findDelay = time.indexOf("delay");
      if (findDelay !== -1) {
        return "delayed";
      }
    }

    $scope.getTaskNumber = function() {
      if($scope.tasks) {
        $scope.taskNumber = $scope.tasks.length;
      }
    }

    $scope.getDelayedTask = function() {
      if($scope.tasks) {
        var delayCount = 0;
        for(var i = 0; i < $scope.tasks.length; i++) {
        var findDelay = $scope.tasks[i].time.indexOf("delay")
          if(findDelay !== -1) {
            delayCount++
          }
        }
        if(delayCount > 0) {
          document.getElementById("delayedCircle").style.background = "#FE6293";
        }
        $scope.delayCount = delayCount;
      }
    }

    $scope.getUnreadMessages = function() {
      var unread = 0;
      for(var i = 0; i < $scope.users.length; i++) {
        if($scope.users[i].messageRead === false) {
          unread++
        }
      }
      $scope.unread = unread;
    }

    $scope.getActivitySum = function() {
      var activitySum = 0;
      for(var i = 0; i < $scope.users.length; i++) {
        if($scope.users[i].activity)
        activitySum++
      }
      $scope.activitySum = activitySum;
    }

  }]
});
