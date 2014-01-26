'use strict';

angular.module('gestionPretApp')
  .factory('pretStorage', function () {

    var STORAGE_ID = 'lstPret-angular';

    // Public API here
    return {
        get: function () {
            return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
        },

        put: function (lstPret) {
            localStorage.setItem(STORAGE_ID, JSON.stringify(lstPret));
        }
    };
  });
