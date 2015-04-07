/**
 * Created by Domy on 30/03/15.
 */
var count= 0,userID=sessionStorage.getItem("userID");
function init() {
    var ROOT = 'https://big-depth-784.appspot.com/_ah/api';
    gapi.client.load('myApi', 'v1', function () {
        console.log("endpoints loaded");
        gapi.client.myApi.retrieveGlobalLeaderboard({
            "userID": userID
        }).execute(function (resp) {
            console.log(resp);
            $("#progress").hide();
            populateLeaderboard(resp.result,"G");
        });
    }, ROOT);
}

/*
* Mostro la top 20 della classifica globale,evidenziando di rosso l'utente corrente.Nel caso in cui questo non sia presente
* lo appendo in coda alla classifica.*/
function populateLeaderboard(results,type){
    var uName,uCity,img,numRew,uID, i,tabID,bkgrColor;
    if(type=="G")
        tabID="#first-tab";
    else
        tabID="#second-tab";
    for(i=0;i<results.list.length;i++){
        uName=results.list[i].FULLNAME;
        uCity=results.list[i].LOCATION_NAME;
        img=results.list[i].PICTURE_LINK;
        numRew=results.list[i].NUMBER_REW;
        uID=results.list[i].ID;
        if(uID==userID)
            bkgrColor="#ff0000";
        else
            bkgrColor="#fff";
        var tile= createTile(uName,uCity,img,numRew,uID,i+1,bkgrColor);
            $(tabID).append(tile);
    }
    var uPos=results.user_position;
    if((type=="G" && uPos>20) || (type=="L" && uPos>10)){
        userTile=createTile(userFullname,userLocation,userPicture,results.userNumRev,userID,results.list.length+1,"#ff0000");
        $(tabID).append(tile);
    }
}

function createTile(uName,uCity,img,numRew,uID,i,bkgrColor){
    var tile='<div class="tile myTile" style="background: '+bkgrColor+'"> <div class="pull-left tile-side"> <span class="text-left" style="display: inline-block">'+i+'</span> <div class="avatar avatar-blue avatar-sm" style="display: inline-block;margin-left: 20px"> <img src="'+img+'"/> </div> </div> <div class="tile-inner"> <span>'+uName+','+uCity+'</span> <p style="float: right;margin: 0px;display: inline-block">PTI:'+numRew+'</p> </div> </div>';
    return tile;
}


/*Mostro la top 10 della classifica locale,contenente i reviewers che risiedono nella stessa citta' dell'utente attuale.
* Anche in questo caso,se l'utente non compare nella top 10 lo inserisco in coda.E' necessario aver effettuato il login a
* FB per la visualizzazione della classifica locale.*/
function populateLocalLeaderboard(){
    if(!loggedIn){
        toastr.error("E'necessario effettuare il login a Facebook per la visualizzazione della classifica locale!");
    }
    else if(count++==0){
        $("#progress").show();
        gapi.client.myApi.retrieveLocalLeaderboard({
            "userID": userID,
            "userLocation":userLocation
        }).execute(function (resp) {
            console.log(resp);
            $("#progress").hide();
            populateLeaderboard(resp.result,"L");
        });
    }
}