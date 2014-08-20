var geocoder;
var map;
var objects;

var labels=[];
var associations=[];
var markers = [];
var infowindows = [];
var colors = ["808080", "336666", "357723"];
default_location=new google.maps.LatLng(48.817348,2.371005);
var previousOpen=-1;

function initialize() {
  var mapOptions = {
    zoom: 10,
    center: default_location,
	scaleControl: true
  }
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

//functions for displaying and removing markers
function addMarker(obj) {
    lat=obj.lat
    lng=obj.lng
    descr=obj.description+"<br><a href='"+voirProjetUrl+obj.id+"'>Plus de détails...</a>"
    titre =obj.project_name
    id = obj.id
    start_date = new Date(obj.start_date*1000);
    end_date = new Date(obj.end_date*1000);
    asso = obj.association.associationName
    var content = '<b>'+titre+' ('+asso+') du '+start_date.toLocaleDateString()+' au '+end_date.toLocaleDateString()+'</b><br>'+descr
    var infowindow = new google.maps.InfoWindow({content: content, maxWidth: 500});
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(lat,lng),
      map: map,
      icon: "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|"+colors[id % colors.length],
      title: titre});
    google.maps.event.addListener(marker, 'click', function() {infowindow.open(map,marker);});
    markers[id]=marker
    infowindows[id]=infowindow
}

function setAllMap(map) {
  for (var key in markers) {
    markers[key].setMap(map);
  }
}

function deleteMarkers() {
  setAllMap(null);
  markers = [];
  infowindows = [];
}

function codeAddress(address) {
  //returns [lat, lng] from adress
    return geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(new google.maps.LatLng(results[0].geometry.location.lat(),results[0].geometry.location.lng()));
            map.setZoom(10)

      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }
  
 function showMarkers(){
    deleteMarkers()  
    var filteredDivs = $("#example div.item "); 
    $.each(filteredDivs, function (index, div) {
            addMarker(objects[parseInt(div.attr('id'))])
        });
    setAllMap(map)
    }
    
function displayProjects(data){
    deleteMarkers()
    $("#results").empty()
    $.each(data, function(idx, obj){
        addMarker(obj)
        start_date = new Date(obj.start_date*1000)
        $("#results").append("<div class='item' id='"+obj.id+
        "'>Nom du projet: "+obj.project_name+
        ", durée:"+parseInt((obj.end_date - obj.start_date)/86400.0)+" jours"+
        ", début le "+start_date.toLocaleDateString()+
        " à "+obj.city+
        ".</div>")    
    });
}

function populate(id, table, id_select, option){
    if(table.indexOf(id) == -1){
                    $(id_select).append(option)
                    table.push(id)
                }
}

$(document).ready(function() {   
    google.maps.event.addDomListener(window, 'load', initialize);
    geocoder = new google.maps.Geocoder();
    var request = $.ajax({
          url: url,
          type: "POST",
          dataType: "json"
          });
   //chargement resultats
    request.done(function( data ) {
            objects = data
            $.each(data, function(idx, obj){
                //populate label selection tool
                populate(obj.labels.id, labels, "#label_select", "<option value="+obj.labels.id+">"+obj.labels.name+"</option>")
                populate(obj.association.id, associations, "#association_select", "<option value="+obj.association.id+">"+obj.association.associationName+"</option>")
            });
            displayProjects(data)       
            //label selection tool
            $("#label_select").change(function(){
                var filteredData = $.grep(objects, function(proj, i){
                    return $("#label_select").val().indexOf(proj.labels.id+"") > -1
                });
                displayProjects(filteredData)
            });
            
            //association selection tool
            $("#association_select").change(function(){
                var filteredData = $.grep(objects, function(proj, i){
                    return $("#association_select").val().indexOf(proj.association.id+"") > -1
                });
                filteredData.sort(function(a,b){})
                /*Sort function
                Less than 0: Sort "a" to be a lower index than "b"
 Zero: "a" and "b" should be considered equal, and no sorting performed.
 Greater than 0: Sort "b" to be a lower index than "a".
 */
                displayProjects(filteredData)
            });
            
                //centrer la carte sur ce projet et ouvrir l'infowindow
            $("#results div.item ").click( function() {
                var i = parseInt($(this).attr('id'))
                map.setCenter(markers[i].getPosition());
                if(previousOpen != -1){infowindows[previousOpen].close();}
                infowindows[i].open(map,markers[i]);
                previousOpen = i
            });  
            
           //showMarkers()
            
            $("#loading").fadeOut()    
            $("#results").fadeIn()    
        
        });
        
   // request.fail(function( jqXHR, textStatus ) {
   //   $('#results').html( "Request failed: " + textStatus+jqXHR.status );
    //  $("#loading").fadeOut()    
   //   $("#results").fadeIn()  
   // });
    
    $("#loc_submit").click(function(){
        if($("#loc").val() !=""){
            codeAddress($("#loc").val());
        }
    });
    
    $("#loc").keyup(function(event){
    if(event.keyCode == 13){
        $("#loc_submit").click();
    }
});
    
    
      
    });