describe('sanitizeName', function() {
    'use strict';

    var sanitizeNameFilter;

    beforeEach(function(){
       module('signal.helpers');

       inject(function($injector){
            sanitizeNameFilter = $injector.get('sanitizeNameFilter');
       });
    });


    it('should convert the name to lowercase and replace every dot by a space', function(){
        expect(sanitizeNameFilter('HOMER.SIMpson')).to.equal('Homer Simpson');
    });
});
