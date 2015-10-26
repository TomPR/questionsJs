'use strict';

describe('sorting the list of users', function() {
  it('sorts in descending order by default', function() {
    var users = ['jack', 'igor', 'jeff'];
    //    var sorted = sortUsers(users);
    //    expect(sorted).toEqual(['jeff', 'jack', 'igor']);
  });
});

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
		
      it('setFirstAndRestSentence', function() {
        var ctrl = controller('TodoCtrl', {
          $scope: scope
        });

        var testInputs = [
          {str:"Hello? This is Sung", exp: "Hello?"},
          {str:"Hello.co? This is Sung", exp: "Hello.co?"},
          {str:"Hello.co This is Sung", exp: "Hello.co This is Sung"},
          {str:"Hello.co \nThis is Sung", exp: "Hello.co \n"},

          {str:"Hello?? This is Bing. Yen", exp: "Hello??"},
        ];

        for (var i in testInputs) {
          var results = scope.getFirstAndRestSentence(testInputs[i].str);
          expect(results[0]).toEqual(testInputs[i].exp);
        }
      });
	  
	  it('addTodo', function() {
        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location,
          $firebaseArray: firebaseArray,
          $sce: sce,
          $localStorage: localStorage,
          $window: window
        });

		scope.todos = [
		{
			wholeMsg: "Help?",
			head: "Help?",
			headLastChar: '?',
			desc: "",
			linkedDesc: "",
			completed: false,
			timestamp: new Date().getTime(),
			tags: "...",
			echo: 0,
			order: 0
		}];
		scope.todos.$add = function(todo) {scope.todos[scope.todos.length] = todo};
		
		scope.input = {};
		scope.input.wholeMsg = "";
		scope.addTodo();
		
		scope.input.wholeMsg = "Hello?";
        scope.addTodo();
		expect(scope.input.wholeMsg).toEqual('');
      });

	  it('editTodo', function() {
        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location,
          $firebaseArray: firebaseArray,
          $sce: sce,
          $localStorage: localStorage,
          $window: window
        });

		var testTodo = {
			wholeMsg: "Hello?",
			head: "Hello?",
			headLastChar: '?',
			desc: "",
			linkedDesc: "",
			completed: false,
			timestamp: 1442770322624,
			tags: "...",
			echo: 0,
			order: 0
		};
		
		scope.editTodo(testTodo);
		expect(scope.editedTodo).toEqual(testTodo);
		expect(scope.originalTodo).toEqual(angular.extend({}, testTodo));
      });
	  
	  it('addEcho', function() {
        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location,
          $firebaseArray: firebaseArray,
          $sce: sce,
          $localStorage: localStorage,
          $window: window
        });

		var testTodo = {
			wholeMsg: "Hello?",
			head: "Hello?",
			headLastChar: '?',
			desc: "",
			linkedDesc: "",
			completed: false,
			timestamp: 1442770322624,
			tags: "...",
			echo: 0,
			order: 0
		};
		
		scope.todos = [
		{
			wholeMsg: "Help?",
			head: "Help?",
			headLastChar: '?',
			desc: "",
			linkedDesc: "",
			completed: false,
			timestamp: new Date().getTime(),
			tags: "...",
			echo: 0,
			order: 0
		}];
		scope.todos.$save = function(todo) {scope.todos[scope.todos.length] = todo};
		
		scope.addEcho(testTodo);
		expect(scope.editedTodo).toEqual(testTodo);
      });
	  
	  it('doneEditing', function() {
        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location,
          $firebaseArray: firebaseArray,
          $sce: sce,
          $localStorage: localStorage,
          $window: window
        });
		
		scope.todos = [
		{
			wholeMsg: "Help?",
			head: "Help?",
			headLastChar: '?',
			desc: "",
			linkedDesc: "",
			completed: false,
			timestamp: new Date().getTime(),
			tags: "...",
			echo: 0,
			order: 0
		}];
		scope.todos.$save = function(todo) {scope.todos[scope.todos.length] = todo};
		scope.todos.$remove = function() {};

		var testTodo = {
			wholeMsg: "Hello?",
			head: "Hello?",
			headLastChar: '?',
			desc: "",
			linkedDesc: "",
			completed: false,
			timestamp: 1442770322624,
			tags: "...",
			echo: 0,
			order: 0
		};
		
		scope.doneEditing(testTodo);
		expect(scope.editedTodo).toEqual(null);
		
		var testTodo2 = {
			wholeMsg: "",
			head: "",
			headLastChar: '',
			desc: "",
			linkedDesc: "",
			completed: false,
			timestamp: 1442770322624,
			tags: "...",
			echo: 0,
			order: 0
		};
		
		scope.doneEditing(testTodo2);
		expect(scope.editedTodo).toEqual(null);
      });
	  
	  it('revertEditing', function() {
        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location,
          $firebaseArray: firebaseArray,
          $sce: sce,
          $localStorage: localStorage,
          $window: window
        });
		
		scope.todos = [
		{
			wholeMsg: "Help?",
			head: "Help?",
			headLastChar: '?',
			desc: "",
			linkedDesc: "",
			completed: false,
			timestamp: new Date().getTime(),
			tags: "...",
			echo: 0,
			order: 0
		}];
		scope.todos.$save = function(todo) {scope.todos[scope.todos.length] = todo};
		scope.todos.$remove = function() {};

		var testTodo = {
			wholeMsg: "Help?",
			head: "Help?",
			headLastChar: '?',
			desc: "",
			linkedDesc: "",
			completed: false,
			timestamp: 1442770322624,
			tags: "...",
			echo: 0,
			order: 0
		};
		
		scope.originalTodo = {
			wholeMsg: "Hello?",
			head: "Hello?",
			headLastChar: '?',
			desc: "",
			linkedDesc: "",
			completed: false,
			timestamp: 1442770322624,
			tags: "...",
			echo: 0,
			order: 0
		};
		
		scope.revertEditing(testTodo);
      });
	  
	  it('clearCompletedTodos', function() {
        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location,
          $firebaseArray: firebaseArray,
          $sce: sce,
          $localStorage: localStorage,
          $window: window
        });
		
		scope.todos = [
		{
			wholeMsg: "Help?",
			head: "Help?",
			headLastChar: '?',
			desc: "",
			linkedDesc: "",
			completed: false,
			timestamp: new Date().getTime(),
			tags: "...",
			echo: 0,
			order: 0
		},
		{
			wholeMsg: "Clear?",
			head: "Clear?",
			headLastChar: '?',
			desc: "",
			linkedDesc: "",
			completed: true,
			timestamp: new Date().getTime(),
			tags: "...",
			echo: 0,
			order: 0
		}];
		
		scope.todos.$remove = function() {};
		
		scope.todos[5] = {
			wholeMsg: "Help??",
			head: false,
			headLastChar: '?',
			desc: "",
			linkedDesc: "",
			completed: false,
			timestamp: new Date().getTime(),
			tags: "...",
			echo: 0,
			order: 0
		};
		
		var testTodo = {
			wholeMsg: "Help?",
			head: "Help?",
			headLastChar: '?',
			desc: "",
			linkedDesc: "",
			completed: false,
			timestamp: new Date().getTime(),
			tags: "...",
			echo: 0,
			order: 0
		};
		
		scope.clearCompletedTodos();
      });
	  
	  it('removeTodo', function() {
        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location,
          $firebaseArray: firebaseArray,
          $sce: sce,
          $localStorage: localStorage,
          $window: window
        });
		
		scope.todos = [
		{
			wholeMsg: "Help?",
			head: "Help?",
			headLastChar: '?',
			desc: "",
			linkedDesc: "",
			completed: false,
			timestamp: new Date().getTime(),
			tags: "...",
			echo: 0,
			order: 0
		}];
		
		scope.todos.$remove = function() {};
      });
	  
	  it('markAll', function() {
        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location,
          $firebaseArray: firebaseArray,
          $sce: sce,
          $localStorage: localStorage,
          $window: window
        });
		
		scope.todos = [
		{
			wholeMsg: "Help?",
			head: "Help?",
			headLastChar: '?',
			desc: "",
			linkedDesc: "",
			completed: false,
			timestamp: new Date().getTime(),
			tags: "...",
			echo: 0,
			order: 0
		}];
		scope.todos.$save = function(todo) {scope.todos[scope.todos.length] = todo};
		
		scope.markAll(true);
      });
	  
	  it('toggleCompleted', function() {
        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location,
          $firebaseArray: firebaseArray,
          $sce: sce,
          $localStorage: localStorage,
          $window: window
        });
		
		scope.todos = [
		{
			wholeMsg: "Help?",
			head: "Help?",
			headLastChar: '?',
			desc: "",
			linkedDesc: "",
			completed: false,
			timestamp: new Date().getTime(),
			tags: "...",
			echo: 0,
			order: 0
		}];
		scope.todos.$save = function(todo) {scope.todos[scope.todos.length] = todo};
		
		var testTodo = {
			wholeMsg: "Help?",
			head: "Help?",
			headLastChar: '?',
			desc: "",
			linkedDesc: "",
			completed: false,
			timestamp: new Date().getTime(),
			tags: "...",
			echo: 0,
			order: 0
		};
		
		scope.toggleCompleted(testTodo);
      });
	  
	  it('FBLoginLogout', function() {
        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location,
          $firebaseArray: firebaseArray,
          $sce: sce,
          $localStorage: localStorage,
          $window: window
        });
		
		scope.FBLogin();
		scope.FBLogout();
      });
	  
	  it('increaseMax', function() {
        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location,
          $firebaseArray: firebaseArray,
          $sce: sce,
          $localStorage: localStorage,
          $window: window
        });
		
		var scrollCountDelta = 10;
		scope.maxQuestion = 1;
		scope.totalCount = 2;
		scope.increaseMax();
		expect(scope.maxQuestion).toEqual(1 + scrollCountDelta);
      });
	  
	  it('autoscroll', function() {
        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location,
          $firebaseArray: firebaseArray,
          $sce: sce,
          $localStorage: localStorage,
          $window: window
        });
		
		var scrollEvent = document.createEvent('CustomEvent');
		scrollEvent.initCustomEvent('scroll', false, false, null);
		window.document.body.style.minHeight = '9000px';
		window.document.body.style.minWidth = '9000px';
		//window.document.body.offsetHeight = '500px';
		window.scrollTo(0,10000);
		window.dispatchEvent( scrollEvent );
		scope.$apply();
		scope.$digest();
		
		//window.innerHeight = 10;
		//window.scrollY = 10;
		//window.document.body.offsetHeight = 10;
		expect(window.document.body.offsetHeight).toEqual(9000);
		expect(window.innerHeight + window.scrollY >= window.document.body.offsetHeight).toBeTruthy;
		//window.scrollY = 0;
      });
	  
      it('RoomId', function() {
        location.path('/new/path');

        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location
        });

        expect(scope.roomId).toBe("new");
      });

      it('toTop Testing', function() {

        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location,
          $firebaseArray: firebaseArray,
          $sce: sce,
          $localStorage: localStorage,
          $window: window
        });

        scope.toTop();
        expect(window.scrollX).toBe(0);
        expect(window.scrollY).toBe(0);
      });
    });
  });
