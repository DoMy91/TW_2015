/**
 * Created by Domy on 27/03/15.
 */

function initPage() {
    var placeName,placeAddress,placeImg,placeAvg,placeNumbOfRev,ratings=[];
    var placeID=getUrlParameter("placeID");
    var map = new google.maps.Map(document.getElementById('map-canvas3'),
        null);
    var request = {
        placeId: placeID
    };
    var service = new google.maps.places.PlacesService(map);
    service.getDetails(request, function(place, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            console.log("OK");
            placeName=place.name;
            placeAddress=place.vicinity;
            if("photos" in place)
                placeImg=place.photos[0].getUrl({'maxWidth': 500, 'maxHeight': 500});
            else
                placeImg="images/Places.png";
            var res=JSON.parse(sessionStorage.getItem("resp"));
            placeAvg=(res.avg).toFixed(1);
            placeNumbOfRev=res.totalRev;
            for(var i=1;i<=5;i++){
                ratings.push(res.ratings[i]);
            }
            var summaryCard='<div class="card card-yellow summaryCard"> <div class="card-side summarySide"> <span class="card-heading" style="text-align: center"> <span class="avatar avatar-sm" style="width: 80px;height: 80px;margin-left: auto;margin-right: auto"> <img src="'+placeImg+'" id="picture"/> </span> <div> <p>'+placeName+'</p> <p style="font-size: medium;margin-top: -20px;font-family: Roboto;font-weight: lighter">'+placeAddress+'</p> </div> </span> </div> <div class="card-main summaryMain" style="padding: 0"> <div class="card-inner" style="padding: 0;"> <div id="map-canvas2"></div> <div> <div class="summaryLeft"> <p class="headerText">Riepilogo Recensioni</p> <p class="avg">'+placeAvg+'</p> <input id="summaryStars2" class="rating" data-size="sm" data-show-clear="false" data-show-caption="false" data-min="0" data-max="5" data-step="1" data-readonly="true" value="'+placeAvg+'"> <p class="numRev">'+placeNumbOfRev+' recensioni</p> </div> <div class="summaryRight"> <p>1 stella <div class="progress"> <div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: '+ratings[0]/placeNumbOfRev*100+'%;"> <span class="sr-only">40% Complete (success)</span> </div> </div> <br/><br/> <p> 2 stelle <div class="progress"> <div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: '+ratings[1]/placeNumbOfRev*100+'%;"> <span class="sr-only">40% Complete (success)</span> </div> </div> <br/><br/> <p> 3 stelle <div class="progress"> <div class="progress-bar progress-bar-warning" role="progressbar"aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"style="width: '+ratings[2]/placeNumbOfRev*100+'%;"> <span class="sr-only">40% Complete (success)</span> </div> </div> <br/><br/> <p> 4 stelle <div class="progress"> <div class="progress-bar progress-bar-success" role="progressbar"aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"style="width: '+ratings[3]/placeNumbOfRev*100+'%;"> <span class="sr-only">40% Complete (success)</span> </div> </div> <br/><br/> <p> 5 stelle <div class="progress"> <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"style="width: '+ratings[4]/placeNumbOfRev*100+'%;"> <span class="sr-only">40% Complete (success)</span> </div> </div> </div> </div> </div> </div> </div>';
            $("#summaryCard").append(summaryCard);
            createMarker(place);
            for(var i=0;i<placeNumbOfRev;i++){
                var userName=res.list[i].FULLNAME;
                var dateRew=res.list[i].DATE_REW;
                var pictureLink=res.list[i].PICTURE_LINK;
                var description=res.list[i].DESCRIPTION;
                var valutation=res.list[i].VALUTATION;
                var reviewCard='<div class="card card-yellow reviewCard"> <div class="card-main"> <div class="card-inner" style="padding: 0"> <span class="avatar avatar-sm" style="width: 80px;height: 80px;float: left;margin-bottom: 5px"> <img src="'+pictureLink+'"/> </span> <p class="card-heading text-yellow" style="margin-bottom: 0px">'+userName+'</p> <div style="margin-top: 5px;margin-bottom: 0px"> <div style="display: inline-block;vertical-align: top"> <input id="userReviewStar" class="rating" data-size="xs" data-show-clear="false" data-show-caption="false" data-min="0" data-max="5" data-step="1" data-readonly="true" value="'+valutation+'"></div> <p class="numRev" style="display: inline-block;margin-top:0px;vertical-align: top;font-size: 15px;color:darkgrey;">'+dateRew+'</p> </div> <p style="margin-top: 0px;margin-left: 10px">'+description+'</p> </div> </div> </div>';
                $("#containerLR").append(reviewCard);
            }
            $(".rating").rating("refresh");
            $.getScript("http://cdnjs.cloudflare.com/ajax/libs/masonry/3.2.2/masonry.pkgd.min.js", function(){
                $('#containerLR').masonry();
            });
            sessionStorage.removeItem("resp");
        }
    });
}

function createMarker(place){
    var mapOptions = {
        center: place.geometry.location,
        zoom: 17
    };
    var map = new google.maps.Map(document.getElementById('map-canvas2'),
        mapOptions);
    var marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    });
    marker.setIcon(/** @type {google.maps.Icon} */({
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(35, 35)
    }));
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);
}

function getUrlParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
}