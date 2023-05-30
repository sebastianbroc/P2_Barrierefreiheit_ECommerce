<template>
  <div class="guidelines">
    <NavHeader :links=this.navLinks />
    <div class="content has-gap">
    <div class="guideline">
      <div class="title"><h1>{{guideline.title}}</h1><img v-if="guideline.verified" src="@/assets/images/verified.png" class="verified_badge" title="Diese Guideline ist verifiziert"></div>
      <h2>von {{guideline.author}}</h2>
      <p v-html="guideline.text" id="text"></p>
      <div id="annotation">
        <div v-if="activeAnnotation">
          <img :src="activeAnnotation.image">
        </div>
        <div class="annotation_content" v-if="activeAnnotation">
          <h2>{{activeAnnotation.name}}</h2>
          <p>{{activeAnnotation.text}}</p>
        </div>
        <div class="annotation_voting" v-if="activeAnnotation">
          <div class="upvote"></div>
          <p>{{activeAnnotation.score}}</p>
          <div class="downvote"></div>
        </div>
      </div>
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
      activeAnnotation: null,
      guideline: {
        title: "Optimieren des DOM für Screenreader",
        author: "Thomas Schmitz",
        text: "HTML ist eine Auszeichnungssprache und muss von <a id='999' class='annotationLink'>jedem professionellen Webentwickler beherrscht werden</a>. Ein standardkonformes HTML-Grundgerüst erleichtert Software wie Browsern und Hilfsmitteln behinderter Nutzer die korrekte Aufbereitung einer Webseite. Bei der Barrierefreiheit geht es vor allem um ein strukturiertes und linearisierbares HTML-Grundgerüst. Erst wenn ein Dokument mit einer Auszeichnungssprache semantisch aufbereitet wird, lassen sich weitere Prinzipien von Webstandards, etwa die Trennung von Inhalt und Layout, effizient umsetzen. Diese Seite bietet einen knappen Überblick über verfügbare Layout-Techniken. HTML bietet drei grundlegende Layouttechniken.\n\nStandardkonformität setzt u.a. die Trennung von Inhalt und Layout voraus, d.h. alle Aspekte von Layout und Formatierung sind über CSS vorzunehmen; damit wird die Darstellung von Webseiten auf diverse Endgeräte erst möglich. Tabellen und Frames sind ungeeignet für eine barrierefreie Webgestaltung, weil sie die visuelle Anordnung am Bildschirm vorgeben. Bevor ein CSS-Design umgesetzt werden kann, muss die Linearisierbarkeit und Strukturierung der Inhalte im HTML vorgenommen werden. Eine weitere Voraussetzung für Barrierefreiheit ist die Berücksichtigung der Prinzipien des Progressive Enhancement, d.h. Inhalte müssen immer genutzt werden können, auch wenn ergänzende Techniken wie Bilder oder JavaScript im Browser des Nutzers nicht unterstützt werden oder abgeschaltet sind. Progressive Enhancement besagt, dass HTML stets die Grundtechnik für alle Informationen und Funktionen ist und alle weiteren Techniken, seien es CSS oder JavaScript, aber auch der Einsatz von Grafiken und anderen Objekten als optional zu betrachten sind. Die Entwicklung von Webstandards war vor allem in den 1990er rasant. Zwischenzeitlich hat sich die Verabschiedung von Webstandards stark verändert, weil veröffentlichte Webstandards auch den Praxistest bestehen müssen.\n\nDer Einsatz von gültigem HTML ist ein Teilaspekt von Barrierefreiheit. Vor allem ist der korrekte Syntax die Voraussetzung für valides HTML — ein Qualitätsmerkmal für Webentwickler. Mit dieser Tabelle können alle jemals spezifizierten HTML-Elemente in HTML 2.0, HTML 3.2, HTML 4.01, XHTML, HTML5 und HTML 5.1 nebeneinander verglichen werden. Einige Elemente gibt es nicht mehr, einige haben es nie wirklich geschafft und einige werden in der Zukunft eine neue Bedeutung bekommen. Für die Webentwicklung wird mit Accessible Rich Internet Applications (ARIA) zunächst ein Satz von Attributen bestimmt, die HTML, SVG und andere Auszeichnungssprachen mit mehr Semantik ausstatten. Diese betreffen u.a. Webanwendungen: Mit ARIA-Attributen können Widgets so ausgezeichnet werden, dass sie semantisch solchen Komponenten entsprechen, über die ein Betriebssystem verfügt, mit der Folge, dass sie von Screenreadern und anderen Hilfsmitteln besser bedient werden können. ARIA umfasst aber weitaus mehr als einige Attribute. Zunächst ist ARIA eine Spezifikation an Browser und Hilfsmittel. Darüber hinaus hat der Webstandard einen merklichen Einfluss auf HTML5 gehabt. Insgesamt geht es aber darum, dass Screenreader und andere Hilfsmittel sich auf eine spezielle Schnittstelle des Betriebssystems stützen und dass ARIA die Technik ist, die die Webentwicklung benötigt, um diese Schnittstelle sinnvoll zu bedienen.",
        verified: true
      }
    }
  },
  mounted() {
    if(this.$route.query.g == 2){
      this.getGuideline()
    }

    let annoLinks = document.getElementsByClassName("annotationLink")

    for(let i in annoLinks){
      if (typeof(annoLinks[i]) === "object"){
        annoLinks[i].addEventListener("click", this.getAnnotation);
      }
    }
  },
  methods: {
    async getGuideline(){
        let result = await fetch("http://37.120.175.2:5279/Guideline", {mode: "cors"})
        result = await result.json()
        this.guideline = result[0]
    },
    getAnnotation(input){
      if(this.activeAnnotation && this.activeAnnotation.id === parseInt(input.srcElement.id)){
        document.getElementById("annotation").classList.remove("active")
        this.activeAnnotation = null;
      } else {
        //console.log(input.srcElement.id)
        //get annotation by id from api
        this.activeAnnotation = {
          id: 999,
          name: "Thomas Schmitz",
          image: "data:image/png;base64,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",
          score: 12,
          text: "Diese Textstelle finde ich verbesserungswürdig, weil lorem ipsum dolor ist und so weiter und sofort!"
        }
        document.getElementById("annotation").classList.add("active")
        console.log(input.srcElement.getBoundingClientRect())
        document.getElementById("annotation").style.top = (input.srcElement.getBoundingClientRect().y + 30).toString() + "px";
        document.getElementById("annotation").style.left = ((input.srcElement.getBoundingClientRect().x / 2)).toString() + "px";
      }
    }
  }
}
</script>
<style lang="scss">
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

  #text {
    a {
      color: black;
      background: rgb(255, 251, 150);
    }
  }

  #annotation {
    display: none;
    gap: $bfs-xs;
    align-items: center;
    padding: $bfs;
    border-radius: $bfs-xs;
    position: fixed;
    top: 0;
    left: 0;
    background: $mi-black;

    h2 {
      font-size: $bfs-l;
      color: $mi-lila;
      margin: 0 0 $bfs-xs 0;
    }

    p {
      color: white;
      margin: 0;
    }

    .annotation_voting {
      display: flex;
      flex-direction: column;
      align-items: center;

      p {
        font-size: $bfs;
        margin: 0;
      }

      .upvote {
        width: 0;
        height: 0;
        border-left: $bfs-xs solid transparent;
        border-right: $bfs-xs solid transparent;
        border-bottom: $bfs-xs solid white;
      }
      .downvote {
        width: 0;
        height: 0;
        border-left: $bfs-xs solid transparent;
        border-right: $bfs-xs solid transparent;
        border-top: $bfs-xs solid white;
      }
    }

    &.active {
      display: flex;
    }

    &:before{
      content:"";
      display:inline-block;
      border-style:solid;
      border-width:0 10px 10px 10px;
      border-color:$mi-black transparent;
      position:absolute;
      top:-10px;
      left:50%;
    }
  }
}


</style>
