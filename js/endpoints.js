/**
 * Created by Domy on 24/03/15.
 */
var placeID;

/*
* Function per l'inserimento di una recensione.Alla prima recensione inserita da parte dell'utente salva l'ID
* di questo nel localStorage,in modo da evitare successive registrazioni ridondanti al DB mediante il metodo
* registerUser().Ovviamente affinche' l'utente possa rilasciare una recensione deve essere stato effettuato
* il login a FB,in quanto l'ID di FB identifica l'utente all'interno del DB.*/
function insertReview() {
    if (!loggedIn)
        alert("E' necessario accedere a facebook per proseguire!");
    else if ($("#float-textarea-autosize").val() == "")
        alert("Inserire la recensione!");
    else if ($("#modalStars").val() == 0)
        alert("Inserire la valutazione!");
    else {
        $("#progress").css("visibility","visible");
        if (localStorage.getItem(userID) == null) {
            console.log("NOT IN LOCAL STORAGE");
            gapi.client.myApi.registerUser({
                "userID": userID,
                "userFullname": userFullname,
                "userLocation": userLocation,
                "photoLink": userPicture
            }).execute(function (resp) {
                console.log(resp);
                localStorage.setItem(userID, "");
                insert();
            });
        }
        else{
            console.log("IN LOCAL STORAGE");
            insert();
        }
    }
}

/*
* Inserisco la recensione.Nel caso in cui l'utente abbia gia' inserito in passato una recensione per l'entità corrente
* verra' mostrato all'utente un'alert contenente i dettagli della sua recensione passata,dandogli l'opportunita'
* di aggiornarla.*/
function insert(){
    gapi.client.myApi.insertReview({
        "placeID":placeID,
        "userID":userID,
        "valutation":$("#modalStars").val(),
        "description":$("#float-textarea-autosize").val()
    }).execute(function (resp) {
        $("#progress").css('visibility','hidden');
        console.log(resp);
        var res=resp.result;
        if(res.result=="PRIMARY KEY VIOLATION"){
            var msgAlert="Hai gia' recensito questa entita'\nData:"+res.date+"\nValutazione:"+res.valutation+"\nRecensione:"+res.description+"\nDesideri aggiornare la tua recensione?";
            if(confirm(msgAlert)==true){
                $("#progress").css('visibility','visible');
                gapi.client.myApi.updateReview({
                    "placeID":placeID,
                    "userID":userID,
                    "valutation":$("#modalStars").val(),
                    "description":$("#float-textarea-autosize").val()
                }).execute(function(resp){
                    $("#progress").css('visibility','hidden');
                    console.log(resp);
                    $('#modal-big').modal('hide');
                    toastr.success('Recensione aggiornata!');
                });
            }
        }
        else{
            $('#modal-big').modal('hide');
            toastr.success('Recensione inserita!');
        }
    });
}

/*
* Mediante tale function effettuo una chiamata al metodo nearbyEntityList() esposto sull'App-engine.
* Tale metodo prende in input un'array di stringhe,rappresentante un'insieme di place ID,e restituisce
* i dettagli  delle entita' appartenenti all'insieme che abbiano ricevuto almeno una recensione,
* ordinate sulla base della valutazione media e del numero totale di recensioni ricevute.*/
function populateNearbyList(results){
    $("#cardsRow").empty();
    var list=[];
    for(var i=0;i<results.length;i++){
        list.push(results[i].place_id);
    }
    gapi.client.myApi.nearbyEntityList({
        "placeID": list
    }).execute(function (resp) {
        $("#progress2").hide();
        console.log(resp);
        if(resp.list!=null) {
            for (var i = 0; i < resp.list.length; i++) {
                insertNearbyCard(resp.list[i]);
            }
            $(".rating").rating("refresh");
        }
        else{
            toastr.error("Nessuna entita' corrispondente alla categoria indicata e' stata recensita nella tua zona!");
        }
    });
}


function init() {
    var ROOT = 'https://big-depth-784.appspot.com/_ah/api';
    gapi.client.load('myApi', 'v1', function () {
        console.log("endpoints loaded");
    }, ROOT);
}
