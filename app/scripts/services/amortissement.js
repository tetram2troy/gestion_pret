'use strict';

angular.module('gestionPretApp')
  .factory('amortissement', function () {




        var factory = {};

        factory.getStruct = function () {

            var amortissement = {
                simulation:{
                    montant:150000,
                    tauxEffectif:0.038,
                    mensualite:775.28,
                    nbMensualite:300
                },

                modificateur:{}

            };

            return amortissement;
        }

        factory.calcAmortissement = function (simulation) {

            var tblAmortissement = [];

            var capitalrestant = simulation.montant;
            var taux = simulation.tauxEffectif /12;
            var mensualite = simulation.mensualite;

            for (var ligne = 1; ligne <= simulation.nbMensualite; ligne++) {
                var capitalInital = capitalrestant;
                var interetdumois = capitalrestant*taux;
                var capitalrembourse = mensualite-interetdumois;

                capitalrestant = capitalrestant-capitalrembourse;
                if (capitalrestant<0){capitalrestant=0;}

                tblAmortissement.push({ligne:ligne, capitalInital:capitalInital, interetdumois:interetdumois, capitalrembourse:capitalrembourse, capitalrestant:capitalrestant});
            }

            return tblAmortissement;
        }

        return factory;
  });
