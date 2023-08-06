<template>
  <div class="guidelines">
    <NavHeader :links=this.navLinks />
    <div class="content has-gap">
      <div class="navbar">
        <select name="category" id="category" @change="getGuidelines">
          <option value="" selected>Alle Kategorien</option>
          <option value="sight">Sehbehinderungen</option>
          <option value="audio">Hörbehinderungen</option>
          <option value="movement">Mobilitätseinschränkungen</option>
          <option value="examples">Beispielguidelines</option>
        </select>
        <router-link to="/editor?new=true">Neue Guideline verfassen</router-link>
        <!--<input type="text" name="search" id="search" placeholder="Suche">-->
      </div>
      <div class="guideline_list">
        <router-link :to="'/guideline?g=' + guideline.guideline_id" class="guideline" v-for="guideline in guidelines" :key="guideline.id" :value="guideline.id">
          <div class="top_row">
            <h2>{{guideline.title}}</h2>
            <div class="approvements">
              <div class="approvement_list" v-if="guideline.approvements">
                <router-link v-for="approvement in guideline.approvements.slice(0, 5)" :to="'/user?u=' + approvement.userId" :key="approvement.userId" :value="approvement.userId"><img :src=approvement.image><p class="expert_name">{{approvement.name}}</p></router-link>
                <img v-if="guideline.approvements && guideline.approvements.length >= 5" src="@/assets/images/verified.png" class="verified_badge" title="Diese Guideline ist verifiziert">
                <img v-if="!guideline.approvements || guideline.approvements.length < 1" src="@/assets/images/warning.png" class="no_approvements" title="Diese Guideline wurde noch nicht bestätigt">
              </div>
              <h3 v-if="guideline.approvements && guideline.approvements.length > 0">durch <b>{{guideline.approvements.length}}</b> Experten bestätigt</h3>
              <h3 v-if="guideline.approvements && guideline.approvements.length < 1">noch nicht bestätigt</h3>
            </div>
          </div>
          <p>{{truncate(stripHTML(guideline.text))}}</p>
        </router-link>
      </div>
  </div>
  </div>
</template>

<script>

import AuthService from "@/services/AuthService";
import NavHeader from "@/components/navHeader.vue";
import { set } from 'idb-keyval'

export default {
  name: 'UserGuidelineOverview',
  components: {NavHeader},
  data(){
    return {
      navLinks: [
        {
          link: "/guidelines",
          name: "deine guidelines"
        }
      ],
      guidelines: []
    }
  },
  async mounted(){
    await this.getGuidelines();
  },
  methods : {
    async getGuidelines(category = null){
      let selected = null
      if(category && category.target){
        selected = category.target.options[category.target.options.selectedIndex].value
      } else {
        selected = category
      }
      await set("selectedCategory", selected)
      this.setSelectField(selected);

      if(selected && selected === "examples"){
        this.guidelines = this.guidelineExamples
      } else { //get guidelines from api
        let data = {
          "author_id" : this.$store.getters.getUser.id
        }

        let result = await AuthService.getUserGuidelines(data)
        this.guidelines = result.msg
        console.log(this.guidelines)
      }
    },
    setSelectField(selected) {
      let select = document.getElementById("category");
      for(let i in select.options) {
        if (select.options[i].value === selected) {
          select.options[i].selected = true;
        }
      }
    },
    stripHTML(html){
      let tmp = document.createElement("div")
      tmp.innerHTML = html
      return tmp.textContent||tmp.innerText
    },
    truncate(string){
      let teaserLength = 250
      if(string.length <= teaserLength) return string
      return string.slice(0, teaserLength) + "..."
    }
  }
}
</script>
<style lang="scss" scoped>
.content {
  margin-top: 50px;
  height: 70%;
  background: white;
  max-width: $mi-vp-xl;
}

.navbar {
  display: flex;
  justify-content: space-between;
  gap: $bfs;
  margin-bottom: $bfs;

  select, input[type='text'] {
    border: solid 1px $mi-grau;
    font-family: "PT Sans", sans-serif;
    font-size: $bfs-s;
    padding: 2px;
  }

  a {
    font-size: $bfs-s;
    cursor: pointer;
    font-family: "Roboto Slab", sans-serif;
    font-weight: bold;
    background: $mi-lila;
    color: $mi-hellgrau;
    padding: $xs;
  }
}

.guideline_list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: $l;
  margin-bottom: $l;
}

a:hover {
  color: white;
}

.guideline {
  display: flex;
  flex-direction: column;
  color: white;
  background: $mi-black;
  border-radius: 5px;
  padding: $s;
  max-width: 100%;
  transition: ease 0.2s;

  &:hover {
    transform: scale(105%);
  }

  p {
    max-width: 70%;
    font-size: $bfs-s;
  }

  .top_row {
    display: flex;
    justify-content: space-between;

    h2 {
      padding-right: $s;
    }
  }

  .approvements {
    display: flex;
    flex-direction: column;
    gap: $xs;

    h3 {
      color: $mi-grau;
      text-align: right;
      font-family: "PT Sans", sans-serif;
      font-size: $bfs-xs;
      white-space: nowrap;
    }
    .approvement_list {
      display: flex;
      justify-content: flex-end;


      @media screen and (min-width: 1000px) {
      &:has(.verified_badge) {
        transform: translateX(+20px);
      }
      }

      a {
        margin: 0;
        padding: 0;
        height: $l * 1.5;

        .expert_name {
          font-size: $bfs-xs;
          text-align: center;
          background: $mi-black;
          display: none;
          position: fixed;
          padding: 1px;
        }

        &:hover {
          img {
            filter: drop-shadow(0 0 5px $mi-pink);
          }
          .expert_name {
            display: inherit;
          }
        }
      }

      img {
        width: $l * 1.5;
        margin-left: 5px;
        overflow: hidden;
      }

      .verified_badge {
        transform: translateX(-20px);
        overflow: visible;
        filter: drop-shadow(-2px 0 5px black);
      }
    }
  }
}

@media screen and (max-width: 1000px) {
  .guideline_list {
    grid-gap: $bfs-xxs;

    .guideline {
      max-width: 100%;
      padding: $bfs-xxs;

      .top_row {
        flex-direction: column;
        h2 {
          font-size: $bfs-s;
          padding: 0;
          word-break: break-all;
          hyphens: auto;
        }
        h3 {
          margin-bottom: 0;
        }
      }

      p {
        font-size: $bfs-xs;
        max-width: 100%;
        display: none;
      }

      .approvements {
        justify-content: flex-start;
        align-items: baseline;

        .approvement_list {
          align-self: baseline;
          justify-content: flex-start;
        }

        a {
          height: $s;
        }

        img {
          width: $m;
          height: $m;
          margin: 0 5px 0 0;
        }
      }
    }
  }
}

</style>
