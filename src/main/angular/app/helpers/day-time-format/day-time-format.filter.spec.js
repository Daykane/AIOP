describe('dayTimeFormat', function() {
    'use strict';

    var dayTimeFormatFilter;

    beforeEach(function(){
       module('signal.helpers');

       inject(function($injector){
            dayTimeFormatFilter = $injector.get('dayTimeFormatFilter');
       });
    });


    it('should convert 24 hour time format to it\'s 12 hour equivalent', function(){
        var time = '1000';
        expect(dayTimeFormatFilter(time)).to.eql('10am');
    });
});
