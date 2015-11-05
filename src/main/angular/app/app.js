(function(){
    'use strict';

    angular.module('zen.helpers');

    angular.module('zen.services', [
        'zen.helpers',
    ]);
    angular.module('zen.views', [
        'zen.views.login'
        //...
    ]);
    angular.module('zen', [
        'zen.views'
    ]);
})();
