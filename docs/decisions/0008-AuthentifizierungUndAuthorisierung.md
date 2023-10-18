# Authentifizierung und Authorizierung

* Status: accepted
* Workload: 1h
* Decider: [Taha S. Moujtahid](https://github.com/taha-moujtahid)
* Date: 2023-06-11

## Kontext und Problematik
Außgehend aus der Frage welche Daten wir wie bei API abfragen an das frontend liefern haben sich unterschiedliche Optionen angeboten. 

## Optionen

* Jedes Datenmodell beinhaltet lediglich die benötigten Referenzen (Ids), die dann je nach bedarf zur erneuten abfrage genutzt werden.
* Jedes Datenmodell beinhaltet alle zugehörigen Modelle (gefiltert). Dh eine Guideline liefert automatisch auch das User objekt des Autors mit etc.
* Die Verwendung von GraphQL anstelle von REST um die jeweiligen Daten bei der Anfrage "maßgeschneidert" zu erhalten.

## Entscheidung

Option 2. Die Komplexität von GraphQL übersteigt den Nutzen den wir in diesem Kontext darauß ziehen könnten. 

## Begründung

Wir verwenden nur wenige microservices/endpoints.
File upload ist ein Feature, dass wir auf jeden fall benötigen werden. (Man könnte natürlich mehrere Technologien vereinen allerdings kommt das der Standartisierung nicht zugute) 
Eine zu hohe Query Komplexität bei GraphQL.
Der Performance boost den wir durch GraphQL erreichen könnten ist in unserem usecase minimal.

## Vor- und Nachteile der Optionen

### Option 1 
* Gut, da die Umsetzung im Backend ohne weiteres erreicht werden kann.
* Gut, da die Datenstrukturen weitgehen entkoppelt werden und somit komplikationen vermieden werden können.
* Schlecht, da mehrere fetches benötigt werden an stellen an denen eins semantisch gereicht hätte.
* Schlecht, da wenig informationen darüber gegeben sind wofür Daten gefetcht werden. (bsp. User kann zur Anzeige in der Guideline abgefragt werden aber auch in der Profilanzeige => under-/overfetching) 

### Option 2

* Gut, da wir das under-/overfetching problem aufgrund der nachvollziehbarkeit, für welchen zweck die Daten gefetcht werden, backendseitig lösen können.
* Gut, da wir nur eine abfrage benötigen (performance).

### Option 3

* Gut, da es insgesamt performanter ist und möglichkeiten zur besseren skalierung geben könnte
* Schlecht, da Fileupload nicht möglich ist
* Schlecht, da Query Komplexität schnell steigt
