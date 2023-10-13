# In welcher Reihenfolge zeigen wir Bestätigungen durch andere Experten auf Guidelines an?
Status: accepted
* Decider: [Sebastian Brock](https://github.com/sebastianbroc)
* Date: 2023-10-13

## Kontext und Problematik
Da der Platz zur Anzeige von Experten, welche eine Guideline bestätigt haben, begrenzt ist, muss die Anzahl der angezeigten Profibilder gezwungenermaßen begrenzt werden. Bisher werden maximal 5 Experten angezeigt. Nach welchem Kriterium entscheiden wir, welche unter den 5 anzuzeigenden Experten sind?

## Optionen
* Anzeige der neuesten
* Anzeige der ältesten
* Anzeige basierend auf Signifikanz des Expertenprofils

## Entscheidung
Es werden die ältesten Bestätigungen zuerst angezeigt, ab der sechst-ältesten Bestätigung ist die Bestätigung nicht mehr in der Übersicht auf der Guideline sichtbar.
Dies stellt die Lösung mit dem minimalsten Entwicklungsaufwand und dennoch den wenigsten Nachteilen dar. 

![Bild 13 10 23 um 14 31](https://github.com/sebastianbroc/P2_Barrierefreiheit_ECommerce/assets/63352229/946dc0e5-cbab-4641-9925-29533fd55bcb)


## Vor- und Nachteile der Optionen

### Anzeige der neuesten
* Vorteil: Neue Nutzer des Systems sehen unmittelbar, welchen Einfluss sie auf das System haben
* Nachteil: Die erste Bestätigung dient in gewisser Hinsicht als "Startschuss" für die Bestätigungen einer Guideline, es könnte unfair sein, diese nicht gebührend anzuzeigen.

### Anzeige der ältesten
* Vorteil: Es lohnt sich für Nutzer, neu verfasste Guidelines zu überprüfen, da ihr Profil zukünftig auch bei mehr Bestätigungen stets zu sehen sein wird
* Nachteil: Nutzer wollen unter Umständen die ersten sein, die eine Guideline bestätigen, und es wird ein falscher Anreiz gegeben, obwohl die Entscheidung zur Bestätigung einer Guideline unbiased sein sollte. Da aber davon ausgegangen werden kannn, dass die Nutzer der Plattform Personen mit Kompetenzen wissenschaftlichen Arbeitens sind, welche ihre Verantwortung, eine Guideline zu bestätigen ernst nehmen, ist dies sehr unwahrscheinlich. 

### Anzeige basierend auf Signifikanz des Expertenprofils
* Vorteil: Wenn "prestigeträchtige" Expertennutzer eine Guideline bestätigt haben, ist dies sofort erkennbar und macht eine Guideline vertrauenswürdiger
* Nachteil: Kann eine hohe Schwelle für neue Expertennutzer darstellen, sich im System bemerkbar zu machen
* Nachteil: Es existiert noch keine "Prestigewertung". Die Entwicklung dafür wäre mit Entwicklungsaufwand verbunden, und da zum Zeitpunkt dieses ADRs keine andere Funktion von einem Prestigewert profitieren könnte, würde sich der Entwicklungsaufwand vermutlich nicht lohnen.
