describe('loginController', function(){
    'use strict';

    var $scope, $q, $state, loginController, Users;

    describe('with no auth token present', function(){
        beforeEach(function(){
            module('signal.views.login');

            inject(function($injector){
                var $rootScope = $injector.get('$rootScope'),
                    $controller = $injector.get('$controller');

                $state = $injector.get('$state');
                $q = $injector.get('$q');
                Users = $injector.get('Users');

                $scope = $rootScope.$new();

                function createController(){
                    return $controller('loginController', {
                        '$scope': $scope
                    });
                }

                sinon.stub($state, 'go');
                sinon.stub(Users, 'getCurrent').returns($q.reject());

                loginController = createController();
                $scope.$apply();
            });
        });

        it('it should hold the credentials of the user', function(){
            expect(loginController.credentials).to.eql({
                email: '',
                password: ''
            });
        });

        it('it should record the user as logout if he does not have any authToken on initialisation', function(){
            assert(Users.getCurrent.called, 'should check if the token exist');
            assert(loginController.isLogout, 'user recorded as logout');
        });

        it('it should save if remember me has been checked or not (default should be checked)', function(){
            expect(loginController.rememberMe).to.equal(true);
        });

        it('it should save the status of the login form (default to ok)', function(){
            expect(loginController.status).to.equal('ok');
        });

        it('it should be able to login if credentials are filled and correct', function(){
            sinon.stub(Users, 'setCurrent').returns($q.when());
            loginController.credentials.email = 'test';
            loginController.credentials.password = 'test';

            loginController.login();

            $scope.$apply();
            assert($state.go.calledWith('root.insight'), 'should go to the homepage');
            Users.setCurrent.restore();
        });

        it('should not be able to login if credentials are empty and display an invalid credentials message', function(){
            loginController.login();
            expect(loginController.status).to.equal('invalidCredentials');
        });

        it('it should not be able to login if credentials are filled and incorrect and display an invalid credentials message', function(){
            sinon.stub(Users, 'setCurrent').returns($q.reject({
                status: 401
            }));
            loginController.credentials.email = 'test';
            loginController.credentials.password = 'test';

            loginController.login();

            $scope.$apply();
            expect(loginController.status).to.equal('invalidCredentials');
            Users.setCurrent.restore();
        });

        it('should not be able to login if credentials are filled but there is a server error and display a server error message', function(){
            sinon.stub(Users, 'setCurrent').returns($q.reject({
                status: 500
            }));
            loginController.credentials.email = 'test';
            loginController.credentials.password = 'test';

            loginController.login();

            $scope.$apply();
            expect(loginController.status).to.equal('error');
            Users.setCurrent.restore();
        });
    });

    describe('with auth token present', function(){
        beforeEach(function(){
            module('signal.views.login');

            inject(function($injector){
                var $rootScope = $injector.get('$rootScope'),
                    $controller = $injector.get('$controller');

                $state = $injector.get('$state');
                $q = $injector.get('$q');
                Users = $injector.get('Users');

                $scope = $rootScope.$new();

                function createController(){
                    return $controller('loginController', {
                        '$scope': $scope
                    });
                }

                sinon.stub($state, 'go');
                sinon.stub(Users, 'getCurrent').returns($q.when());

                loginController = createController();
            });
        });

        it('it should redirect to home if the auth token is valid', function(){
            assert(Users.getCurrent.called, 'should check if current user exist');
            $scope.$apply();
            assert($state.go.calledWith('root.insight'), 'should go to the homepage');
            assert(!loginController.isLogout, 'user recorded as logged in');
        });
    });
});
