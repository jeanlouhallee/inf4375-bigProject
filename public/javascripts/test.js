$(document).ready(function() {
    $( '#submitArrondissement' ).click(function(e) {
        e.preventDefault();
        var arrondissement = $( '#field-arrondissement' ).val();
        var url = "http://localhost:3000/installations?arrondissement=" + arrondissement;
        $.getJSON(url, function(data, status){
            // alert("Data: " + data + "\nStatus: " + status)
            var items = [];
            $.each(data, function(d, results){
                items.push("<tr>"
                              +"<td>"+results.nom+"</td>"
                              +"<td>"+results.adresse+"</td>"
                              +"<td>"+results.arrondissement+"</td>"
                              +"<td>"+results.type+"</td>"+"</tr>");
            });
            var html = items.join("");
            $( '#myTable' ).append(html)
        });
    });
});
