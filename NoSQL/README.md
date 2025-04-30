docker exec -i mongo-container mongo my_db < 2-insert


🧑‍🏫 Cours complet MongoDB - Exercices 0 à 3
0. Lister toutes les bases de données
Objectif :
Apprendre à afficher toutes les bases disponibles dans un serveur MongoDB.

Commande clé :
javascript
Copier le code
show dbs
show dbs affiche toutes les bases qui existent ET qui ont au moins un document.

Si une base est vide (pas de collections ou pas de documents), elle n’apparaît pas.

Chaque base contient au moins une collection spéciale (system.version, system.indexes, etc.).

Exemple de réponse :

lua
Copier le code
admin   0.000GB
config  0.000GB
local   0.000GB
1. Utiliser ou créer une base de données
Objectif :
Savoir se positionner dans une base de données (et la créer si elle n'existe pas).

Commande clé :
javascript
Copier le code
use my_db
use change la base de données courante.

S’il n’existe pas encore de documents/collections, MongoDB crée la base dès qu'on insère quelque chose.

Important : juste use sans insérer ne crée pas physiquement la base dans MongoDB.

Exemple de réponse :

css
Copier le code
switched to db my_db
2. Insérer un document dans une collection
Objectif :
Apprendre à insérer un document dans une collection.

Commande clé :
javascript
Copier le code
db.school.insertOne({ name: "Holberton school" })
db = la base de données actuelle.

school = la collection où insérer le document.

insertOne = insère un seul document.

Important :

Si la collection school n'existe pas, MongoDB la crée automatiquement au moment de l'insertion.

Chaque document reçoit un _id unique automatiquement.

Exemple de réponse :

json
Copier le code
{
  "acknowledged": true,
  "insertedId": ObjectId("...")
}
3. Afficher tous les documents d'une collection
Objectif :
Savoir récupérer tous les documents d'une collection.

Commande clé :
javascript
Copier le code
db.school.find()
find() sans argument = récupère tous les documents de la collection.

Si tu veux un affichage plus propre, tu peux faire :

javascript
Copier le code
db.school.find().pretty()
Exemple de réponse :

json
Copier le code
{ "_id" : ObjectId("..."), "name" : "Holberton school" }
📚 Résumé visuel rapide
Exercice	Commande principale	Que fait-on ?
0	show dbs	Voir toutes les bases existantes
1	use my_db	Aller dans une base (et la créer si besoin)
2	db.school.insertOne({name: "Holberton school"})	Ajouter un document dans une collection
3	db.school.find()	Lire tous les documents d'une collection
🧠 Petit rappel MongoDB important
Base = ensemble de collections.

Collection = ensemble de documents (équivalent d'une table SQL, mais sans schéma fixe).

Document = un objet JSON stocké dans la collection.

Chaque document a automatiquement une clé spéciale _id qui l'identifie de manière unique.