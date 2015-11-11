describe('sanitizeEntities', function() {
    'use strict';

    var sanitizeEntitiesFilter;

    beforeEach(function(){
       module('signal.helpers');

       inject(function($injector){
            sanitizeEntitiesFilter = $injector.get('sanitizeEntitiesFilter');
        });
    });

    it('should extract surface-forms from a collection of entities with the same wiki-title', function() {
        var entities = [
            {
                position: 'summary',
                'surface-form': 'Larry Page',
                'wiki-title': 'Google'
            },
            {
                position: 'title',
                'surface-form': 'Google Ventures',
                'wiki-title': 'Google'
            }
        ];
        expect(sanitizeEntitiesFilter(entities)).to.eql([{
            position: 'title',
            'surface-form': 'Google Ventures',
            'wiki-title': 'Google'
        }]);
    });

    it('should returns empty collection entities if entities is null', function() {
        var entities = null;
        expect(sanitizeEntitiesFilter(entities)).to.eql([]);
    });

    it('should remove duplicate surface-forms from a collection of entities', function() {
        var entities = [{
                position: 'content',
                'surface-form': 'M&S',
                'wiki-title': 'Marks & Spencers'
            },
            {
                position: 'summary',
                'surface-form': 'M&S',
                'wiki-title': 'Marks & Spencers'
            }
        ];

        expect(sanitizeEntitiesFilter(entities)).to.eql([{
            position: 'summary',
            'surface-form': 'M&S',
            'wiki-title': 'Marks & Spencers'
        }]);
    });

    it('should filter a collection of entities by title and summary', function() {
        var entities = [{
                position: 'content',
                'surface-form': 'Mark you sexy beast',
                'wiki-title': 'Marks & Spencers'
            },
            {
                position: 'summary',
                'surface-form': 'M&S',
                'wiki-title': 'Marks & Spencers'
            },
            {
                position: 'title',
                'surface-form': 'Larry Page',
                'wiki-title': 'Google'
            }
        ];

        expect(sanitizeEntitiesFilter(entities)).to.eql([{
            position: 'summary',
            'surface-form': 'M&S',
            'wiki-title': 'Marks & Spencers'
        },
        {
            position: 'title',
            'surface-form': 'Larry Page',
            'wiki-title': 'Google'
        }]);
    });

});
