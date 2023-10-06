<template>
  <div class="m-navHead">
    <div class="left-wrapper">
      <button id="icon-main-menu" class="m-navHead--hamburger" aria-label="Menu Button">
        <svg id="menu-button-wrap" width="100%" height="100%" viewBox="0 0 225 175" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" alt="burger menu button" name="burger menu button">
          <g id="menu-button" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" alt="burger menu button" name="burger menu button">
            <rect id="balken-1" fill="#9313CE" x="25" y="25" width="175" height="25"></rect>
            <rect id="balken-2" fill="#9313CE" x="25" y="75" width="175" height="25"></rect>
            <rect id="balken-3" fill="#9313CE" x="25" y="125" width="175" height="25"></rect>
          </g>
        </svg>
      </button>
      <div class="m-navHead--text">
        <router-link :to="'/'" class="hide_on_small_vp">mi&nbsp;</router-link>
        <span class="m-navHead--logoSlash" v-for="link in this.links" :key="link.link" :value="link.link">/</span>
        <span class="m-navHead--logoSlug" v-for="link in this.links" :key="link.link" :value="link.link">
          <router-link :to=link.link>&nbsp;{{link.name}}</router-link>
			</span>
      </div>
    </div>
    <div v-if="this.$store.getters.isLoggedIn && this.$store.getters.getUser" class="user">
      <p>Willkommen<br><router-link :to="'/user?u='+ this.$store.getters.getUser.id"><b>{{this.$store.getters.getUser.name}}</b></router-link>!</p>
      <p class="logout" @click="logout">Logout</p>
    </div>
  </div>
</template>

<script>
import AuthService from "@/services/AuthService";
export default {
  name: 'navHeader',
  props: {
    links: Array
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/');
    },
  },
  beforeMount(){
    if(this.$store.getters.isLoggedIn && !this.$store.getters.getUser){
      this.logout()
    }
  },
  async mounted(){
    if(this.$store.getters.isLoggedIn){
      let response = await AuthService.getUser({id: this.$store.getters.getUser.id})
      this.$store.commit('SET_USER', response.msg)
    }
  }
}
</script>
<style lang="scss" scoped>
.m-navHead {
  justify-content: space-between;
  white-space: nowrap;
}

.left-wrapper {
  display: flex;
  align-items: center;
}

.user {
  text-align: right;
  margin-right: 1rem;

  p {
    color: $mi-lila;
    font-size: 0.9rem;
    margin: 0;

    &.logout {
      color: $mi-pink;
      font-size: 0.7rem;
      cursor: pointer;
    }
  }

  a {
    color: $mi-lila;
  }
}

@media screen and (max-width: 500px) {
  .hide_on_small_vp {
    display: none;
  }

  .m-navHead--logoSlug {
    font-size: $bfs-xl;
  }
}
</style>
