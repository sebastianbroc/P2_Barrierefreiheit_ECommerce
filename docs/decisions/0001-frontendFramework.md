# Framework to use for "ARlebnispfade"

* Status: accepted
* Workload: 1h
* Decider: [Sebastian Brock](https://github.com/sebastianbroc)
* Date: 2023-05-01

## Kontext und Problematik

Da bekannt ist, dass das Frontend dynamisch Informationen anzeigen können muss und Ansichten eigene Logik beinhalten werden, ist es sinnvoll, das Frontend basierend auf einem Framework zu entwickeln. Dafür muss ein Framework gewählt werden.


## Optionen

* [React](https://react.dev)
* [Vue](https://vuejs.org)
* [Angular](https://angular.io)

## Entscheidung

Das Projekt wird mit Vue.Js umgesetzt, da hier bereits Vorwissen vorhanden ist, der LiveEditor Prototyp anhand Vue umgesetzt wurde, und die "Standard-Sprachen" HTML und CSS sehr einfach zu integrieren sind.

## Vor- und Nachteile der Optionen

### React

* Gut, da es sehr beliebt und weit verbreitet ist
* Gut, da die Nutzung der Sprache JSX zur Definition von UI möglich ist, und die Arbeit mit Komponenten erleichtert wird
* Schlecht, da bisher keine praktische Erfahrung, daher Einarbeitungsphase nötig
* Schlecht, da nicht so leichtgewichtig und schnell wie Vue

### Vue

* Gut, da es sehr weit verbreitet ist, es gibt viele Ressourcen im Web
* Gut, da Vorwissen vorhanden ist. (lediglich in Vue 2, wenn das Projekt mit Vue 3 umgesetzt wird, kann hier trotzdem der Horizont etwas erweitert werden)
* Gut, da die Template-basierte Syntax die Integration von HTML und CSS einfach macht.
* Gut, da es kleiner und leichtgewichtiger als React und Angular ist und zu schnelleren Ladezeiten führen kann.

### Angular

* Gut, da Angular ein komplettes Gesamtpaket für die Erstellung von Web-Anwendungen bietet
* Schlecht, da bisher keine praktische Erfahrung
* Schlecht, da allgemein von einer steileren Lernkurve als bei anderen Frontend-Frameworks die Rede ist
* Schlecht, da es für simple Projekte "überdimensioniert" sein kann. Es bietet eine große Menge an Tools und Bibliotheken, aber diese sind unter Umständen nicht benötigt.