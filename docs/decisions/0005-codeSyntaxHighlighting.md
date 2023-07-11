# Syntax-Highlighting von Codeausschnitten in Guidelines
Status: accepted
* Decider: [Sebastian Brock](https://github.com/sebastianbroc)
* Date: 2023-07-11

## Kontext und Problematik
Für das Projekt ist es nötig, im Frontend Codeausschnitte anzuzeigen und dabei die Syntax des Codes hervorzuheben. Für diese Funktion ist es am naheliegendsten, ein etabliertes vorgefertigtes Modul zu verwenden.

## Optionen
* Highlight.js
* Prism.js
* Vue-Syntax-Highlight

## Entscheidung
<b>Highlight.js</b> wird zur Implementierung der Syntaxhervorhebung für Codeausschnitte im Frontend genutzt.

## Vor- und Nachteile der Optionen

### Highlight.js
* Gut, da Highlight.js ein bewährtes und weit verbreitetes npm-Modul ist, das seit vielen Jahren aktiv entwickelt wird. Es wird von einer großen Entwicklergemeinschaft unterstützt und hat eine umfangreiche Sammlung von Sprachdefinitionen, mit denen eine Vielzahl von Programmiersprachen und Dateiformaten abgedeckt werden können.
* Gut, da sich Highlight.js nahtlos in ein Vue-Frontend-Projekt integrieren lässt. Es bietet eine einfache API und erfordert keine komplexen Konfigurationen. Mit wenigen Zeilen Code kann die Syntaxhervorhebung für Codeausschnitte in unseren Vue-Komponenten aktiviert werden.
* Gut, da Highlight.js verschiedene Anpassungsmöglichkeiten bietet, um das Erscheinungsbild der Syntaxhervorhebung an unsere Designanforderungen anzupassen. Es unterstützt eine Vielzahl von Stilen und Themes, die einfach konfiguriert und angepasst werden können.
* Schlecht, da das Highlight.js-Paket etwas größer sein kann, da es Sprachdefinitionen für viele Programmiersprachen und Dateiformate enthält. Dies kann die Ladezeit des Frontends minimal erhöhen. Es sollte jedoch angemerkt werden, dass die Dateigröße durch das selektive Einbinden nur der benötigten Sprachdefinitionen minimiert werden kann.

### Prism.js
* Gut, da Prism.js ähnlich weit verbreitet wie Highlight.js ist und von einer aktiven Community unterstützt wird.
* Gut, da es eine große Palette an Programmiersprachen abdeckt und dabei trotzdem performant läuft. 
* Schlecht, da die Einbindung komplexer erfolgt, als durch Highlight.js 

### Vue-Syntax-Highlight
* Gut, da das Modul speziell für Vue entwickelt wurde und die Einbindung somit besonders einfach stattfinden können sollte.
* Schlecht, da die Entwicklercommunity kleiner als die von Highlight.js ist
* Schlecht, da es voraussichtlich nicht die gleiche Bandbreite an Programmiersprachen und Farbthemen abdecken kann wie die anderen Optionen.
