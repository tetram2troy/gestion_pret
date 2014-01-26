'use strict';

angular.module('gestionPretApp')
    .controller('MainCtrl', function ($scope, pretStorage, pretcalculs, amortissement) {

        $scope.montant = 150000;
        $scope.taux = 3.8;
        $scope.nbMensualite = 300;
        $scope.mensualite = 775.28;

        $scope.lstSimulation = pretStorage.get();

        $scope.alerts = [];
        $scope.tblAmortissement = [];


        $scope.$watch('lstSimulation', function (newValue, oldValue){

            if (newValue !== oldValue) { // This prevents unneeded calls to the local storage
                pretStorage.put($scope.lstSimulation);
            }
        }, true);

        $scope.execCalc = function () {

            $scope.sanitarize("taux");
            $scope.sanitarize("montant");
            $scope.sanitarize("nbMensualite");
            $scope.sanitarize("mensualite");

            if ( isNaN($scope.taux) ) {
                $scope.addAlert("erreur taux");
                return; //pour arreter l'execution
            }

            var tauxEffectif = pretcalculs.calcTauxEffectif($scope.taux);

            if ( !isNaN($scope.montant) && !isNaN($scope.nbMensualite) ) {

                $scope.mensualite = pretcalculs.calcMensualite($scope.montant, tauxEffectif, null, $scope.nbMensualite);

            } else if ( !isNaN($scope.montant) && !isNaN($scope.mensualite) ) {

                $scope.nbMensualite = pretcalculs.calcNbMensualite($scope.montant, tauxEffectif, $scope.mensualite, null);

            } else if ( !isNaN($scope.mensualite) && !isNaN($scope.nbMensualite) ) {

                $scope.montant = pretcalculs.calcMontant(null, tauxEffectif, $scope.mensualite, $scope.nbMensualite);

            } else {
                $scope.addAlert("vous devez remplire le taux et au moins 2 des champs");
                return;
            }

            var cout = pretcalculs.calcCout($scope.montant, tauxEffectif,  $scope.mensualite,  $scope.nbMensualite);

            $scope.lstSimulation.push({montant: $scope.montant, taux: $scope.taux, tauxEffectif:tauxEffectif,  nbMensualite: $scope.nbMensualite, mensualite: $scope.mensualite, cout:cout});

        }


        $scope.amortissement = function (simulation) {

//            var tblAmortissement = [];
//
//
//            var capitalrestant = simulation.montant;
//            var taux = simulation.tauxEffectif;
//            var mensualite = simulation.mensualite;
//
//            for (var ligne = 1; ligne <= simulation.nbMensualite; ligne++) {
//                var capitalInital = capitalrestant;
//                var interetdumois = capitalrestant*(taux/12);
//                var capitalrembourse = mensualite-interetdumois;
//
//                capitalrestant = capitalrestant-capitalrembourse;
//                if (capitalrestant<0){capitalrestant=0;}
//
//                tblAmortissement.push({ligne:ligne, capitalInital:capitalInital, interetdumois:interetdumois, capitalrembourse:capitalrembourse, capitalrestant:capitalrestant});
//            }
//            $scope.tblAmortissement = tblAmortissement;

//            if (simulation.nbMensualite <= 30) {
//                console.log(amortissement.calcAmortissement(simulation));
//                simulation.nbMensualite = simulation.nbMensualite*12;
//            }
            $scope.tblAmortissement = amortissement.calcAmortissement(simulation);
//            console.log(tblAmortissement);

        }

        $scope.copieSimulation = function (simulation) {
            $scope.montant = simulation.montant;
            $scope.taux = simulation.taux;
            $scope.nbMensualite =simulation. nbMensualite;
            $scope.mensualite = simulation.mensualite;
        }

        $scope.sanitarize = function (maVar){
            $scope[maVar] = parseFloat($scope[maVar]);
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
