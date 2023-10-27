<template>
  <div>
    <NavHeader :links=this.navLinks />
    <div class="loading has-gap" v-if="!user"></div>
      <div class="user has-gap content" v-if="!editView && user">
        <div class="bio_wrapper">
          <img v-if="user.image" :src="user.image">
          <div class="bio">
            <div style="display: flex; align-items: center; gap: 20px;"><h1>{{user.name}}</h1><span v-if="user.is_expert" class="verified_badge"><img src="@/assets/images/checkmark.png">Experte</span><img src="@/assets/images/edit.svg" alt="Profil bearbeiten" v-if="this.$store.getters.isLoggedIn && this.$route.query.u == this.$store.getters.getUser.id" @click="this.toggleEditView" id="editButton"></div>
            <p>{{user.bio}}</p>
            <h2>Mitglied seit {{user.registered}}</h2>
          </div>
        </div>
        <div class="contributions">
          <div class="posts">
            <h1>Beiträge</h1>
            <div v-for="contribution in contributions" :key="contribution.id" :value="contribution.id" class="post">
              <h3 v-if="contribution.type == 'guideline'">Verfasste eine Guideline: <router-link :to="'/guideline?g=' + contribution.id">{{contribution.title}}</router-link></h3>
              <h3 v-if="contribution.type == 'annotation'">Verfasste eine Annotation zu: <router-link :to="'/guideline?g=' + contribution.id">{{contribution.title}}</router-link><p>{{contribution.annotation_text}}</p></h3>
              <h3 v-if="contribution.type == 'approvement'">Bestätigte eine Guideline: <router-link :to="'/guideline?g=' + contribution.id">{{contribution.title}}</router-link></h3>
              <h4>{{contribution.date}}</h4>
            </div>
          </div>
          <div class="expert_qualification" v-if="user.is_expert">
            <h1>Expertenqualifikation</h1>
            <p>{{user.qualification}}</p>
          </div>
        </div>
      </div>
    <div class="edit user has-gap content" v-if="editView && user">
      <div class="bio_wrapper">
        <div class="image-container"><img v-if="user.image" :src="user.image"><div class="img-overlay" @click="triggerImageUpload" :class="{active: !user.image}"><p>Bild ändern</p></div></div>
        <input type="file" id="imageupload" style="display: none;" @change="loadFile">
        <div class="bio">
          <div style="display: flex; align-items: center; gap: 20px;"><input type="text" id="username" v-model="user.name"><img src="@/assets/images/save.svg" alt="Änderungen speichern" v-if="this.$store.getters.isLoggedIn && this.$route.query.u == this.$store.getters.getUser.id" @click="this.saveChanges" id="saveButton"><img src="@/assets/images/cancel.svg" alt="Änderungen verwerfen" v-if="this.$store.getters.isLoggedIn && this.$route.query.u == this.$store.getters.getUser.id" @click="this.$router.go()" id="cancelButton"></div>
          <textarea rows="5" id="bio" v-model="user.bio"></textarea>
        </div>
      </div>
      <div class="contributions">
        <div class="expert_qualification">
          <h1>Expertenqualifikation</h1>
          <textarea v-model="user.qualification" rows="10" id="qualification"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import NavHeader from "@/components/navHeader.vue";
import AuthService from "@/services/AuthService";
import moment from 'moment';

export default {
  name: 'HomeView',
  components: {NavHeader},
  data(){
    return {
      editView: false,
      navLinks: [
        {
          link: "/guidelines",
          name: "guidelines"
        }
      ],
      user: null,
      contributions: [
        {
          type: "guideline",
          name: "Optimieren des DOM für Screenreader",
          date: "03.04.2023",
          id: 3
        },
        {
          type: "annotation",
          name: "Strukturelle Navigation",
          date: "02.01.2023",
          annotation: "Mir fehlen an dieser Stelle leider noch wissenschaftliche Quellen, welche die Aussage belegen. Ich habe leider durch eigene Recherche nichts gefunden. Das müsste meiner Meinung nach nachgereicht werden.",
          id: 6
        }
      ]
    }
  },
  methods: {
    toggleEditView(){
      if(this.$store.getters.isLoggedIn && this.$route.query.u == this.$store.getters.getUser.id){
        this.editView = !this.editView
      }
    },
    triggerImageUpload(){
      document.getElementById("imageupload").click()
    },
    loadFile(input){
      if(input.target.files.length > 0){
        const file = input.target.files[0];
        const reader = new FileReader();

        reader.onload = (fileLoadedEvent) => {
          //Entferne data:image/png;base64 Präfix
           this.setImage(fileLoadedEvent.target.result)
        }
        reader.readAsDataURL(file)
      }
    },
    async getActivity(){
      let activities = await AuthService.getUserActivity({user_id: this.$route.query.u})
      activities = activities.msg
      activities = activities.map(item => {return {...item, date: moment(item.timestamp).format("D.M.Y")}})
      this.contributions = activities
    },
    setImage(base64){
      this.user.image = base64
    },
    async saveChanges(){
      //Double check that no one is trying to edit the profile of another person
      if(this.$store.getters.isLoggedIn && this.$route.query.u == this.$store.getters.getUser.id){
        let data = {
          "id": this.$route.query.u,
          "name": this.user.name,
          "bio": this.user.bio,
          "qualification": this.user.qualification,
          "image": this.user.image
        }

        let result = await AuthService.updateUser(data)
        if(result.msg == "Success"){
          this.$router.go()
        }
      }
    }
  },
  async mounted(){
    let data = await AuthService.getUser({id: this.$route.query.u})
    await this.getActivity()
    if(data && data.msg){
      data.msg.registered = moment(data.msg.registered).format('D.M.Y')
      this.user = data.msg
    }
  },
  watch: {
    '$route.params.u': {
      handler: function() {
        this.$router.go()
      },
      deep: true
    }
  }
}
</script>
<style lang="scss" scoped>
.content {
  max-width: $mi-vp-xl;
}

.user {
  display: flex;
  flex-direction: column;
  gap: $bfs-xl * 2;

  .bio_wrapper {
    display: flex;
    gap: 50px;
  }

  .bio {
    display: flex;
    flex-direction: column;
    gap: $bfs-xs;

    #editButton, #saveButton, #cancelButton {
      width: 30px;
      height: 30px;
      filter: invert(15%) sepia(93%) saturate(4451%) hue-rotate(279deg) brightness(86%) contrast(102%);
      cursor: pointer;
    }

    p {
      max-width: 600px;
    }
  }

  img {
    width: $image-small;
    height: $image-small;
    border-radius: 20px;
    object-fit: cover;
  }

  h1 {
    margin: 0;
  }

  h2 {
    margin: 0;
    font-size: $bfs-xs;
    color: $mi-lila;
  }

  p {
    margin: 0;
  }

  .verified_badge {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: fit-content;
    background: $mi-lila;
    color: white;
    padding-right: $bfs-s;
    border-radius: 20px;
    font-family: RobotoSlab, sans-serif;
    font-size: $bfs-s;

    img {
      margin: 0;
      width: $bfs-xxl;
      height: $bfs-xxl;
    }
  }

  .contributions {
    background: $mi-hellgrau;
    display: flex;
    gap: $bfs-xl;
    padding: $bfs-l;

    .posts, .expert_qualification {
      display: flex;
      flex-direction: column;
      gap: $bfs;
      width: 50%;
      max-height: 500px;
      overflow: scroll;

      p {
        margin: 0;
      }

      .post {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: $bfs;
        background: $mi-black;
        padding: $bfs-xxs;

        h3 {
          font-family: "PT Sans", sans-serif;
          font-size: $bfs-s;
          color: white;
          margin: 0;
        }

        h4 {
          font-size: $bfs-xxs;
          color: $mi-grau;
          margin: 0;
        }

        p {
          margin-top: $bfs-xxs;
          font-size: $bfs-xs;
        }
      }
    }
  }

}

.edit {
  input, textarea {
    border: solid 2px $mi-grau;
    font-family: "Roboto Slab",sans-serif;

    &#username {
      font-size: 2rem;
    }

    &#bio, &#qualification {
      font-family: "PT Sans", sans-serif;
      font-size: 20px;
    }
  }

  .expert_qualification {
    width: 100% !important;
  }

  .image-container {
    position: relative;
    text-align: center;
  }

  .img-overlay {
    border-radius: 20px;
    position: absolute;
    top: 49%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    width: 100%;
    height: 98%;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    p {
      color: white;
      padding: $bfs-s;
    }

    &:hover {
      opacity: 1;
    }

    &.active {
      position: relative;
      opacity: 1;
      width: $image-small;
      height: $image-small;
    }
  }

}

</style>
