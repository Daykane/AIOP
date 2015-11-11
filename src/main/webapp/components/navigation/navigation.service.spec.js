describe('navigationService', function(){
    'use strict';

   var $q, $rootScope, $state, navigationService, userStateService;

   beforeEach(function(){
       module('signal.components.navigation');

       inject(function($injector){
            $state = $injector.get('$state');
            $q = $injector.get('$q');
            $rootScope = $injector.get('$rootScope');
            navigationService = $injector.get('navigationService');
            userStateService = $injector.get('userStateService');

            sinon.stub($state, 'includes').returns(true);
            sinon.stub(userStateService, 'hasRole').returns(true);
       });
   });

   afterEach(function(){
        $state.includes.restore();
        userStateService.hasRole.restore();
   });

   it('on initialisation should do nothing', function(){
        navigationService.activate();
   });

   it('should tell if the current user has a specific role', function(){
        assert.isTrue(navigationService.userHasRole('admin'));
        assert.isTrue(userStateService.hasRole.calledWith('admin'));
   });

   it('on reset it should do nothing', function(){
        navigationService.reset();
   });

   it('should add  a simple item  - with state - to the menu', function() {

        var mockItem = {
                label: 'someLabel',
                icon: 'someIcon',
                state: 'someState'
        };
        navigationService.addItem(mockItem);

        assert(navigationService.items.length, 1);
        expect(navigationService.items[0]).to.equal(mockItem);

    });


   it('should add an advanced item -  with subitems - to the menu', function(){

        var mockItem = {
                label: 'someLabel',
                icon: 'someIcon',
                state: 'someState',
                subItems: 'subItems'
        };

        navigationService.addItem(mockItem);

        assert(navigationService.items.length, 1);
        expect(navigationService.items[0]).to.equal(mockItem);


   });

    it('should add an advanced item -  with a function to generate sub items - to the menu', function(){
        var mockItem = {
            label: 'someLabel',
            icon: 'someIcon',
            state: 'someState',
            buildSubItems: function(){}
        };

        navigationService.addItem(mockItem);

        assert(navigationService.items.length, 1);
        expect(navigationService.items[0]).to.equal(mockItem);
   });

   it('should only add an item to the menu with these required properties - label, icon and state', function(){

        navigationService.addItem({label: 'someLabel', state: 'someState'});
        assert.equal(navigationService.items.length, 0, 'added an item with a missing icon');

        navigationService.addItem({icon: 'someIcon', state: 'someState'});
        assert.equal(navigationService.items.length, 0, 'added an item with a missing label');

        navigationService.addItem({icon: 'someIcon', label: 'someLabel'});
        assert.equal(navigationService.items.length, 0, 'added an item with a missing state');

    });

    it('should only add an item with a buildSubItems properties defined with a function', function () {

        navigationService.addItem({label: 'someLabel', icon: 'someIcon', state: 'someState', buildSubItems: 'someState'});
        assert.equal(navigationService.items.length, 0, 'added an item with a buildSubItems property being a string');

    });

    it('should be able to get a specific item', function(){
        navigationService.addItem({
                label: 'someLabel',
                icon: 'someIcon',
                state: 'someState',
                subItems: 'subItems'
        });
        expect(navigationService.getItem('someState')).to.eql({
                label: 'someLabel',
                icon: 'someIcon',
                state: 'someState',
                subItems: 'subItems'
        });
    });

    it('should be able to select a simple navigation item', function(){
        var mockItem = {
            label: 'label',
            icon: 'icon'
        };

        navigationService.selectItem(mockItem);
        expect(navigationService.selectedItem).to.eql(mockItem);
    });

    it('should be able to select an advanced navigation item and build its sub-navigation', function(){
        var mockItem = {
            label: 'label',
            icon: 'icon',
            buildSubItems: function(){
                return $q.when('sub navigation');
            }
        };

        navigationService.selectItem(mockItem);
        $rootScope.$apply();

        expect(navigationService.selectedItem).to.eql(mockItem);
        expect(navigationService.selectedItem.subItems).to.equal('sub navigation');
    });

    it('should be able to tell if an item is active or not', function(){
        var mockItem = {
            label: 'label',
            icon: 'icon',
            state: 'state'
        };

        assert(navigationService.isActive(mockItem), 'should return true');
        assert($state.includes.calledWith('state'), 'should have been called with item state');
    });

});
