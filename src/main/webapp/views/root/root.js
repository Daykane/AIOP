(function(window, angular){
    'use strict';

    function rootConfig($stateProvider){
        $stateProvider.state('root', {
            abstract: true,
            templateUrl: 'views/root/root.html',
            controller: 'rootController as rootView'
        });
    }
    rootConfig.$inject = ['$stateProvider'];
	
	function rootRun(){
    }

    function rootController(){
        // Private variables

        // Private methods

        // Public variables

        // Public methods

        // Initialization
    }

    angular.module('zen.views.root', [
        'ui.router',
        'zen.components.navigation',
    ])
    .config(rootConfig)
	.run(rootRun)
    .controller('rootController', rootController);

})(window, window.angular);
