(function(window, angular){
    'use strict';

    function dayTimeFormat() {
        return function(value) {
            var result = null,
            timemap = { '100': '1am', '200': '2am', '300': '3am', '400': '4am',
                '500': '5am', '600': '6am', '700': '7am', '800': '8am', '900': '9am',
                '1000': '10am', '1100': '11am', '1200': '12pm', '1300': '1pm', '1400': '2pm',
                '1500': '3pm', '1600': '4pm', '1700': '5pm', '1800': '6pm', '1900': '7pm',
                '2000': '8pm', '2100': '9pm', '2200': '10pm', '2300': '11pm', '0000': '12pm',
                'monday': 'Monday', 'tuesday': 'Tuesday', 'wednesday': 'Wednesday',
                'thursday': 'Thursday', 'friday': 'Friday', 'saturday': 'Saturday', 'sunday': 'Sunday'
            };

            result = timemap[value];

            return result;
        };
    }

    angular.module('signal.helpers').filter('dayTimeFormat', dayTimeFormat);
})(window, window.angular);
