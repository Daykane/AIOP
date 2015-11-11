(function(window, angular){
    'use strict';

    function numberCap(){
        return function (val) {
            var number = val;
            if(number >= 1000 && number < 1000000) {
                number = '+' + Math.floor(number / 1000) + 'k';
            } else if(number >= 1000000) {
                number = '+' + Math.floor(number / 1000000) + 'm';
            }

            return number;
        };
    }

    angular.module('signal.helpers').filter('numberCap', numberCap);
})(window, window.angular);
