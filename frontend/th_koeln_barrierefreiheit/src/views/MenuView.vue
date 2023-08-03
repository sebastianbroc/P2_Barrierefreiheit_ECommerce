<template>
  <div class="guidelines">
    <NavHeader :links=this.navLinks />
    <div class="content has-gap">
      <div class="sections">
        <router-link to="/guidelines" class="section" id="guidelines">
          <h3>Guidelines</h3>
          <p>Hier kannst du auf die Guidelines zugreifen und dein Wissen erweitern!</p>
        </router-link>
        <router-link to="/guidelines" class="section" id="components">
          <h3>Komponenten</h3>
          <p>Erhalte Zugriff auf eine breit gefächerte Bibliothek aus vorgefertigten Frontend-Komponenten, welche Barrierefreiheits-Richtlinien garantiert erfüllen!</p>
        </router-link>
        <router-link to="/guidelines" class="section" id="editor">
          <h3>Editor</h3>
          <p>Verfasse eine Guideline und teile neues Wissen mit der Welt.</p>
        </router-link>
        <router-link :to="'/user?u='+ this.$store.getters.getUser.id" class="section" id="user">
          <h3>Profil</h3>
          <p>Passe deine Daten an.</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>

import NavHeader from "@/components/navHeader.vue";

export default {
  name: 'MenuView',
  components: {NavHeader},
  data() {
    return {
      navLinks: [
        {
          link: "/menu",
          name: "übersicht"
        }
      ]
    }
  },
  mounted() {
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.content {
  margin-top: 50px;
  height: 70%;
  background: white;
  max-width: $mi-vp-l;
}

.sections {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $bfs-l;
  width: 80vw;
  padding-bottom: 100px;

  .section {
    display: flex;
    flex-direction: column;
    background: $mi-black;
    height: 200px;
    transition: ease 0.2s;
    overflow: hidden;
    background-size: cover !important;
    background-position: center !important;
    grid-column: auto / span 2;

    &#guidelines {
      background: linear-gradient(to top, rgba(147,19,206,0.5), rgba(0,0,0,1)), url('@/assets/images/section_teaser/guideline_teaser.jpg');
    }
    &#components {
      background: linear-gradient(to top, rgba(147,19,206,0.5), rgba(0,0,0,1)), url('@/assets/images/section_teaser/components_teaser.jpg');
    }
    &#editor {
      background: linear-gradient(to top, rgba(147,19,206,0.5), rgba(0,0,0,1)), url('@/assets/images/section_teaser/editor_teaser.jpg');
    }
    &#user {
      background: linear-gradient(to top, rgba(147,19,206,0.5), rgba(0,0,0,1)), url('@/assets/images/section_teaser/profile_teaser.jpg');
    }

    &#user, &#editor {
      grid-column: auto / span 1;
    }

    h3 {
      font-size: $bfs-xxl;
      color: $mi-pink;
      padding: $bfs-s;
      padding-bottom: 0;
      margin: 0;
    }

    p {
      font-size: 0.8rem;
      color: white;
      padding: $bfs-s;
      @media screen and (min-width: 700px) {
        width: 50%;
      }
    }

    &:hover {
      transform: scale(105%);
      box-shadow: 0 10px 10px rgba(0,0,0,0.5);
    }
  }
}

@media screen and (max-width: 500px) {
  .sections {
    width: 92vw;

    .section {
      h3 {
        font-size: $bfs-xl;
        word-break: break-all;
        hyphens: auto;
      }
    }
  }
}
</style>
