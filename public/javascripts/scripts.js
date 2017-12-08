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
//

$(document).ready( function () {
  $(document).on("click", "#updateButton", function () {
    var id = $('#installationForm').find('[name="id"]').val();
    var mongoUpdateBody = createJsonObjectForMongoUpdate($('#installationForm').serializeArray());
    $.ajax({
      url: '/installations/' + id,
      type: 'PATCH',
      contentType: "application/json; charset=utf-8",
      data: mongoUpdateBody,
    }).done(function(){
      alert("Installation " + id + " updated successfuly!");
      document.location = '/';
    }).fail(function(jqXHR, textStatus, error){
      errorAlert(jqXHR.status);
    });
  });
});

$(document).ready( function () {
  $(document).on("click", ".deleteButton", function () {
    var id = $(this).attr('data-id');
    $.ajax({
      url: '/installations/' + id,
      type: 'DELETE',
    }).done(function(){
      alert("data deleted!");
      document.location = "/";
    }).fail(function(jqXHR, textStatus, error){
      errorAlert(jqXHR.status);
    });
  });
});

$(document).ready( function () {
  $(document).on("click", ".editButton", function () {
    var id = $(this).attr('data-id');
    $.ajax({
      url: '/installations/' + id,
      type: 'GET',
    }).done(function(response){
      let isNotGlissade = response.type !== "Glissade";
      $('#installationForm')
      .find('[name="id"]').val(response._id).end()
      .find('[name="type"]').val(response.type).end()
      .find('[name="nom"]').val(response.nom).end()
      .find('[name="adresse"]').val(response.adresse).end()
      .find('[name="arrondissement"]').val(response.arrondissement).end()
      .find('[name="condition"]').val(cleanOutput(response.condition)).end()
      .find('[name="condition"]').attr('disabled', isNotGlissade);
    })
  });
});

$(document).ready(function() {
  $( '#submitArrondissement' ).click(function(btn) {
    btn.preventDefault();
    $('#myTable').empty();
    var arrondissement = $( '#field-arrondissement' ).val();
    $.ajax({
      url: '/installations?arrondissement=' + arrondissement,
      type: 'GET',
    }).done(function(data){
      var items = [];
      items.push("<thead></tr><tr><th>"+"Id"+"</th>"
      + "<th>"+"Nom"+"</th>"
      + "<th>"+"Adresse"+"</th>"
      + "<th>"+"Arrondissement"+"</th>"
      + "<th>"+"Type"+"</th>"
      + "<th>"+"Condition"+"</th>"
      + "<th>"+"Edit"+"</th>"
      + "<th>"+"Delete"+"</th></tr></thead><tbody>");
      $.each(data, function(err, line){
        items.push("<tr>"
        +"<td>"+cleanOutput(line._id)+"</td>"
        +"<td>"+cleanOutput(line.nom)+"</td>"
        +"<td>"+cleanOutput(line.adresse)+"</td>"
        +"<td>"+cleanOutput(line.arrondissement)+"</td>"
        +"<td>"+cleanOutput(line.type)+"</td>"
        +"<td>"+cleanOutput(line.condition)+"</td>"
        + "<td><button type='button' data-id=" + line._id + " class='btn btn-primary editButton' data-toggle='modal' data-target='#installationModal'>Edit</button>"
        + "<td><button type='button' data-id=" + line._id + " class='btn btn-primary btn-danger deleteButton'>Delete</button>"
        +"</tr>");
      });
      items.push("</tbody>");
      var html = items.join("");
      $( '#myTable' ).append(html);
      $('#searchModal').modal('toggle');
    }).fail(function(jqXHR, textStatus, error){
      errorAlert(jqXHR.status);
    });
  });
});

$(document).ready(function() {
  $( '#submitNom' ).click(function(btn) {
    btn.preventDefault();
    $('#myTable').empty();
    var nom = $( '#installations option:selected').val();
    $.ajax({
      url: '/installations?nom=' + nom,
      type: 'GET',
    }).done(function(data){
      var items = [];
      items.push("<thead></tr><tr><th>"+"Id"+"</th>"
      + "<th>"+"Nom"+"</th>"
      + "<th>"+"Adresse"+"</th>"
      + "<th>"+"Arrondissement"+"</th>"
      + "<th>"+"Type"+"</th>"
      + "<th>"+"Condition"+"</th>"
      + "<th>"+"Edit"+"</th>"
      + "<th>"+"Delete"+"</th></tr></thead><tbody>");
      $.each(data, function(err, line){
        items.push("<tr>"
        +"<td>"+cleanOutput(line._id)+"</td>"
        +"<td>"+cleanOutput(line.nom)+"</td>"
        +"<td>"+cleanOutput(line.adresse)+"</td>"
        +"<td>"+cleanOutput(line.arrondissement)+"</td>"
        +"<td>"+cleanOutput(line.type)+"</td>"
        +"<td>"+cleanOutput(line.condition)+"</td>"
        + "<td><button type='button' data-id=" + line._id + " class='btn btn-primary editButton' data-toggle='modal' data-target='#installationModal'>Edit</button>"
        + "<td><button type='button' data-id=" + line._id + " class='btn btn-primary btn-danger deleteButton'>Delete</button>"
        +"</tr>");
      });
      items.push("</tbody>");
      var html = items.join("");
      $( '#myTable' ).append(html);
      $('#searchModal').modal('toggle');
    }).fail(function(jqXHR, textStatus, error){
        errorAlert(jqXHR.status);
    });
  });
});

var errorAlert = function(status) {
  switch (status){
    case 400:
      alert("Bad Request. Is a field empty?\nError status: " + status);
      break;
    case 404:
      alert("Not found\nError status: " + status);
      break;
    case 500:
      alert("Internal server error\nError status: " + status);
      break;
  }
}

var cleanOutput = function(string) {
  if(!string){
    return "N/A"
  }
  return string
}

var createJsonObjectForMongoUpdate = function(data) {
  var result = {};
  console.log(data);
  for (var i = 0; i < data.length; i++) {
      result[data[i].name] = data[i].value;
    }
    console.log(result);
    if(result.type !== "Glissade"){
        delete result.condition;
    }
    delete result.type;
    console.log(result);
  return JSON.stringify(result);
}
