'use strict';

var Module = angular.module('datePicker');

Module.directive('dateRange', function () {
  return {
    templateUrl: 'templates/daterange.html',
    scope: {
      start: '=',
      end: '='
    },
    link: function (scope, element, attrs) {

      /*
       * If no date is set on scope, set current date from user system
       */
        if (scope.start) {
            scope.start = new Date(scope.start);
        }
        if (scope.end) {
            scope.end = new Date(scope.end);
        }

        attrs.$observe('disabled', function(isDisabled){
          scope.disableDatePickers = !!isDisabled;
        });

        if (scope.start) {
            scope.$watch('start.getTime()', function (value) {
                if (value && scope.end && value > scope.end.getTime()) {
                    scope.end = new Date(value);
                }
            });
        }
        if (scope.end) {
            scope.$watch('end.getTime()', function (value) {
                if (value && scope.start && value < scope.start.getTime()) {
                    scope.start = new Date(value);
                }
            });
        }
    }
  };
});
