//TODO

(function(window, angular, _){
    'use strict';

    function navigationService($state){
        // Private variables

        // Private functions
        function activate(){}

        function reset(){}

        function goToMyActivities(){
            $state.go('root.myActivities');
            console.log("hello my activities");
        }

        function goToStore(){
            $state.go('root.store');
            console.log("hello store");
        }

        function goToBasket(){
            $state.go('root.basket');
            console.log("hello basket");
        }

        function goToUsers(){
            $state.go('root.management.users');
            console.log("hello users");
        }

        function goToActivities(){
            $state.go('root.management.activities');
            console.log("hello activities");
        }

        function goToProducts(){
            $state.go('root.management.products');
            console.log("hello products");
        }

        function goToRooms(){
            $state.go('root.management.rooms');
            console.log("hello rooms");
        }

        function goToAccessories(){
            $state.go('root.management.accessories');
            console.log("hello accessories");
        }
        

        // Public
        return {
            activate: activate,
            reset: reset,
            goToStore: goToStore,
            goToMyActivities: goToMyActivities,
            goToBasket: goToBasket,
            goToAccessories: goToAccessories,
            goToUsers: goToUsers,
            goToProducts: goToProducts,
            goToRooms: goToRooms,
            goToActivities: goToActivities
        };
    }
    navigationService.$inject = ['$state'];

    angular.module('zen.components.navigation')
    .factory('navigationService', navigationService);

})(window, window.angular, window._);
