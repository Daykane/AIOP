(function(window, angular){
    'use strict';

    function myActivitiesConfig($stateProvider){
        $stateProvider.state('root.management.myActivities', {
            url: '/',
            templateUrl: 'states/root.my-activities/my-activities.html',
            controller: 'myActivitiesController as myActivitiesState'
        });
    }
    myActivitiesConfig.$inject = ['$stateProvider'];

    function myActivitiesRun (){}

    function myActivitiesController(){
        // Private variables

        // Private methods

        // Public variables

        // Public methods

        // Init
    }

    angular.module('zen.states.myActivities', [
        'zen.states.root',
        'zen.services'
    ])
    .config(myActivitiesConfig)
    .run(myActivitiesRun)
    .controller('myActivitiesController', myActivitiesController);

})(window, window.angular);
