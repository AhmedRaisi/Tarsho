describe('com', function () {

    'use strict';

    var createCom = require('../index.js').create,
        byIdMap = function (object, emit) {
            emit(object.id, object);
        },
        byColorMap = function (object, emit) {
            emit(object.color, object);
        },
        com,
        data;

    beforeEach(function () {
        com = createCom();
        data = [
            {id: 1, color: 'red'},
            {id: 2, color: 'red'},
            {id: 3, color: 'blue'}
        ];
    });

    it('can create indexes', function () {

        expect(function () {
            com.addMapper('id', byIdMap);
        }).not.toThrow();

    });

    it('can add objects', function () {

        expect(function () {
            com.addMany(data);
        }).not.toThrow();

    });

    it('after returning the index prevents overriding the map', function () {
        com.addMapper('id', byIdMap);
        com.addMany(data);

        com.by('id', 1).pop();

        expect(com.by('id', 1).length).toEqual(1);
    });

    it('can find by index', function () {
        com.addMapper('id', byIdMap);
        com.addMany(data);

        expect(com.by('id', 1).pop().id).toEqual(1);
    });

    it('generates ids by itself', function () {
        var obj = {};
        com.add(obj);
        expect(obj.id).toBeDefined();
    });

    it('can remove objects', function () {
        var obj = {};
        com.add(obj);
        com.addMapper('id', byIdMap);

        expect(com.all().length).toEqual(1);

        expect(function () {
            com.remove(obj);
        }).not.toThrow();

        expect(com.all().length).toEqual(0);

        expect(com.by('id', obj.id).length).toEqual(0);
    });

    it('can update objects', function () {
        var object;

        com.addMany(data);
        com.addMapper('id', byIdMap);
        com.addMapper('color', byColorMap);

        object = com.by('id', 1).pop();
        expect(object.color).toEqual('red');
        object.color = 'yellow';
        com.update(object);
        expect(object.color).toEqual('yellow');
        expect(com.by('id', 1).pop().color).toEqual('yellow');
        expect(com.by('color', 'red').length).toEqual(1);
    });

});