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

$(document).ready( function () {
    $(document).on("click", ".editButton", function () {
           var id = $(this).attr('data-id');
           $.ajax({
               url: 'http://localhost:3000/installations/' + id,
               method: 'GET'
           }).success(function(response) {
               // Populate the form fields with the data returned from server
               $('#installationForm')
                   .find('[name="id"]').val(response._id).end()
                   .find('[name="nom"]').val(response.nom).end()
                   .find('[name="type"]').val(response.adresse).end()
                   .find('[name="arrondissement"]').val(response.arrondissement).end();

               // Show the dialog
               bootbox
                   .dialog({
                       title: 'Edit an installation',
                       message: $('#installationForm'),
                       show: false // We will show it manually later
                   })
                   .on('shown.bs.modal', function() {
                       $('#installationForm')
                           .show()                             // Show the login form
                        //    .formValidation('resetForm'); // Reset form
                   })
                   .on('hide.bs.modal', function(e) {
                       // Bootbox will remove the modal (including the body which contains the login form)
                       // after hiding the modal
                       // Therefor, we need to backup the form
                       $('#installationForm').hide().appendTo('body');
                   })
                   .modal('show');
       });
    });
});

$(document).ready(function() {
    $( '#submitArrondissement' ).click(function(btn) {
        btn.preventDefault();
        $('#myTable').empty();
        var arrondissement = $( '#field-arrondissement' ).val();
        var baseUrl = window.location.protocol + "//" + window.location.host + "/";
        var url = baseUrl + "installations?arrondissement=" + arrondissement;
        $.getJSON(url, function(data, status){
            var items = [];
            items.push("<thead></tr><tr><th>"+"Id"+"</th>"
            + "<th>"+"Nom"+"</th>"
            + "<th>"+"Adresse"+"</th>"
            + "<th>"+"Arrondissement"+"</th>"
            + "<th>"+"Type"+"</th>"
            + "<th>"+"Condition"+"</th>"
            + "<th>"+"Edit"+"</th></tr></thead><tbody>");
            $.each(data, function(err, line){
                items.push("<tr>"
                +"<td>"+cleanOutput(line._id)+"</td>"
                +"<td>"+cleanOutput(line.nom)+"</td>"
                +"<td>"+cleanOutput(line.adresse)+"</td>"
                +"<td>"+cleanOutput(line.arrondissement)+"</td>"
                +"<td>"+cleanOutput(line.type)+"</td>"
                +"<td>"+cleanOutput(line.condition)+"</td>"
                + "<td><button type='button' data-id=" + line._id + " class='editButton'>Edit</button>"
                +"</tr>");
            });
            items.push("</tbody>");
            var html = items.join("");
            $( '#myTable' ).append(html);
            $('#searchModal').modal('toggle');
        });
    });
});

$(document).ready(function() {
    $( '#submitNom' ).click(function(btn) {
        btn.preventDefault();
        $('#myTable').empty();
        var nom = $( '#installations option:selected').val();
        var baseUrl = window.location.protocol + "//" + window.location.host + "/";
        var url = baseUrl + "installations?nom=" + nom;
        $.getJSON(url, function(data, status){
            var items = [];
            items.push("<thead></tr><tr><th>"+"Id"+"</th>"
            + "<th>"+"Nom"+"</th>"
            + "<th>"+"Adresse"+"</th>"
            + "<th>"+"Arrondissement"+"</th>"
            + "<th>"+"Type"+"</th>"
            + "<th>"+"Condition"+"</th>"
            + "<th>"+"Edit"+"</th></tr></thead><tbody>");
            $.each(data, function(err, line){
                items.push("<tr>"
                +"<td>"+cleanOutput(line._id)+"</td>"
                +"<td>"+cleanOutput(line.nom)+"</td>"
                +"<td>"+cleanOutput(line.adresse)+"</td>"
                +"<td>"+cleanOutput(line.arrondissement)+"</td>"
                +"<td>"+cleanOutput(line.type)+"</td>"
                +"<td>"+cleanOutput(line.condition)+"</td>"
                + "<td><button type='button' data-id=" + line._id + " class='editButton'>Edit</button>"
                +"</tr>");
            });
            items.push("</tbody>");
            var html = items.join("");
            $( '#myTable' ).append(html);
            $('#searchModal').modal('toggle');
        });
    });
});

var cleanOutput = function(string){
    if(!string){
        return "N/A"
    }
    return string
}
