(function(window, angular){
    'use strict';

    function activitiesConfig($stateProvider){
        $stateProvider.state('root.management.activities', {
            url: '/',
            templateUrl: 'states/root.management.activities/activities.html',
            controller: 'activitiesController as activitiesState'
        });
    }
    activitiesConfig.$inject = ['$stateProvider'];

    function activitiesRun (){
    }

    function activitiesController(){
        // Private variables

        // Private methods

        // Public variables

        // Public methods

        // Init
    }

    angular.module('zen.states.activities', [
        'zen.states.root',
        'zen.services'
    ])
    .config(activitiesConfig)
    .run(activitiesRun)
    .controller('activitiesController', activitiesController);

})(window, window.angular);
