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
                              +"<td>"+line.type+"</td>"
                              +"<td>"+line.condition+"</td>"
                              +"</tr>");
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
        var id = $( '#installations option:selected').val();
        var url = "http://localhost:3000/installations/" + id;
        $.getJSON(url, function(data, status){
            var items = [];
            $.each(data, function(err, line){
                items.push("<tr>"
                              +"<td>"+line.nom+"</td>"
                              +"<td>"+line.adresse+"</td>"
                              +"<td>"+line.arrondissement+"</td>"
                              +"<td>"+line.type+"</td>"
                              +"<td>"+line.condition+"</td>"
                              +"</tr>");
            });
            var html = items.join("");
            $( '#table-content' ).append(html)
        });
    });
});
