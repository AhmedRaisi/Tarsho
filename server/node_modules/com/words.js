module.exports = (function () {
    'use strict';

    function Words() {

    }

    Words.generate = function (length) {

        var consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z'],
            vowels = ['a', 'e', 'i', 'o', 'u', 'y'],
            word = '',
            lastIsVowel = Math.random() > 0.5,
            lettersSet = '',
            i,
            pos;

        length = length || 8;

        for (i = 0; i < length; i += 1) {
            lettersSet = lastIsVowel ? consonants : vowels;
            pos = (Math.round(Math.random() * lettersSet.length));
            word += lettersSet[pos];
            lastIsVowel = !lastIsVowel;
        }

        return word;
    };

    Words.shrink = function (text, length, suffix) {
        length = length || 100;
        suffix = suffix || '...';

        if (length > text.length) {
            return text;
        }

        while (text[length] !== undefined || (text[length] !== ' ' && length !== 0)) {
            length -= 1;
        }

        return text.substring(0, length) + suffix;
    };


    return Words;

}());