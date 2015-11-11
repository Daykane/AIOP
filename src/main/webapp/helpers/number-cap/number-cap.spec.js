describe('numberCap', function(){
    'use strict';

    var numberCap;

    beforeEach(function(){
        module('signal.helpers');

        inject(function($injector){
            numberCap = $injector.get('numberCapFilter');
        });
    });

    it('should format numbers over a million', function () {
        assert.equal(numberCap(1900000), '+1m');
        assert.equal(numberCap(2900000), '+2m');
        assert.equal(numberCap(11900000), '+11m');
    });

    it('should format numbers over a thousand', function () {
        assert.equal(numberCap(190000), '+190k');
        assert.equal(numberCap(5000), '+5k');
        assert.equal(numberCap(999), '999');
    });

});
