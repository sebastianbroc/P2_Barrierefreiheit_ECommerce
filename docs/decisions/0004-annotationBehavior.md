# Wie verhalten sich Annotationen im Frontend? 

* Status: accepted
* Decider: [Sebastian Brock](https://github.com/sebastianbroc)
* Date: 2023-07-05

## Kontext und Problematik

Wenn ein gelb markierter Text (Hinweis auf eine Annotation zu dieser Textstelle) in einer Guideline angeklickt wird, muss die Annotation unmittelbar unter der Textstelle angezeigt, und Interaktionen mit dieser möglichst intuitiv gestaltet werden. 


## Entscheidung

Da eine Annotation je nach Viewport-Größe, Textlänge etc. immer an unterschiedlichen Positionen auf der Seite angezeigt werden kann, wird die Position der Annotation im Frontend via der `getBoundingClientRect()` Funktion aus der Position des markierten Textes ermittelt.
Wenn die Annotation dabei via `position: absolute` platziert wurde, konnte sie sich zwar beim Scrollen mitbewegen, aber die Position war je nach Viewport-Größe falsch.
Durch `position: fixed` wird gewährleistet, dass die Annotation stets an der korrekten Position dargestellt wird, aber sie kann nicht mitscrollen und bleibt fest an der gesetzten Position auf der Seite stehen.

Aus diesem Grund wurde ein eventListener hinzugefügt, welcher die Annotation auf `display: none` setzt, sobald der Nutzer scrollt. Dies behebt zum einen das Problem, dass die Annotation über dem scrollenden Text "schwebt" und zum anderen ist es hinsichtlich der Interaktion sinnvoll, dass die Annotation automatisch verschwindet, damit der Nutzer den Text der Guideline weiterlesen kann.

Somit sind aus einem ursprünglichen Nachteil durch diese Implementierung zweierlei Vorteile entstanden.
