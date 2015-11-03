/*global todomvc */
'use strict';

/**
<<<<<<< HEAD
 * Directive that executes an expression when the element it is applied to loses focus
 */
=======
* Directive that executes an expression when the element it is applied to loses focus
*/
>>>>>>> clean
todomvc.directive('todoBlur', function () {
	return function (scope, elem, attrs) {
		elem.bind('blur', function () {
			scope.$apply(attrs.todoBlur);
		});

		scope.$on('$destroy', function () {
			elem.unbind('blur');
		});
	};
});
