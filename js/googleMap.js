/**
 * Created by Domy on 20/03/15.
 */

//var position = new google.maps.LatLng(40.856314,14.284587); NAPOLI

var myLatlng,map,searchBox;

/*
 * Mediante tale funzione cerco di ottenere la posizione dell'utente
 */
function initialize() {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(getPosition);
    }
    var input = document.getElementById('pac-input');
    searchBox = new google.maps.places.SearchBox(input);
    google.maps.event.addListener(searchBox, 'places_changed',placeAdded);
}

/*
 * Ottenuta la posizione dell'utente,mediante la funzione setBounds() vengono personalizzati i suggerimenti
 * mostrati dalla barra di ricerca,preferendo le entità che si trovano nei dintorni dell'utente.
 */
function getPosition(position){
    myLatlng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
    var circle = new google.maps.Circle({
        center: myLatlng,
        radius: position.coords.accuracy
    });
    searchBox.setBounds(circle.getBounds());
    var mapOptions = {
        center: myLatlng,
        zoom: 14
    };
    console.log(position.coords.latitude,position.coords.longitude);
    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
    nearbySearch();
}

/*
 * Con la funzione nearbySearch effettuo una ricerca di entità presenti dei dintorni dell'utente (entro un raggio
 * di 1500 mt,mediante le Google Places API.
 * */
function nearbySearch(){
    var request = {
        location: myLatlng,
        radius: '1500'
    };
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            populateListCards(results);
        }
    });
}

/*
 * Con la funzione radarSearch() viene chiamata l'omonima funzione delle Places API,ottenendo una lista di max 200 entità
 * corrispondenti alla keyword,presenti nel raggio di 1500 mt dalla località indicata.
 * */
function radarSearch(keyword){
    //var position = new google.maps.LatLng(40.856314,14.284587);
    if(myLatlng!=null) {
        var request = {
            location: myLatlng,
            radius: '1500',
            keyword: keyword
        };
        service = new google.maps.places.PlacesService(map);
        service.radarSearch(request, function callback(results, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                console.log("Num result:" + results.length);
                populateNearbyList(results);
            }
            else {
                $("#progress2").hide();
                toastr.error("Nessun risultato!");
            }
        });
    }
    else{
        $("#progress2").hide();
        toastr.error("La tua posizione e' sconosciuta!");
    }
}

/*
 * Mediante tale funzione estraggo le informazioni di base di ogni entità (che vengono restituite dalla nearby-search),
 * creo le varie cards inserendovi tali informazioni (nome entita',indirizzo e foto) e le inserisco nella pagina.
 * */
function populateListCards(results){
    $("#progress2").hide();
    for (var i = 0; i < results.length; i++) {
        var place = results[i];
        var linkPicture,address;
        if("vicinity" in place)
            address=place.vicinity;
        else
            address=place.formatted_address;
        if("photos" in place)
            linkPicture=place.photos[0].getUrl({'maxWidth': 500, 'maxHeight': 500});
        else
            linkPicture="images/Places.png";
        var element='<div class="col-lg-4 col-md-6 col-sm-6"><div class="flip-container"><div class="flipper"><div class="front"><div class="card card-yellow"><a class="card-side"><span class="card-heading"><span class="avatar avatar-sm" style="width: 80px;height: 80px;"><img src='+linkPicture+' id="picture"/></span></span></a><div class="card-main"><div class="card-inner"><p class="entityName card-heading" id="entityName">'+place.name+'</p><p class="entityAddress" id="entityAddress">'+address+'</p></div></div></div></div><div class="back"><div class="card card-yellow"><a class="card-side"><span class="card-heading"><span class="avatar avatar-sm" style="width: 80px;height: 80px;"><img src="images/5star.png" id="rPicture"/></span></span></a><div class="card-main"><div class="card-inner"><li class="card-heading"><a onclick="checkEmpty(\'' + place.place_id + '\')" id="readLink"><span class="icon icon-info margin-right-half"></span>&nbsp;Leggi</a></li><li class="card-heading"><a class="openReviewModal" href="#modal-big" data-toggle="modal" data-id='+place.place_id+' id="writeLink"><span class="icon icon-star-rate margin-right-half"></span>&nbsp;Recensisci</a></li></div></div></div></div></div></div></div>';
        $("#cardsRow").append(element);
    }
    $(".entityName").dotdotdot();
    $(".entityAddress").dotdotdot();
}

/*
 * Identica alla funzione precedente,ma utilizzata nel caso della ricerca per categorie.Ogni card,oltre a contenere
 * le informazioni di base dell'entita' contiene anche la media voto e il numero di recensioni ricevute.
 * */
function insertNearbyCard(response){
    var avg=response.AVG_VALUTATION;
    var numRew=response.COUNT;
    var placeID=response.PLACE_ID;
    var nearbyCard='<div class="col-lg-4 col-md-6 col-sm-6"> <div class="flip-container"> <div class="flipper"> <div class="front"> <div class="card card-yellow nearbyCard" id="'+placeID+'"><a class="card-side"><span class="card-heading"><span class="avatar avatar-sm" style="width: 80px;height: 80px;"><img src="" id="picture"/></span></span></a> <div class="card-main"> <div class="card-inner"><p class="entityName card-heading" id="entityName"></p> <div class="rowNearby"><input id="stars" class="rating" data-size="xs" data-show-clear="false" data-show-caption="false" data-min="0" data-max="5" data-step="1" data-readonly="true" value="'+avg+'"> </div><span>'+avg+'</span><span>('+numRew+')</span> <p class="entityAddress" id="entityAddress"></p></div> </div> </div> </div> <div class="back"> <div class="card card-yellow"><a class="card-side"><span class="card-heading"><span class="avatar avatar-sm" style="width: 80px;height: 80px;"><img src="images/5star.png" id="rPicture"/></span></span></a> <div class="card-main"> <div class="card-inner"> <li class="card-heading"><a onclick="checkEmpty(\'' + placeID + '\')" id="readLink"><span class="icon icon-info margin-right-half"></span>&nbsp;Leggi</a> </li> <li class="card-heading"><a class="openReviewModal" href="#modal-big" data-toggle="modal" data-id='+placeID+' id="writeLink"><span class="icon icon-star-rate margin-right-half"></span>&nbsp;Recensisci</a> </li> </div> </div> </div> </div> </div> </div> </div>';
    $("#cardsRow").append(nearbyCard);
    var request = {
        placeId: response.PLACE_ID
    };
    service = new google.maps.places.PlacesService(map);
    service.getDetails(request, function(results, status){
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            var name=results.name;
            var address=results.formatted_address;
            if("photos" in results)
                var img=results.photos[0].getUrl({'maxWidth': 500, 'maxHeight': 500});
            else
                var img="images/Places.png";
            $("#"+placeID).find("#picture").attr("src",img);
            $("#"+placeID).find("#entityName").text(name);
            $("#"+placeID).find("#entityAddress").text(address);
            $(".entityName").dotdotdot();
            $(".entityAddress").dotdotdot();
        }
    });
}

/*
 * Quando l'utente clicca sul link "leggi" presente sul retro di ogni card,verifico innanzitutto se sono state
 * inserite recensioni per tale entita' con una chiamata al metodo getListReview() presente nelle API esposte
 * sull'App-Engine.Tale metodo restituisce i dettagli riguardanti le recensioni dell'entita' passatagli in input.
 * Nel caso in cui siano presenti recensioni,viene salvato nel sessionStorage l'oggetto contenente le informazioni
 * necessarie al popolamento della pagina entityListReview.html,che poi viene caricata.A questa viene passato
 * mediante link il placeID dell'entita',che verra' utilizzato per ottenere altre info su di essa (Detail-Search Places API).
 * */
function checkEmpty(placeID){
    console.log(placeID);
    gapi.client.myApi.getListReview({
        "placeID": placeID
    }).execute(function (resp) {
        if(resp.result.totalRev==0){
            toastr.error("Non sono presenti recensioni per tale entita'!");
        }
        else{
            sessionStorage.setItem("resp",JSON.stringify(resp));
            console.log(JSON.stringify(resp));
            window.location.href="entityListReview.html?placeID="+placeID;
        }
    });
}

/*
 * Listener che si attiva in caso di inserimento di una keyword nella barra di ricerca.Elimina tutte le cards
 * presenti e avvia le procedure per il caricamento delle nuove,attinenti alla keyword inserita.
 * */
function placeAdded(){
    $("#progress2").show();
    if($("#input-checkbox-1").is(':checked')){
        var keyword=$("#pac-input").val();
        console.log(keyword);
        radarSearch(keyword);
    }
    else {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            $("#progress2").hide();
            toastr.error("Nessuna entita' trovata!");
            return;
        }
        $("#cardsRow").empty();
        $("#text01").text("Risultati");
        populateListCards(places);
    }
}

google.maps.event.addDomListener(window, 'load', initialize);
