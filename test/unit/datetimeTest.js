'use strict';

describe('TodoCtrl', function() {
  beforeEach(module('todomvc'));
  // variables for injection
  var controller;
  var scope;
  var location;
  var firebaseArray;
  var sce;
  var localStorage;
  var window;

  // Injecting variables
  // http://stackoverflow.com/questions/13664144/how-to-unit-test-angularjs-controller-with-location-service
  beforeEach(inject(function($location,
    $rootScope,
    $controller,
    $firebaseArray,
    $localStorage,
    $sce,
    $window)
	{
      // The injector unwraps the underscores (_) from around the parameter names when matching

      scope = $rootScope.$new();

      location = $location;
      controller = $controller;
      firebaseArray = $firebaseArray;
      sce = $sce;
      localStorage = $localStorage;
      window = $window;
    }));

    describe('TodoCtrl Testing', function() {
		
      it('calculateTimestamp', function() {
        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location,
          $firebaseArray: firebaseArray,
          $sce: sce,
          $localStorage: localStorage,
          $window: window
        });
		
		// Unix Time format
		// seconds in a minute: 60
		// seconds in an hour: 3600
		// seconds in a day: 86400
		// seconds in a week: 604800
		// seconds in a month: 2629743 (30.44 days)
		// seconds in a year: 31556926 (365.24 days)

		var current_time = new Date().getTime();
		//current_time = ~~(current_time/1); // Convert to integer with bitwise double-NOT.
		var test_time = current_time;
		var timestamp_string = "";
		
		var invalid_time = current_time + 1000000; // This will cause the timestamp to be in the future compared to current_time.
		timestamp_string = scope.calculateTimestamp(invalid_time);
		expect(timestamp_string).toEqual("1 second"); // Error-handling, default to "1 second ago".
		
		test_time = current_time;
        timestamp_string = scope.calculateTimestamp(test_time);
		expect(timestamp_string).toEqual("1 second");
		
		test_time = current_time - 2 * 1000;
		timestamp_string = scope.calculateTimestamp(test_time);
		expect(timestamp_string).toEqual("2 seconds");
		
		test_time = current_time - 13 * 1000;
		timestamp_string = scope.calculateTimestamp(test_time);
		expect(timestamp_string).toEqual("13 seconds");
		
		test_time = current_time - 44 * 1000;
		timestamp_string = scope.calculateTimestamp(test_time);
		expect(timestamp_string).toEqual("44 seconds");
		
		test_time = current_time - 60 * 1000;
		timestamp_string = scope.calculateTimestamp(test_time);
		expect(timestamp_string).toEqual("1 minute");
		
		test_time = current_time - 3 * 60 * 1000;
		timestamp_string = scope.calculateTimestamp(test_time);
		expect(timestamp_string).toEqual("3 minutes");
		
		test_time = current_time - 13 * 60 * 1000;
		timestamp_string = scope.calculateTimestamp(test_time);
		expect(timestamp_string).toEqual("13 minutes");
		
		test_time = current_time - 44 * 60 * 1000;
		timestamp_string = scope.calculateTimestamp(test_time);
		expect(timestamp_string).toEqual("44 minutes");
		
		test_time = current_time - 3600 * 1000;
		timestamp_string = scope.calculateTimestamp(test_time);
		expect(timestamp_string).toEqual("1 hour");
		
		test_time = current_time - 4 * 3600 * 1000;
		timestamp_string = scope.calculateTimestamp(test_time);
		expect(timestamp_string).toEqual("4 hours");
		
		test_time = current_time - 86400 * 1000;
		timestamp_string = scope.calculateTimestamp(test_time);
		expect(timestamp_string).toEqual("1 day");
		
		test_time = current_time - 5 * 86400 * 1000;
		timestamp_string = scope.calculateTimestamp(test_time);
		expect(timestamp_string).toEqual("5 days");
		
		test_time = current_time - 604800 * 1000;
		timestamp_string = scope.calculateTimestamp(test_time);
		expect(timestamp_string).toEqual("1 week");
		
		test_time = current_time - 2 * 604800 * 1000;
		timestamp_string = scope.calculateTimestamp(test_time);
		expect(timestamp_string).toEqual("2 weeks");
		
		test_time = current_time - 2629743 * 1000;
		timestamp_string = scope.calculateTimestamp(test_time);
		expect(timestamp_string).toEqual("1 month");
		
		test_time = current_time - 2 * 2629743 * 1000;
		timestamp_string = scope.calculateTimestamp(test_time);
		expect(timestamp_string).toEqual("2 months");
		
		test_time = current_time - 11 * 2629743 * 1000;
		timestamp_string = scope.calculateTimestamp(test_time);
		expect(timestamp_string).toEqual("11 months");
		
		test_time = current_time - 31556926 * 1000;
		timestamp_string = scope.calculateTimestamp(test_time);
		expect(timestamp_string).toEqual("1 year");
		
		test_time = current_time - 7 * 31556926 * 1000;
		timestamp_string = scope.calculateTimestamp(test_time);
		expect(timestamp_string).toEqual("7 years");
		
		test_time = current_time - 13 * 31556926 * 1000;
		timestamp_string = scope.calculateTimestamp(test_time);
		expect(timestamp_string).toEqual("13 years");
		
		test_time = current_time - 44 * 31556926 * 1000;
		timestamp_string = scope.calculateTimestamp(test_time);
		expect(timestamp_string).toEqual("44 years");
      });
    });
  });
