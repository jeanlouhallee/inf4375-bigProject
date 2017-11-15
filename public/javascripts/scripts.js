$(document).ready(function() {
    $( '#submitArrondissement' ).click(function(btn) {
        btn.preventDefault();
        $('#table-content').empty();
        var arrondissement = $( '#field-arrondissement' ).val();
        var url = "http://localhost:3000/installations?arrondissement=" + arrondissement;
        $.getJSON(url, function(data, status){
            var items = [];
            $.each(data, function(err, line){
                items.push("<tr>"
                              +"<td>"+line.nom+"</td>"
                              +"<td>"+line.adresse+"</td>"
                              +"<td>"+line.arrondissement+"</td>"
                              +"<td>"+line.type+"</td>"+"</tr>");
            });
            var html = items.join("");
            $( '#table-content' ).append(html)
        });
    });
});

$(document).ready(function() {
    $( '#submitNom' ).click(function(btn) {
        btn.preventDefault();
        $('#table-content').empty();
        var nom = $( '#installations option:selected').val();
        var url = "http://localhost:3000/installations?nom=" + nom;
        $.getJSON(url, function(data, status){
            console.log(data);
            $( '#table-content' ).append("<tr>"
                          +"<td>"+data[0].nom+"</td>"
                          +"<td>"+data[0].adresse+"</td>"
                          +"<td>"+data[0].arrondissement+"</td>"
                          +"<td>"+data[0].type+"</td>"
                          +"<td>"+data[0].condition+"</td>"
                          +"</tr>")
        });
    });
});
