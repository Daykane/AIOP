(function(window, angular, _){
    'use strict';

    function sanitizeEntitiesFilter() {
        return function(items){
            var distinctWikiTitles = [],
            distinctSurfaceForms = [],
            distinctEntities = [];

            if(items){
                items = items.filter(function(entity){
                    return (entity.position === 'summary' || entity.position === 'title') && entity['signal-type'] !== 'none' && entity['signal-type'] !== null;
                });

                items.filter(function(entity){
                    if(!_.contains(distinctWikiTitles, entity['wiki-title'])){

                        distinctWikiTitles.push(entity['wiki-title']);
                        distinctSurfaceForms.push(entity['surface-form']);
                        distinctEntities.push(entity);

                    } else if (distinctSurfaceForms[distinctWikiTitles.indexOf(entity['wiki-title'])].length < entity['surface-form'].length){

                        distinctWikiTitles[entity['wiki-title']] = entity['wiki-title'];
                        distinctEntities[_.findIndex(distinctEntities, {'wiki-title': entity['wiki-title'] })] = entity;
                        distinctSurfaceForms[distinctWikiTitles.indexOf(entity['wiki-title'])] = entity['surface-form'];
                    }
                });
            }

            return distinctEntities;
        };
    }

    angular.module('signal.helpers').filter('sanitizeEntities', sanitizeEntitiesFilter);
})(window, window.angular, window._);
