//- Copyright 2017 Jean-Lou Hallée.
//-
//- Licensed under the Apache License, Version 2.0 (the "License");
//- you may not use this file except in compliance with the License.
//- You may obtain a copy of the License at
//-
//-      http://www.apache.org/licenses/LICENSE-2.0
//-
//- Unless required by applicable law or agreed to in writing, software
//- distributed under the License is distributed on an "AS IS" BASIS,
//- WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//- See the License for the specific language governing permissions and
//- limitations under the License.

$(document).ready(function() {
    $( '#submitArrondissement' ).click(function(btn) {
        btn.preventDefault();
        $('#myTable').empty();
        var arrondissement = $( '#field-arrondissement' ).val();
        var url = "http://localhost:3000/installations?arrondissement=" + arrondissement;
        $.getJSON(url, function(data, status){
            var items = [];
            items.push("<thead></tr><tr><th>"+"Id"+"</th>"
                        + "<th>"+"Nom"+"</th>"
                        + "<th>"+"Adresse"+"</th>"
                        + "<th>"+"Arrondissement"+"</th>"
                        + "<th>"+"Type"+"</th>"
                        + "<th>"+"Condition"+"</th></tr></thead><tbody>");
            $.each(data, function(err, line){
                items.push("<tr>"
                        +"<td>"+cleanOutput(line._id)+"</td>"
                        +"<td>"+cleanOutput(line.nom)+"</td>"
                        +"<td>"+cleanOutput(line.adresse)+"</td>"
                        +"<td>"+cleanOutput(line.arrondissement)+"</td>"
                        +"<td>"+cleanOutput(line.type)+"</td>"
                        +"<td>"+cleanOutput(line.condition)+"</td>"
                        +"</tr>");
            });
            items.push("</tbody>");
            var html = items.join("");
            $( '#myTable' ).append(html);
            $('#myModal').modal('toggle');
        });
    });
});

$(document).ready(function() {
    $( '#submitNom' ).click(function(btn) {
        btn.preventDefault();
        $('#myTable').empty();
        var nom = $( '#installations option:selected').val();
        var url = "http://localhost:3000/installations?nom=" + nom;
        $.getJSON(url, function(data, status){
            var items = [];
            items.push("<thead></tr><tr><th>"+"Id"+"</th>"
                        + "<th>"+"Nom"+"</th>"
                        + "<th>"+"Adresse"+"</th>"
                        + "<th>"+"Arrondissement"+"</th>"
                        + "<th>"+"Type"+"</th>"
                        + "<th>"+"Condition"+"</th></tr></thead><tbody>");
            $.each(data, function(err, line){
                items.push("<tr>"
                            +"<td>"+cleanOutput(line._id)+"</td>"
                            +"<td>"+cleanOutput(line.nom)+"</td>"
                            +"<td>"+cleanOutput(line.adresse)+"</td>"
                            +"<td>"+cleanOutput(line.arrondissement)+"</td>"
                            +"<td>"+cleanOutput(line.type)+"</td>"
                            +"<td>"+cleanOutput(line.condition)+"</td>"
                            +"</tr>");
            });
            items.push("</tbody>");
            var html = items.join("");
            $( '#myTable' ).append(html);
            $('#myModal').modal('toggle');
        });
    });
});

var cleanOutput = function(string){
    if(!string){
        return "N/A"
    }
    return string
}
