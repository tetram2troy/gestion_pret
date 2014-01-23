'use strict';

angular.module('gestionPretApp')
    .controller('MainCtrl', function ($scope) {

        $scope.montant = 150000;
        $scope.taux = 3.8;
        $scope.nbMensualite = 300;
        $scope.mensualite = 775.28;

        $scope.lstSimulation = [
            {montant:150000, taux:3.8, nbMensualite:300, mensualite:775.28, cout:82585.45},
            {montant:150000, taux:3.8, nbMensualite:300, mensualite:775.28, cout:82585.45}
        ];
        $scope.alerts = [
//            { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
//            { type: 'success', msg: 'Well done! You successfully read this important alert message.' }
        ];
        $scope.execCalc = function () {

            $scope.sanitarize("taux");
            $scope.sanitarize("montant");
            $scope.sanitarize("nbMensualite");
            $scope.sanitarize("mensualite");

            if ( isNaN($scope.taux) ) {
                $scope.addAlert("erreur taux");
                return; //pour arreter l'execution
            }

            var tauxEffectif = $scope.calcTauxEffectif($scope.taux);

            if ( !isNaN($scope.montant) && !isNaN($scope.nbMensualite) ) {

                $scope.mensualite = $scope.calcMensualite($scope.montant, tauxEffectif, null, $scope.nbMensualite);

            } else if ( !isNaN($scope.montant) && !isNaN($scope.mensualite) ) {

                $scope.nbMensualite = $scope.calcNbMensualite($scope.montant, tauxEffectif, $scope.mensualite, null);

            } else if ( !isNaN($scope.mensualite) && !isNaN($scope.nbMensualite) ) {

                $scope.montant = $scope.calcMontant(null, tauxEffectif, $scope.mensualite, $scope.nbMensualite);

            } else {
                $scope.addAlert("vous devez remplire le taux et au moins 2 des champs");
                return;
            }

            var cout = $scope.calcCout($scope.montant, tauxEffectif,  $scope.mensualite,  $scope.nbMensualite);

            $scope.lstSimulation.push({montant: $scope.montant, taux: $scope.taux, nbMensualite: $scope.nbMensualite, mensualite: $scope.mensualite, cout:cout});



        }

        $scope.sanitarize = function (maVar){
            $scope[maVar] = parseFloat($scope[maVar]);
        }

        $scope.calcMontant = function (montant, tauxEffectif, mensualite, nbMensualite) {

            var montant = (Math.pow((1+tauxEffectif/12),nbMensualite) - 1) * mensualite / (Math.pow((1+tauxEffectif/12),nbMensualite) * tauxEffectif /12 );
            montant = Math.round(montant);

            return montant;

        }

        $scope.calcMensualite = function (montant, tauxEffectif, mensualite, nbMensualite) {

            var mensualite = (montant*(tauxEffectif/12)*Math.pow((1+tauxEffectif/12),nbMensualite)) / ((Math.pow((1+tauxEffectif/12),nbMensualite))-1);
            //arrondissement a 2 decimal
            mensualite = Math.round(mensualite*100)/100;

            return mensualite;

        }

        $scope.calcNbMensualite = function (montant, tauxEffectif, mensualite, nbMensualite) {

            var nbMensualite = (Math.log((12*mensualite)/(12*mensualite-tauxEffectif*montant)))/(Math.log(1+tauxEffectif/12));
            //arrondissement a 2 decimal
            nbMensualite = Math.round(nbMensualite);

            return nbMensualite;

        }

        $scope.calcCout = function (montant, tauxEffectif, mensualite, nbMensualite) {

            var cout = (((montant * Math.pow((1+tauxEffectif/12),nbMensualite) * tauxEffectif /12 ) / (Math.pow((1+tauxEffectif/12),nbMensualite) - 1))*nbMensualite)-montant;
            cout = Math.round(cout*100)/100;

            return cout;
        }

        $scope.calcTauxEffectif = function (taux) {
            var tauxEffectif = taux;
            if (taux > 1) {
                tauxEffectif = taux / 100.0;
            }

            return tauxEffectif;
        }

        $scope.addAlert = function(myMsg) {
            $scope.alerts.push({type: 'danger', msg: myMsg});
        };

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.supprSimulation = function(index) {
            $scope.lstSimulation.splice(index, 1);
        };

        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
    });
