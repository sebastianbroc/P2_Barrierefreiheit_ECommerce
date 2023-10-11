# Wie gehen wir mit Annotationskonflikten um?
Status: accepted
* Decider: [Sebastian Brock](https://github.com/sebastianbroc)
* Date: 2023-10-11

## Kontext und Problematik
Es kann vorkommen, dass zwei Nutzer eine Annotation zur gleichen Textstelle angeben wollen, oder sich der von Ihnen markierte Bereich überschneidet. Wie sollte das System in dem Fall reagieren?

## Optionen
* Vollständig Unterbinden
* Nur vollständig gleiche Textabschnitte unterbinden
* Beide Annotationen anzeigen, auch bei kleiner Schnittstelle (zB Listenansicht)

## Entscheidung
Aus Konzeptionierungs- und Entwicklungs-Zeitgründen wird es vollständig unterbunden, Annotationen zu Textstellen zu verfassen, welche bereits eine Annotation besitzen. 
Unter Umständen kann diese Funktionalität aber in der Zukunft umgesetzt werden.

## Vor- und Nachteile der Optionen

### Vollständig unterbinden
* Gut, da Entwicklungsaufwand minimal
* Gut, da Potenzial für Verwirrung seitens des Lesers der Guideline minimiert wird
* Schlecht, da der Input eines Nutzers verhindert wird und an dieser Stelle blockiert wird, evtl neues Wissen beizutragen

### Nur identische unterbinden
* Gut, da so die Anzahl der Fälle reduziert wird, in welchen ein Nutzerbeitrag verhindert wird 
* Schlecht, da der Umgang bei Überschneidung von min. 1 Wort fraglich wäre. Er erfordert Entwicklungsaufwand und kann zu Verwirrungen führen. (zB Was passiert, wenn ein Wort angeklickt wird, welches Teil von 2 Annotationen ist?)
* Schlecht, da Entwicklungsaufwand für Konzeptionierung der Darstellung und Implementierung im Prototypen gefordert wird

### Beide anzeigen
* Gut, da in keinem Fall Nutzer-Input unterbunden wird und Beiträge stets vom System aufgenommen werden können
* Schlecht, da es Verwirrungspotenzial und <i>visuellen Clutter</i> verursachen kann (zB Nutzer klickt auf ein gelb markiertes Wort und zwei Annotationen erscheinen)
* Schlecht, da Entwicklungsaufwand für Konzeptionierung der Darstellung und Implementierung im Prototypen gefordert wird
