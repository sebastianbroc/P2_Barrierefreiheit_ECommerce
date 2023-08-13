# P2_Barrierefreiheit_ECommerce
Dieses Repo wird genutzt, um die Fortschritte des Projekts "Barrierefreiheit im E-Commerce" in der Projekt 2 - Phase gesondert festzuhalten.

Ein erster Prototyp des Frontends-Designs ist [via GitHub Pages](https://sebastianbroc.github.io/P2_Barrierefreiheit_ECommerce/#/) verfügbar

## Roadmap
![roadmap](https://github.com/sebastianbroc/P2_Barrierefreiheit_ECommerce/assets/63352229/49e88b62-986b-48bd-a2ee-58c4b50196f2)

## Getting Started 🚀
### API
Der einfachste Weg die Guideline API lokal zu installieren und zu starten ist mittels des docker-compose.yaml im /GuidelineApi/ verzeichnis.
Die jeweiligen JWT Keys, Salts usw. können selbstverständlich in der .env datei nach eigenem belieben geändert werden. 
Dabei sollte darauf geachtet werden dass die Keys Base64 Kompatibel und somit eine Zeichenlänge benötigen, die durch 4 teilbar ist.

```shell
cd GuidelineApi
docker compose up
```

### Frontend
Um das Frontend lokal auszuführen, können die folgenden befehle verwendet werden.

```shell
cd frontend/th_koeln_barrierefreiheit
yarn install
yarn serve
```
