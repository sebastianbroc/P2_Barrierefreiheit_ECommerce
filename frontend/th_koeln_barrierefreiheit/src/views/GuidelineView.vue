<template>
  <div class="guidelines">
    <NavHeader :links=this.navLinks />
    <div class="content has-gap">
    <div class="guideline">
      <div class="title"><h1>{{this.title}}</h1><img v-if="verified" src="@/assets/images/verified.png" class="verified_badge" title="Diese Guideline ist verifiziert"></div>
      <h2>von {{this.author}}</h2>
      <p>{{this.text}}</p>
    </div>
  </div>
  </div>
</template>

<script>

import NavHeader from "@/components/navHeader.vue";

export default {
  name: 'HomeView',
  components: {NavHeader},
  data(){
    return {
      navLinks: [
        {
          link: "/guidelines",
          name: "guidelines"
        }
      ],
      title: "Optimieren des DOM für Screenreader",
      author: "Thomas Schmitz",
      text: "HTML ist eine Auszeichnungssprache und muss von jedem professionellen Webentwickler beherrscht werden. Ein standardkonformes HTML-Grundgerüst erleichtert Software wie Browsern und Hilfsmitteln behinderter Nutzer die korrekte Aufbereitung einer Webseite. Bei der Barrierefreiheit geht es vor allem um ein strukturiertes und linearisierbares HTML-Grundgerüst. Erst wenn ein Dokument mit einer Auszeichnungssprache semantisch aufbereitet wird, lassen sich weitere Prinzipien von Webstandards, etwa die Trennung von Inhalt und Layout, effizient umsetzen. Diese Seite bietet einen knappen Überblick über verfügbare Layout-Techniken. HTML bietet drei grundlegende Layouttechniken.\n\nStandardkonformität setzt u.a. die Trennung von Inhalt und Layout voraus, d.h. alle Aspekte von Layout und Formatierung sind über CSS vorzunehmen; damit wird die Darstellung von Webseiten auf diverse Endgeräte erst möglich. Tabellen und Frames sind ungeeignet für eine barrierefreie Webgestaltung, weil sie die visuelle Anordnung am Bildschirm vorgeben. Bevor ein CSS-Design umgesetzt werden kann, muss die Linearisierbarkeit und Strukturierung der Inhalte im HTML vorgenommen werden. Eine weitere Voraussetzung für Barrierefreiheit ist die Berücksichtigung der Prinzipien des Progressive Enhancement, d.h. Inhalte müssen immer genutzt werden können, auch wenn ergänzende Techniken wie Bilder oder JavaScript im Browser des Nutzers nicht unterstützt werden oder abgeschaltet sind. Progressive Enhancement besagt, dass HTML stets die Grundtechnik für alle Informationen und Funktionen ist und alle weiteren Techniken, seien es CSS oder JavaScript, aber auch der Einsatz von Grafiken und anderen Objekten als optional zu betrachten sind. Die Entwicklung von Webstandards war vor allem in den 1990er rasant. Zwischenzeitlich hat sich die Verabschiedung von Webstandards stark verändert, weil veröffentlichte Webstandards auch den Praxistest bestehen müssen.\n\nDer Einsatz von gültigem HTML ist ein Teilaspekt von Barrierefreiheit. Vor allem ist der korrekte Syntax die Voraussetzung für valides HTML — ein Qualitätsmerkmal für Webentwickler. Mit dieser Tabelle können alle jemals spezifizierten HTML-Elemente in HTML 2.0, HTML 3.2, HTML 4.01, XHTML, HTML5 und HTML 5.1 nebeneinander verglichen werden. Einige Elemente gibt es nicht mehr, einige haben es nie wirklich geschafft und einige werden in der Zukunft eine neue Bedeutung bekommen. Für die Webentwicklung wird mit Accessible Rich Internet Applications (ARIA) zunächst ein Satz von Attributen bestimmt, die HTML, SVG und andere Auszeichnungssprachen mit mehr Semantik ausstatten. Diese betreffen u.a. Webanwendungen: Mit ARIA-Attributen können Widgets so ausgezeichnet werden, dass sie semantisch solchen Komponenten entsprechen, über die ein Betriebssystem verfügt, mit der Folge, dass sie von Screenreadern und anderen Hilfsmitteln besser bedient werden können. ARIA umfasst aber weitaus mehr als einige Attribute. Zunächst ist ARIA eine Spezifikation an Browser und Hilfsmittel. Darüber hinaus hat der Webstandard einen merklichen Einfluss auf HTML5 gehabt. Insgesamt geht es aber darum, dass Screenreader und andere Hilfsmittel sich auf eine spezielle Schnittstelle des Betriebssystems stützen und dass ARIA die Technik ist, die die Webentwicklung benötigt, um diese Schnittstelle sinnvoll zu bedienen.",
      verified: true
    }
  },
}
</script>
<style lang="scss" scoped>
.content {
  margin-top: 50px;
  height: 70%;
  background: white;
  max-width: $mi-vp-l;
}

.guideline{
  h1 {
    color: $mi-lila;
    margin-bottom: $xs;
  }

  h2 {
    margin-bottom: $l * 2;
  }

  p {
    font-size: $bfs-s;
    width: 90%;
    white-space: break-spaces;
  }

  .title {
    display: flex;
    align-items: center;

    img {
      margin-left: $l;
      width: 30px;
      height: 30px;
    }
  }
}


</style>
