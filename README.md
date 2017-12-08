Projet de session INF4375
=========================

Installation du Projet
----------------------
* Il suffit de cloner le dépôt git sur un poste local. Ensuite, afin de partir l'application, il faut entrer la commande 'npm start' à la racine du projet.
* Par défaut, NODE_ENV est égal à 'development'. Pour accéder à la page d'accueil de l'application web, il faut aller sur http://localhost:3000 dans un fureteur web.

Points importants
-----------------

* Dans l'importation des données, j'ai fait en sorte que toutes les données soient inclus. Il en est de même pour les services `REST` (sauf pour le verbe `PATCH`). Pour ce qui est de l'interface graphique `html` et du verbe `PATCH`, j'ai seulement pris en compte les champs suivants afin de réduire la lourdeur de l'apparence du wite web: id, type, nom, arrondissement, adresse et condition.
* J'ai utilisé le verbe PATCH au lieu de PUT, car l'énoncé ne spécifie pas que l'on peu créer une installation si elle n'existe pas. J'ai donc pris pour acquis qu'il est impossible de créer une nouvelle ressource.
* Il est interdit de modifier la condition d'une installation si ce n'est pas une glissade.
* Comme le projet est corrigé avec NODE_ENV=development (et non en environnement de production), je n'ai implanté aucun mécanisme afin que le serveur "crash" et "restart" en cas d'erreur. Il faudrait donc le repartir manuellement en tuant le processus et entrer la commande 'npm start'.

Bogues
------

Aucun bogue à signaler pour le moment.
