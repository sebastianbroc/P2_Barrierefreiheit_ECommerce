# Umsetzung des Frontend-Stylings 

* Status: accepted
* Workload: 1h
* Decider: [Sebastian Brock](https://github.com/sebastianbroc)
* Date: 2023-05-01

## Kontext und Problematik

Die Wahl der richtigen Methode zur Umsetzung des Stylings ist entscheidend für die Wartbarkeit, Skalierbarkeit und Lesbarkeit des Codes. Da das System in das Design der bisherigen MI-Webseite eingebunden werden soll, sollte die Methode möglichst kompatibel mit bisher bestehendem CSS des MI-Webauftritts sein.


## Optionen

* Reines CSS
* Sass
* SCSS

## Entscheidung

Das Projekt wird mit Sass umgesetzt, da ein CSS-Präprozessor die Entwicklung von Styles deutlich vereinfachen kann, und die Styles der MI-Website zum Zeitpunkt der Entscheidung nebem purem CSS [größtenteils mit SCSS umgesetzt sind](https://github.com/th-koeln/mi-website-2018). Diese Styles können problemlos in Sass integriert werden, anschließend entstehende Sass-Styles sind zusätzlich simpler in der Syntax.

## Vor- und Nachteile der Optionen

### Reines CSS
* Gut, da es die Standard-Lösung ist, in der Regel kann jeder Web-Entwickler ohne weiteren Aufwand sofort mit CSS arbeiten.
* Gut, da davon ausgegangen werden kann, dass entwickelte Styles anschließend problemlos in anderen Systemen oder Weiterentwicklungen genutzt werden können.
* Schlecht, da CSS im Vergleich zu den anderen Optionen deutlich unstrukturierter und ineffektiver wartbar sein kann.
* Schlecht, da viele Styles der bestehenden MI-Webseite auf SCSS basieren und schlecht übernommen werden könnten.

### Sass

* Gut, da es eine erheblich bessere Lesbarkeit und Strukturierung als reines CSS bietet.
* Gut, da es sehr weit verbreitet und beliebt ist. Es kann davon ausgegangen werden, dass Sass Styles in der Zukunft in weiteren Systemen oder Erweiterungen eingesetzt werden können.
* Gut, da bestehende Styles der MI-Webseite auf SCSS basieren und problemlos in Sass integrierbar sein sollten.

### SCSS

* Gut, da es im Gegensatz zu Sass näher an reinem CSS ist und somit weniger Einarbeitungszeit benötigt
* Da bisher keine praktischen Erfahrungen in Sass bestehen, SCSS aber CSS-näher ist, ist mit SCSS vermutlich keine steile Lernkurve benötigt.
* Schlecht, da die Syntax länger als bei Sass ist und die Nutzung von Sass dies stärker "streamlinen" würde
