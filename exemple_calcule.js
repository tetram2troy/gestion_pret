function checkNumber(input, min, max, msg) {
    msg = "La zone " + msg + " n'a pas une donnee correcte : " + input.value;

    var str = input.value;
    for (var i = 0; i < str.length; i++) {
        var ch = str.substring(i, i + 1);
        if ((ch < "0" || "9" < ch) && ch != '.') {
            alert(msg);
            return false;
        }
    }
    var num = parseFloat(str);
    if (num < min || max < num) {
        alert(msg + " n'est pas compris entre [" + min + ".." + max + "]");
        return false;
    }
    input.value = str;
    return true;
}

function computeField(input) {
    if (input.value != null && input.value.length != 0)
        var str = input.value;
    var str2 = "";
    for (var i = 0; i < str.length; i++) {
        var ch = str.substring(i, i + 1);
        if (ch == ',') {
           str2 = str2 + ".";
       } else {
           str2 = str2 + ch;
       }
   }
   input.value = str2;
   input.value = "" + eval(input.value);
   computeForm(input.form);
}

function computeField2(input) {
    if (input.value != null && input.value.length != 0)
        var str = input.value;
    var str2 = "";
    for (var i = 0; i < str.length; i++) {
        var ch = str.substring(i, i + 1);
        if (ch == ',') {
           str2 = str2 + ".";
       } else {
           str2 = str2 + ch;
       }
   }
   input.value = str2;
   input.value = "" + eval(input.value);
   computeForm2(input.form);
}

function computeForm(form) {
    if ((form.nbmensualite.value == null || form.nbmensualite.value.length == 0) ||
        (form.taux.value.length == 0)) {
        return;
    }
    if (form.taux.value == 0)  {
        form.payment.value = form.principal.value/form.nbmensualite.value;
        form.coutotal.value = "0";
        return;
    }

    if (!checkNumber(form.nbmensualite, 1, 480, "Nombre de mensualites") ||
        !checkNumber(form.principal, 100, 10000000, "Montant du credit")) {
        form.payment.value = "Nulle";
        form.coutotal.value = "Nulle";
        return;
    }

    var i = form.taux.value;
    if (i > 1.0) {
        i = i / 100.0;
            if (i.toFixed) //if browser supports toFixed() method
             i = i.toFixed(4);
         form.taux.value = i;
     }
     i /= 12;
     var pow = 1;
     for (var j = 0; j < form.nbmensualite.value; j++)
        pow = pow * (1 + i);

    if (form.principal.value == null || form.principal.value.length == 0) {
        if (form.payment.value == null || form.payment.value.length == 0) {
            return;
        }
        form.principal.value = (pow - 1) * form.payment.value / (pow * i) ;
        form.coutotal.value = (((form.principal.value * pow * i) / (pow - 1))*form.nbmensualite.value)-form.principal.value;

        return;
    }

    var payment = (form.principal.value * pow * i) / (pow - 1);
    form.payment.value = Math.round(payment*100)/100;
    var coutotal = (((form.principal.value * pow * i) / (pow - 1))*form.nbmensualite.value)-form.principal.value;
    form.coutotal.value = Math.round(coutotal*100)/100;
}

function Amortissement(form) {
    if ((form.nbmensualite.value == null || form.nbmensualite.value.length == 0) ||
        (form.taux.value.length == 0)) {
        return;
    }
    
    if (form.taux.value == 0)  {
        form.payment.value = form.principal.value/form.nbmensualite.value;
        form.coutotal.value = "0";
        return;
    }

    if (!checkNumber(form.nbmensualite, 1, 480, "Nombre de mensualites") ||
        !checkNumber(form.principal, 100, 10000000, "Montant du credit")) {
        form.payment.value = "Nulle";
        form.coutotal.value = "Nulle";
        return;
    }

    var i = form.taux.value;
    if (i > 1.0) {
        i = i / 100.0;
        form.taux.value = i;
    }
    i /= 12;
    var pow = 1;
    for (var j = 0; j < form.nbmensualite.value; j++)
        pow = pow * (1 + i);

    if (form.principal.value == null || form.principal.value.length == 0) {
        if (form.payment.value == null || form.payment.value.length == 0) {
            return;
        }
        form.principal.value = (pow - 1) * form.payment.value / (pow * i);
        form.coutotal.value = (((form.principal.value * pow * i) / (pow - 1))*form.nbmensualite.value)-form.principal.value;
        return;
    }
    var payment = (form.principal.value * pow * i) / (pow - 1);
    form.payment.value = Math.round(payment*100)/100;
    var coutotal = (((form.principal.value * pow * i) / (pow - 1))*form.nbmensualite.value)-form.principal.value;
    form.coutotal.value = Math.round(coutotal*100)/100;

    NouveauContenu = '<div class="inner">';
    NouveauContenu += '<div id="div_tableau_calcul">';
    NouveauContenu += '<p style="text-align:center"><small>Cliquer en dehors de la fenÃªtre pour la fermer</small></p>';
    
    // affichage du graph
    NouveauContenu += '<div><table id="recap_graph"><caption>R&eacute;partition des remboursements</caption><thead>'; 
    NouveauContenu += '<th>Capital emprunt&eacute;</th><th>Int&eacute;r&ecirc;ts</th></thead>';
    NouveauContenu += '<tbody>';
    NouveauContenu += '<tr>';
    NouveauContenu += '<td>' + Math.round(form.principal.value*100)/100 + '</td>' ;
    NouveauContenu += '<td>' + Math.round(coutotal*100)/100 + '</td>';
    NouveauContenu += '</tr>';
    NouveauContenu += '</tbody>';
    NouveauContenu += '</table></div>';
    NouveauContenu += '<br>';
    NouveauContenu += '<br>';

    NouveauContenu += '<table id="amortissement">';
    NouveauContenu += '<caption>Tableau d\'amortissement<caption>';
    NouveauContenu +='<tr><th>Mois</th><th>Montant</th>';
    NouveauContenu +='<th>IntÃ©rÃªt remboursÃ©</th><th>Capital remboursÃ©</th>';
    NouveauContenu +='<th>Capital restant dÃ»</th></tr>';

    capitalrestant = form.principal.value;
    taux = form.taux.value;
    mensualite=form.payment.value;

    for (var ligne = 1; ligne <= form.nbmensualite.value; ligne++) {
        interetdumois=capitalrestant*(taux/12);
        capitalrembourse=mensualite-interetdumois;
        modulo=ligne%2;
        if ( modulo == 1){
            NouveauContenu +='<tr bgcolor=#FFFFFF>';
        } else {
            NouveauContenu +='<tr>';
        }
        NouveauContenu +='<td>&nbsp;'+ligne+'&nbsp;</td>';
        NouveauContenu +='<td>&nbsp;'+NNtoCC(arrondi(capitalrestant,2))+'&nbsp;</td>';
        NouveauContenu +='<td>&nbsp;'+NNtoCC(arrondi(interetdumois,2))+'&nbsp;</td>';
        NouveauContenu +='<td>&nbsp;'+NNtoCC(arrondi(capitalrembourse,2))+'&nbsp;</td>';
        capitalrestant = capitalrestant-capitalrembourse;
        if (capitalrestant<0){capitalrestant=0;}
            NouveauContenu +='<td>&nbsp;'+NNtoCC(arrondi(capitalrestant,2))+'&nbsp;</td>';
        NouveauContenu +='</tr>';
    }
    NouveauContenu += '</table>';
    NouveauContenu += '</div></div>';

    $("#tableauamortissement").empty();
    $("#tableauamortissement").append(NouveauContenu);

    // affichage du graph
    $("#tableauamortissement").show();
    $('#recap_graph').visualize({type: 'pie', height: '200px', width: '300px', parseDirection: 'y', pieMargin: '10'});
    $("#recap_graph").hide();
    $("#tableauamortissement").hide();

    $.fancybox({
       'autoScale': true,
       'transitionIn': 'elastic',
       'transitionOut': 'elastic',
       'speedIn': 500,
       'speedOut': 300,
       'autoDimensions': true,
       'centerOnScroll': true,
       'href' : '#tableauamortissement'
    });
}

function clearForm(form) {
    form.nbmensualite.value = "";
    form.payment.value = "";
    form.taux.value = "";
    form.principal.value = "";
    form.coutotal.value = "";
}

function computeForm2(form) {
    if ((form.nbmensualite.value == null || form.nbmensualite.value.length == 0) ||
        (form.payment.value.length == 0) ||
        (form.principal.value == null || form.principal.value.length == 0)) {
        return;
    }
    if (!checkNumber(form.nbmensualite, 1, 480, "Nombre de mensualites") ||
        !checkNumber(form.principal, 100, 10000000, "Montant du credit")) {
        form.payment.value = "Nulle";
        form.coutotal.value = "Nulle";
        return;
    }
    Pv=form.principal.value;
    A=12;
    N=form.nbmensualite.value;
    P=form.payment.value;
    Fv=0;
    Te=0;
    var taux = calculT(Pv,A,N,P,Fv,Te);
    form.taux.value = Math.round(taux*100)/100;
    return;
}

function calculT(Pv,A,N,P,Fv,Te) {
    P = arrondi(P,2);
    if(Pv==0 || A==00 || N==0 || P==0) return "";
        if((P*N) < Pv) {
            alert("\nFaudrait peut-etre voir a ce que\nmensualites * nombre de mensualites\nsoient au moins egales\nau montant du credit !\n\nVerifiez vos chiffres :-)");
            return "";
        }
        var T = 100 ; i = T / 2 ; Echeance = 0 ; var boucle = 0;
        while ( Echeance != P && boucle != 1000) {
            boucle += 1;
            Echeance = arrondi(-calculV(Pv,T/(100*A),A,N,-Fv,Te),2);
            T = ( Echeance < P ) ? T + i : T - i ; i /= 2;
        }
        if (boucle >= 1000)
            alert("\nFaudrait peut-etre voir a \npas trop deconner !\n\nVerifiez vos chiffres :-)");
        return T;
}

function calculV(Pv,T,A,Du,Fv,Mode) {
    var Temp,V;
    Temp = Math.pow(1 + T, Du);
    V = -T * (Pv * Temp + Fv) / ((Temp - 1) * (1 + T * Mode));
    return V;
}

function arrondi(r,d) {
    d = parseInt(d);
    var pwr = Math.pow(10,d);
    var delta = (r < 0.5) ? -0.5 : 0;
    var res = (r * pwr + delta) / pwr;
    return Math.round(res * pwr) / pwr;
}

function NNtoCC(montant) {
    PN = Math.round((montant*100));PT = PN.toString();
    return PN<10?"0,0"+PN:PN<100?"0,"+PN:PT.substr(0,PT.length-2)+","+PT.substr(PT.length-2);
}