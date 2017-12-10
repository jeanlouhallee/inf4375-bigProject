Projet de session INF4375
=========================

Installation du Projet
----------------------
1. Cloner le dépôt git sur un poste local.
2. Il faut ensuite exécuter la commande 'npm run task' à la racine du projet afin d'importer les données dans la base de données.
3. Ensuite, pour partir le serveur node, il faut entrer la commande 'npm start' à la racine du projet.
4. Pour accéder à la page d'accueil de l'application web, il faut aller sur http://localhost:3000 dans un fureteur web.

Points importants
-----------------

* Dans l'importation des données, j'ai fait en sorte que toutes les données soient inclus. Il en est de même pour les services `REST` (sauf pour le verbe `PATCH`). Pour ce qui est de l'interface graphique `html` et du verbe `PATCH`, j'ai seulement pris en compte les champs suivants afin de réduire la lourdeur de l'apparence du wite web: id, type, nom, arrondissement, adresse et condition.
* Il est interdit de modifier la condition d'une installation si ce n'est pas une glissade.
* Il est également possible d'aller consulter la version sur heroku : http://inf4375-projet-prod.herokuapp.com

Bogues
------

* En cas d'erreur 500, il faut repartir le serveur manuellement une fois l'erreur résolue (aucun mécanisme de recouvrement implanté).
