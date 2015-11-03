/*global todomvc */
'use strict';

/**
<<<<<<< HEAD
 * Directive that executes an expression when the element it is applied to gets
 * an `escape` keydown event.
 */
=======
* Directive that executes an expression when the element it is applied to gets
* an `escape` keydown event.
*/
>>>>>>> clean
todomvc.directive('todoBlur', function () {
	var ESCAPE_KEY = 27;
	return function (scope, elem, attrs) {
		elem.bind('keydown', function (event) {
			if (event.keyCode === ESCAPE_KEY) {
				scope.$apply(attrs.todoEscape);
			}
		});

		scope.$on('$destroy', function () {
			elem.unbind('keydown');
		});
	};
});
