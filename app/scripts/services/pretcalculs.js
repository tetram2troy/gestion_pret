'use strict';

angular.module('gestionPretApp')
  .factory('pretcalculs', function () {


        var factory = {};

        factory.calcMontant = function (montant, tauxEffectif, mensualite, nbMensualite) {


            var montantRet = (Math.pow((1+tauxEffectif/12),nbMensualite) - 1) * mensualite / (Math.pow((1+tauxEffectif/12),nbMensualite) * tauxEffectif /12 );
            montantRet = Math.round(montantRet);

            return montantRet;
        };

        factory.calcMensualite = function (montant, tauxEffectif, mensualite, nbMensualite) {

            var mensualiteRet = (montant*(tauxEffectif/12)*Math.pow((1+tauxEffectif/12),nbMensualite)) / ((Math.pow((1+tauxEffectif/12),nbMensualite))-1);
            //arrondissement a 2 decimal
            mensualiteRet = Math.round(mensualiteRet*100)/100;

            return mensualiteRet;
        };

        factory.calcNbMensualite = function (montant, tauxEffectif, mensualite, nbMensualite) {

            var nbMensualiteRet = (Math.log((12*mensualite)/(12*mensualite-tauxEffectif*montant)))/(Math.log(1+tauxEffectif/12));
            //arrondissement a 2 decimal
            nbMensualiteRet = Math.round(nbMensualiteRet);

            return nbMensualiteRet;
        };

        factory.calcCout = function (montant, tauxEffectif, mensualite, nbMensualite) {

            var cout = (((montant * Math.pow((1+tauxEffectif/12),nbMensualite) * tauxEffectif /12 ) / (Math.pow((1+tauxEffectif/12),nbMensualite) - 1))*nbMensualite)-montant;
            cout = Math.round(cout*100)/100;

            return cout;
        };

        factory.calcTauxEffectif = function (taux) {
            var tauxEffectif = taux;
            if (taux > 1) {
                tauxEffectif = taux / 100.0;
            }

            return tauxEffectif;
        };


        return factory;

  });
