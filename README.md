Projet de session INF4375
=========================

Fonctionnalités à corriger
--------------------------

### A1 ###

Code placé dans **./models/data**.
L'importation s'effectue au startup de l'application.

### A2 ###

Code placé dans **./app.js** et utilise du code placé dans **./tasks.js**.

### A3 ###

Code RAML placé dans **./routes/doc** et généré dans **./routes/doc.js**.
Pour voir la doc, il faut aller à `/doc` ou naviguer sur le site web et utiliser la `navbar` (Documentation Rest).

### A4 ###

Code placé dans **./routes/installations.js**.
Il est possible d'envoyer une requête GET de la façon suivante `/installations?arrondissement=X`.

### A5 ###

Code Pug placé dans **./views/index.pug** et javascript dans **./public/javascripts/scripts.js**.
Il est possible d'aller sur la page d'accueil de l'application et d'appuyer sur le bouton `Recherche` afin de faire apparaitre le formulaire HTML qui contient la recherche par arrondissement.

### A6 ###

Code Pug placé dans **./views/index.pug** et javascript dans **./public/javascripts/scripts.js**.
Il est possible d'aller sur la page d'accueil de l'application et d'appuyer sur le bouton `Recherche` afin de faire apparaitre le formulaire HTML qui contient la liste déroulante de noms.

### C1 ###

Code placé dans **./routes/mauvaise_condition**.
Il suffit de faire une requête GET de la façon suivante `/mauvaise_condition`.

### D1, D2 & D3 ###

Le code est placé dans **./routes/installations.js** et **./public/javascripts/scripts.js**.
J'ai fait en sorte qu'il soit impossible de modifier la condition des installations qui ne sont pas des glissades (afin de respecter D1 dans mon implémentation de D3).

### F1 ###

Points importants
-----------------

* Dans l'importation des données, j'ai fait en sorte que toutes les données soient inclus. Il en est de même pour les services `REST` (sauf pour le verbe `PATCH`). Pour ce qui est de l'interface graphique `html` et du verbe `PATCH`, j'ai seulement pris en compte les champs suivants afin de réduire la lourdeur de l'apparence du wite web: id, type, nom, arrondissement, adresse et condition.
* J'ai utilisé le verbe PATCH au lieu de PUT, car l'énoncé ne spécifie pas que l'on peu créer une installation si elle n'existe pas. J'ai donc pris pour acquis qu'il est impossible de créer une nouvelle ressource.

Bogues
------

Aucun bogue à signaler pour le moment.
