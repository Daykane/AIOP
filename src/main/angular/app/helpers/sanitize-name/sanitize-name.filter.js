(function(window, angular){
    'use strict';

    function sanitizeName() {
        return function(name) {
            var lowercaseName = name.toLowerCase().replace(/\./g, ' '),
                chunks = lowercaseName.split(' ');

            return chunks.map(function(word){
                return word.charAt(0).toUpperCase() + word.substring(1);
            }).join(' ');
        };
    }

    angular.module('signal.helpers').filter('sanitizeName', sanitizeName);
})(window, window.angular);
