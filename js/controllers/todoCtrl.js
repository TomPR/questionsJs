/*global todomvc, angular, Firebase */
'use strict';

/**
<<<<<<< HEAD
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the $firebaseArray service
 * - exposes the model to the template and provides event handlers
 */
todomvc.controller('TodoCtrl', function TodoCtrl($scope, $location, $firebaseArray, $sce) {
	var url = 'https://vecho.firebaseio.com/echo';
	var echoRef = new Firebase(url);

  var maxEcho = 10000000000; // enough to put me in the #1 position!

	// Bind the todos to the firebase provider.
	//$scope.todos = $firebaseArray(fireRef);

//  echoRef.child("echo").setWithPriority( maxEcho, -maxEcho );

	var query = echoRef.orderByChild("echo").limitToFirst(25);
  //var query = echoRef.orderByPriority().limitToFirst(25);

	$scope.todos = $firebaseArray(query);

	$scope.newTodo = '';
	$scope.editedTodo = null;

	$scope.$watch('todos', function () {
		var total = 0;
		var remaining = 0;
		$scope.todos.forEach(function (todo) {
			// Skip invalid entries so they don't break the entire app.
			if (!todo || !todo.head) {
				return;
			}

			total++;
			if (todo.completed === false) {
				remaining++;
			}

			// set time
			todo.dateString = new Date(todo.timestamp).toString();
			todo.tags = todo.wholeMsg.match(/#\w+/g);

			 todo.trustedDesc = $sce.trustAsHtml(todo.linkedDesc);
		});
		$scope.totalCount = total;
		$scope.remainingCount = remaining;
		$scope.completedCount = total - remaining;
		$scope.allChecked = remaining === 0;
	}, true);

	$scope.addTodo = function () {
		var newTodo = $scope.newTodo.trim();

		// No input, so just do nothing
		if (!newTodo.length) {
			return;
		}

		var head = newTodo;
		var desc = "";


		var firstCRPos = newTodo.indexOf('\n');
		if (firstCRPos != -1) {
			head = newTodo.slice(0, firstCRPos);
			desc = newTodo.slice(firstCRPos);
		}

		$scope.todos.$add({
			wholeMsg: newTodo,
			head: head,
			desc: desc,
			linkedDesc: Autolinker.link(desc, {newWindow: false, stripPrefix: false}),
			completed: false,
			timestamp: new Date().getTime(),
			tags: "...",
			echo: 0
		});
		$scope.newTodo = '';
	};

	$scope.editTodo = function (todo) {
		$scope.editedTodo = todo;
		$scope.originalTodo = angular.extend({}, $scope.editedTodo);
	};

	$scope.addEcho = function (todo) {
		$scope.editedTodo = todo;
		todo.echo = todo.echo+1;
		$scope.todos.$save(todo);
	};

	$scope.doneEditing = function (todo) {
		$scope.editedTodo = null;
		var wholeMsg = todo.wholeMsg.trim();
		if (wholeMsg) {
			$scope.todos.$save(todo);
		} else {
			$scope.removeTodo(todo);
		}
	};

	$scope.revertEditing = function (todo) {
		todo.wholeMsg = $scope.originalTodo.wholeMsg;
		$scope.doneEditing(todo);
	};

	$scope.removeTodo = function (todo) {
		$scope.todos.$remove(todo);
	};

	$scope.clearCompletedTodos = function () {
		$scope.todos.forEach(function (todo) {
			if (todo.completed) {
				$scope.removeTodo(todo);
			}
		});
	};

	$scope.toggleCompleted = function (todo) {
			todo.completed = !todo.completed;
			$scope.todos.$save(todo);
	};

	$scope.markAll = function (allCompleted) {
		$scope.todos.forEach(function (todo) {
			todo.completed = allCompleted;
			$scope.todos.$save(todo);
		});
	};

	if ($location.path() === '') {
		$location.path('/');
	}
	$scope.location = $location;
});
=======
* The main controller for the app. The controller:
* - retrieves and persists the model via the $firebaseArray service
* - exposes the model to the template and provides event handlers
*/
var images = "";

todomvc.controller('TodoCtrl',
['$scope', '$location', '$firebaseArray', '$sce', '$localStorage', '$window',
function ($scope, $location, $firebaseArray, $sce, $localStorage, $window) {
	// set local storage
	$scope.$storage = $localStorage;

	var scrollCountDelta = 10;
	$scope.maxQuestion = scrollCountDelta;

	/*
	$(window).scroll(function(){
	if($(window).scrollTop() > 0) {
	$("#btn_top").show();
} else {
$("#btn_top").hide();
}
});
*/
var splits = $location.path().trim().split("/");
var roomId = angular.lowercase(splits[1]);
if (!roomId || roomId.length === 0) {
	roomId = "all";
}

// TODO: Please change this URL for your app
//var firebaseURL = "https://classquestion.firebaseio.com/";
var firebaseURL = "https://comp3111-goodkarma.firebaseio.com/";

$scope.roomId = roomId;
var url = firebaseURL + roomId + "/questions/";
var echoRef = new Firebase(url);

var query = echoRef.orderByChild("order");
// Should we limit?
//.limitToFirst(1000);
$scope.todos = $firebaseArray(query);

//$scope.input.wholeMsg = '';
$scope.editedTodo = null;

// pre-precessing for collection
$scope.$watchCollection('todos', function () {
	var total = 0;
	var remaining = 0;
	$scope.todos.forEach(function (todo) {
		// Skip invalid entries so they don't break the entire app.
		if (!todo || !todo.head ) {
			return;
		}

		total++;
		if (todo.completed === false) {
			remaining++;
		}

		// set time - original
		//todo.dateString = new Date(todo.timestamp).toString();

		/* display time in terms of "how long ago". Note: AngularJs generates timestamp in terms of milliseconds. */
		// Get difference between current time and message timestamp in seconds
		var current_time = new Date().getTime();
		var timediff_sec_original = ~~((current_time - todo.timestamp)/1000); // ~~ is double bitwise NOT, a quick way to convert the answer to integer.
		var timediff_sec = timediff_sec_original;
		if (timediff_sec == 0)
		{
			timediff_sec += 1; // Minimum of 1 second, so won't display "Posted 0 seconds ago", and easier to for-loop the code.
		}

		// Parse the results and store in a todo.dateString; skeleton code passes it to questions.html for display.
		// Unix Time format
		// seconds in a minute: 60
		// seconds in an hour: 3600
		// seconds in a day: 86400
		// seconds in a week: 604800
		// seconds in a month: 2629743 (30.44 days)
		// seconds in a year: 31556926 (365.24 days)
		var unix_time_unit = [31556926, 2629743, 604800, 86400, 3600, 60, 1];
		var timeword = ["year", "month", "week", "day", "hour", "minute", "second"];

		// Get number of years, months, weeks, days, hours, minutes, and seconds.
		todo.dateString = ""; // Original code passes todo.dateString to questions.html for display.
		for (var i = 0; i < 7; i++)
		{
			// Divide the time difference by unix_time_unit for numerator, then modulo for remainder.
			var time_numerator = ~~(timediff_sec / unix_time_unit[i]); // ~~ is double bitwise NOT, a quick way to convert the answer to integer.
			timediff_sec %= unix_time_unit[i];

			if (time_numerator > 0)
			{
				todo.dateString += time_numerator.toString() + " " + timeword[i]; // Javascript strings are mutable, concatentate with '+' operator.

				if (time_numerator > 1)
				{
					todo.dateString += "s"; // More than 1 unit, use plural by adding 's'. Coincidentally, no special cases for the timewords.
				}

				break;
			}
		}

		// Original
		todo.tags = todo.wholeMsg.match(/#\w+/g);

		todo.trustedDesc = $sce.trustAsHtml(todo.linkedDesc);
	});

	$scope.totalCount = total;
	$scope.remainingCount = remaining;
	$scope.completedCount = total - remaining;
	$scope.allChecked = remaining === 0;
	$scope.absurl = $location.absUrl();
}, true);

// Get the first sentence and rest
$scope.getFirstAndRestSentence = function($string) {
	var head = $string;
	var desc = "";

	var separators = [". ", "? ", "! ", '\n'];

	var firstIndex = -1;
	for (var i in separators) {
		var index = $string.indexOf(separators[i]);
		if (index == -1) continue;
		if (firstIndex == -1) {firstIndex = index; continue;}
		if (firstIndex > index) {firstIndex = index;}
	}

	if (firstIndex !=-1) {
		head = $string.slice(0, firstIndex+1);
		desc = $string.slice(firstIndex+1);
	}
	return [head, desc];
};

$scope.addTodo = function () {
	var newTodo = $scope.input.wholeMsg.trim();

	// No input, so just do nothing
	if (!newTodo.length) {
		return;
	}

	var firstAndLast = $scope.getFirstAndRestSentence(newTodo);
	var head = firstAndLast[0];
	var desc = images + firstAndLast[1];

	$scope.todos.$add({
		wholeMsg: newTodo,
		head: head,
		headLastChar: head.slice(-1),
		desc: desc,
		linkedDesc: Autolinker.link(desc, {newWindow: false, stripPrefix: false}),
		completed: false,
		timestamp: new Date().getTime(),
		tags: "...",
		echo: 0,
		order: 0
	});
	// remove the posted question in the input
	$scope.input.wholeMsg = '';
	images = "";
};

$scope.editTodo = function (todo) {
	$scope.editedTodo = todo;
	$scope.originalTodo = angular.extend({}, $scope.editedTodo);
};

$scope.addEcho = function (todo) {
	$scope.editedTodo = todo;
	todo.echo = todo.echo + 1;
	// Hack to order using this order.
	todo.order = todo.order -1;
	$scope.todos.$save(todo);

	// Disable the button
	$scope.$storage[todo.$id] = "echoed";
};

$scope.doneEditing = function (todo) {
	$scope.editedTodo = null;
	var wholeMsg = todo.wholeMsg.trim();
	if (wholeMsg) {
		$scope.todos.$save(todo);
	} else {
		$scope.removeTodo(todo);
	}
};

$scope.revertEditing = function (todo) {
	todo.wholeMsg = $scope.originalTodo.wholeMsg;
	$scope.doneEditing(todo);
};

$scope.removeTodo = function (todo) {
	$scope.todos.$remove(todo);
};

$scope.clearCompletedTodos = function () {
	$scope.todos.forEach(function (todo) {
		if (todo.completed) {
			$scope.removeTodo(todo);
		}
	});
};

$scope.toggleCompleted = function (todo) {
	todo.completed = !todo.completed;
	$scope.todos.$save(todo);
};

$scope.markAll = function (allCompleted) {
	$scope.todos.forEach(function (todo) {
		todo.completed = allCompleted;
		$scope.todos.$save(todo);
	});
};

$scope.FBLogin = function () {
	var ref = new Firebase(firebaseURL);
	ref.authWithOAuthPopup("facebook", function(error, authData) {
		if (error) {
			console.log("Login Failed!", error);
		} else {
			$scope.$apply(function() {
				$scope.$authData = authData;
				$scope.isAdmin = true;
			});
			console.log("Authenticated successfully with payload:", authData);
		}
	});
};

$scope.FBLogout = function () {
	var ref = new Firebase(firebaseURL);
	ref.unauth();
	delete $scope.$authData;
	$scope.isAdmin = false;
};

$scope.increaseMax = function () {
	if ($scope.maxQuestion < $scope.totalCount) {
		$scope.maxQuestion+=scrollCountDelta;
	}
};

$scope.toTop =function toTop() {
	$window.scrollTo(0,0);
};

// Not sure what is this code. Todel
if ($location.path() === '') {
	$location.path('/');
}
$scope.location = $location;

// autoscroll
angular.element($window).bind("scroll", function() {
	if ($window.innerHeight + $window.scrollY >= $window.document.body.offsetHeight) {
		console.log('Hit the bottom2. innerHeight' +
		$window.innerHeight + "scrollY" +
		$window.scrollY + "offsetHeight" + $window.document.body.offsetHeight);

		// update the max value
		$scope.increaseMax();

		// force to update the view (html)
		$scope.$apply();
	}
});

}]);
>>>>>>> clean
