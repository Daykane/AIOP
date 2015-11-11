describe('Events', function(){
    'use strict';

    var Events,
        $q,
        $rootScope,
        Es,
        rfc4122,
        moment;

    beforeEach(function(){
        module('signal.domain.events');

        inject(function($injector){
            Events = $injector.get('Events');
            rfc4122 = $injector.get('rfc4122');
            moment = $injector.get('moment');
            Es = $injector.get('Es');
            $q = $injector.get('$q');
            $rootScope = $injector.get('$rootScope');
        });
    });

    it('should be able to log an event', function(){
        var clock = sinon.useFakeTimers(new Date().getTime());
        sinon.stub(Es, 'index').returns($q.when('event_logged'));
        sinon.stub(rfc4122, 'v4').returns('uuid');

        Events.log('type', 'details').then(function(response){
            expect(response).to.equal('event_logged');
        });
        $rootScope.$apply();

        assert.isTrue(Es.index.calledWith({
            type: 'event',
            index: 'events',
            id: 'uuid',
            body: {
                system: 'ui',
                type: 'type',
                timestamp: moment(),
                details: 'details'
            }
        }));

        clock.restore();
    });

});
