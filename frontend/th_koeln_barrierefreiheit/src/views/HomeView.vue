<template>
  <div class="home">
    <div class="cover-text">
      <NavHeader :links="this.navLinks" style="margin-right: 1rem;"/>
      <div class="title_wrapper">
        <h1>Deine Anlaufstelle für alles,<br>was <b>Barrierefreiheit im Web</b> angeht.</h1>
      </div>
    </div>
    <div class="content has-gap">
      <div class="m-mi-textblock has-seperator">
        <h2 class="mi-chapter-title is-colorful">Willkommen!</h2>
        <p>Die Accessibility-Plattform der TH Köln wurde 2023 ins Leben gerufen, um das Thema der Barrierefreiheit im Web einfacher, zugänglicher und kollaborativer für alle zu machen! Durch ein Netzwerk aus qualifizierten Experten wird das Schwarmbewusstsein genutzt, um individuelle Probleme zu behandeln, Fragen zu klären und Wissen für die (Web-)Entwicklung weiterzugeben. Diese Plattform soll als Ort des Austausches und des Lernens fungieren, um das Web für alle etwas barrierefreier zu machen!</p>
        <p>Das Projekt entstand unter Ausblick auf den <a href="https://ec.europa.eu/social/main.jsp?catId=1202&intPageId=5581&langId=en">European Accessibility Act</a>, welcher vorgibt, dass ab Juni 2025 eine Vielzahl von Angeboten im Web barrierefrei gestaltet werden müssen.</p>
      </div>
      <div class="m-mi-textblock">
        <h2 class="mi-chapter-title is-colorful">Du bist Experte?</h2>
        <p>Solltest <b>du</b> über Fachwissen rund um das Thema Barrierefreiheit verfügen, bist du herzlich eingeladen, dich als Experte auf der Barrierefreiheits-Plattform zu registrieren und dein Fachwissen zu teilen! Experten können Guidelines alleine oder gemeinsam verfassen, Frontend-Komponenten in der Component-Library anlegen, sowie die Inhalte anderer Experten als "bestätigt" kennzeichnen. Ab 5 Bestätigungen durch andere Experten gilt deine Guideline als bestätigt und erhält den begehrten lila Haken!</p>
      </div>
      <div class="m-mi-textblock has-seperator">
        <h2 class="mi-chapter-title is-colorful">Du bist (noch) kein Experte?</h2>
        <p>Auch als Nicht-Expertennutzer erhältst du Möglichkeiten, Wissen beizutragen und an Inhalten mitzuwirken! So können beispielsweise Annotationen zu Textstellen von Guidelines erstellt, und anschließend von anderen Nutzern bewertet werden. Textverbesserungen, technische Veränderungen durch Neuheiten oder andere Umstände können so stets in den Guidelines repräsentiert werden. Dadurch wird gewährleistet, dass die Inhalte stets auf dem aktuellsten Stand sind. </p>
      </div>
      <div class="m-mi-textblock">
        <h2 class="mi-chapter-title is-colorful">Wo kann ich loslegen?</h2>
        <p>Dein Interesse ist geweckt? Du bist herzlich eingeladen, Teil des Netzwerks zu werden!<br>Tausche dich aus, erweitere dein Wissen und trage zu etwas bei, was das Netz allen etwas zugänglicher macht.<br>Wir können es kaum erwarten, dich einen Teil der Plattform zu nennen - <b>los geht's</b>.</p>
      </div>
    </div>
    <div class="footer">
      <button @click="$router.push('/login')">Hier geht's los!</button>
    </div>
  </div>
</template>

<script>

import NavHeader from "@/components/navHeader.vue";

export default {
  name: 'HomeView',
  components: {NavHeader},
  mounted(){
    if (this.$store.getters.isLoggedIn) this.$router.push("/menu")
  },
  data(){
    return {
      navLinks: [
        {
          link: "/",
          name:"accessibility"
        }
      ]
    }
  },
}
</script>
<style lang="scss" scoped>
:deep(.m-navHead) {
  margin-top: 0;

  a {
    color: $mi-hellgrau;
  }

  a:hover {
    color: $mi-pink;
  }
}


.cover-text {
  padding: $bfs * 2 0 $bfs * 6 0;
  background: linear-gradient(to top, rgba(140, 20, 197, 0.5), rgba(0,0,0,1)), url('@/assets/images/code.jpg');
  background-size: cover;
  border-bottom: solid 3px #00ad2f;

  .title_wrapper{
    display: flex;
    justify-content: center;
  }

  h1 {
    text-align: center;
    color: $mi-hellgrau;
    text-shadow: 2px 2px 10px black;
    padding: $xs;
    white-space: nowrap;
    overflow: hidden;
    animation:
        typing 3.5s steps(50, end)
  }

  /*
  b {
    color: $mi-pink;
  }*/
}

@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

/* The typewriter cursor effect */
@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: white; }
}

.content {
  margin-top: 50px;
  height: 70%;
  background: white;
}

.footer {
  padding: $bfs * 6 0 $bfs * 6 0;
  background: none;
  @media screen and (min-width: 730px){
    background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(147,19,206,0)), url('@/assets/images/arrows.png');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }

  display: flex;
  justify-content: center;

  button {
    font-family: RobotoSlab, sans-serif;
    font-size: $bfs-l;
    background: $mi-pink;
    color: white;
    padding: $bfs-s;
    border-radius: 10px;
    cursor: pointer;
  }

  button:hover {
    box-shadow: 0px 0px 5px black;
  }
}

@media screen and (max-width: 500px){
  .cover-text {
    padding-bottom: $bfs-xl;
  }

  h1 {
    font-size: $bfs;
    margin-bottom: 0;
  }
}

</style>
