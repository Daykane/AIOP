(function(window, angular, _){
    'use strict';

    function users($q, $cacheFactory, Restangular, Es, sha1, NewApiUrl, authService){
        // Init
        var usersCache = $cacheFactory('users'),
            usersResource = Restangular.one('users');

        // Private variables

        // Private methods
        function search(keyword, size, from){
            var urlParameters = {
                    size: size,
                    from: from
                },
                results = null;

            if(keyword){
                results = Restangular.one('users').post('search', {
                    query: keyword
                }, urlParameters);
            } else {
                results = usersResource.get(urlParameters);
            }

            return results;
        }

        function saveUser(user){
            var userResource;

            if(user.id){
                userResource = Restangular.one('users', user.id);
                _.merge(userResource, user);
                return userResource.put();
            } else {
                return usersResource.post('', user);
            }
        }

        function whoami(){
            return Restangular.one('whoami').get();
        }

        function setCurrent(email, password, rememberMe){

            if(!email || !password){
                throw 'Empty credentials';
            }

            authService.setToken(email, sha1.hash(password), rememberMe);

            return whoami().then(function(user){
                usersCache.put('current', user);
                return user;
            });
        }

        function getCurrent(){
            var currentUser;

            if(usersCache.get('current')){ // Current user cached

                currentUser = usersCache.get('current');

            } else{ // Cookie token with credentials
                currentUser = whoami().then(function(user){
                    usersCache.put('current', user);
                    return user;
                });
            }

            return $q.when(currentUser);
        }

        function saveCurrentUserFeeds(){
            return this.getCurrent().then(function(user){
                return Es.update({
                    index: 'users',
                    type: 'user',
                    id: user.id,
                    body: {
                        doc: {
                            feeds: user.feeds
                        }
                    }
                });
            });
        }

        function saveCurrentUserFolders(){
            return this.getCurrent().then(function(user){
                return Es.update({
                    index: 'users',
                    type: 'user',
                    id: user.id,
                    body: {
                        doc: {
                            folders: user.folders
                        }
                    }
                });
            });
        }

        function saveCurrentUserClippings(){
            return this.getCurrent().then(function(user){
                return Es.update({
                    index: 'users',
                    type: 'user',
                    id: user.id,
                    body: {
                        doc: {
                            'clipped-stories': user['clipped-stories']
                        }
                    }
                });
            });
        }

        function saveCurrentUserAlerts(){
            return this.getCurrent().then(function(user){
                return Es.update({
                    index: 'users',
                    type: 'user',
                    id: user.id,
                    body: {
                        doc: {
                            folders: user.folders,
                            feeds: user.feeds
                        }
                    }
                });
            });
        }

        function deleteUser(){
            return $q.reject('Feature not available');
        }

        function hasRole(user, role){
            return user && _.contains(user.roles, role);
        }

        function switchUser(user){
            usersCache.put('current', user);
        }

        function getCachedCurrentUser(){
            return usersCache.get('current');
        }

        // Public API
        return {
            search: search,
            saveUser: saveUser,
            setCurrent: setCurrent,
            getCurrent: getCurrent,
            saveCurrentUserFeeds: saveCurrentUserFeeds,
            saveCurrentUserFolders: saveCurrentUserFolders,
            saveCurrentUserClippings: saveCurrentUserClippings,
            saveCurrentUserAlerts: saveCurrentUserAlerts,
            deleteUser: deleteUser,
            hasRole: hasRole,
            switchUser: switchUser,
            getCachedCurrentUser: getCachedCurrentUser
        };
    }

    angular.module('signal.domain.users', [
            'restangular',
            'angular-sha1',
            'signal.core',
            'signal.services'
        ]).factory('Users', users);
})(window, window.angular, window._);
