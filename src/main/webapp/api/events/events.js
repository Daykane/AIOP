(function(window, angular){
    'use strict';

    function events(Es, rfc4122, moment){
        // Init

        // Private variables

        // Private methods
        function log(type, details){
            return Es.index({
                type: 'event',
                index: 'events',
                id: rfc4122.v4(),
                body: {
                    system: 'ui',
                    type: type,
                    timestamp: moment(),
                    details: details
                }
            });
        }


        // Public API
        return {
            log: log
        };
    }

    angular.module('signal.domain.events', [
            'angularMoment',
            'uuid',
            'signal.services'
        ]).factory('Events', events);
})(window, window.angular);
