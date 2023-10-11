<template>
  <div>
    <NavHeader :links=this.navLinks />
    <div class="editor content has-gap">
      <div class="header flex">
        <input type="text" name="guidelineTitle" v-model="guidelineTitle" placeholder="Titel..." id="guidelineTitle">
        <div class="actions">
          <img src="@/assets/images/save.svg" alt="Speichern"  id="saveButton" @click="save">
        </div>
      </div>
      <!--<input type="text" v-model="position" @change="changeCursorPosition">-->
      <VueEditor
          ref="editor"
          v-model="editorContent"
          id="vueEditor"
          :customModules="customModulesForEditor"
          :editorOptions="editorSettings"
          @selection-change="handleCursorChange"
          @text-change="handleTextChange"
          style="height: 600px;"
      />
      <h2 style="margin-top: 100px;">Quellenverzeichnis</h2>
      <VueEditor
          ref="editorBibliography"
          v-model="editorBibliographyContent"
          id="vueEditorBibliography"
          :customModules="customModulesForEditor"
          :editorOptions="editorSettings"
          @selection-change="handleCursorChange"
          @text-change="handleTextChange"
      />
      <!--<p v-if="webSocketActive" style="color: green;">Web-Socket Verbindung aktiv</p>-->
      <!--<p v-if="!webSocketActive" style="color: red;">Web-Socket Verbindung inaktiv</p>-->
    </div>
  </div>
</template>

<script>
import { VueEditor } from "vue3-editor";
import MultiCursor from "quill-cursors";
//import { debounce } from 'debounce';
import moment from 'moment';
import NavHeader from "@/components/navHeader.vue";
//import apiService from "@/services/apiService";
import AuthService from "@/services/AuthService";

export default {
  name: 'TextEditor',
  components: {
    VueEditor,
    NavHeader
  },
  data() {
    return {
      existingGuideline: (!this.$route.query.new && this.$route.query.g) ? true : false,
      navLinks: [
        {
          link: "/menu",
          name: "editor"
        }
      ],
      ws: null,
      position: 0,
      authorName: this.$store.getters.getUser.name,
      guidelineTitle: '',
      editorContent: '',
      editorBibliographyContent: '',
      activeUsers: [],
      textChangeTimeout : false,
      lastWsUpdate: moment(),
      webSocketActive: false,
      customModulesForEditor: [
        {
          alias: "multiCursor",
          module: MultiCursor,
          template: '<div class="custom-cursor">...</div>',
          hideDelayMs: 5000,
          hideSpeedMs: 0,
          selectionChangeSource: null,
          transformOnTextChange: true
        },
      ],
      editorSettings: {
        modules: {
          multiCursor: true
        }
      }
    }
  },
  async mounted() {
    //this.webSocketInvoke();

    if(this.existingGuideline){
      await this.getGuideline()
    }
  },
  methods: {
    async getGuideline(){
      let data = {
        "guideline_id": this.$route.query.g
      }

      let result = await AuthService.getGuideline(data)

      this.guidelineTitle = result.msg.title
      this.editorContent = result.msg.text.replace('<pre><p>Code</p><code><xmp>', '<pre class="ql-syntax" spellcheck="false">').replace('</xmp></code></pre>', '</pre>')
      this.editorBibliographyContent = result.msg.bibliography

    },
    async save(){
      let data = {
        "author_id": this.$store.getters.getUser.id,
        "title": this.guidelineTitle,
        "last_update": moment().format("Y-MM-DD HH:MM:s"),
        "text": this.editorContent.replace('<pre class="ql-syntax" spellcheck="false">', '<pre><p>Code</p><code><xmp>').replace('</pre>', '</xmp></code></pre>'),
        "bibliography": this.editorBibliographyContent
      }

      if(this.existingGuideline) data.guideline_id = this.$route.query.g
      let result = await AuthService.saveGuideline(data)

      if(result.msg == "Success"){
        if(this.existingGuideline){
          this.$router.push("/guideline?g=" + this.$route.query.g)
        } else {
          this.$router.push("/yourguidelines")
        }
      } else {
        console.log(result)
      }
    }
    /*
    webSocketInvoke() {
      this.ws = new WebSocket("ws://192.168.2.118:8888/", "echo-protocol");

      this.ws.onopen = () => {
        this.webSocketActive = true;
        console.log("WebSocket connection created");
      }

      this.ws.onmessage = (evt) => {
        let received_msg = JSON.parse(evt.data);
        received_msg = JSON.parse(received_msg);
        console.log(received_msg);
        if(received_msg.topic === 'positionChange') this.createMultipleCursors(received_msg.user, received_msg.index, received_msg.length);
        if(received_msg.topic === 'textChange'){
          this.textChangeTimeout = true;
          if(this.editorContent !== received_msg.text){
            this.$refs.editor.quill.root.innerHTML = (received_msg.text);
            //this.editorContent = received_msg.text;
            this.lastWsUpdate = moment();
            //this.unfocus();
          }
          this.textChangeTimeout = false;
        }
      }

      this.ws.onclose = () => {
        console.log("WebSocket connection closed");
      }
    },
    createMultipleCursors(user, index, length){
      if(this.$refs.editor !== undefined){
        let multiCursor = this.$refs.editor.quill.getModule('multiCursor');
        let alreadyPresent = false;

        if(this.activeUsers.length > 0){
          for(let i in this.activeUsers){
            if(this.activeUsers[i] === user){
              multiCursor.moveCursor(user, {index: index, length: length})
              alreadyPresent = true;
            }
          }
        }

        if(!alreadyPresent && user !== this.authorName){
          this.activeUsers.push(user);
          multiCursor.createCursor(user, user, "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0"));
          multiCursor.toggleFlag(user, true);
          multiCursor.moveCursor(user, {index: index, length: length})
        }
      }
    },
    changeCursorPosition(position, length) {
      if(this.$refs.editor !== null) {
        let multiCursor = this.$refs.editor.quill.getModule('multiCursor');

        multiCursor.moveCursor("1", {index: position , length: length})
        multiCursor.update();
      }
    },
    async handleCursorChange(input) {
      //await apiService.positionChange({...input, user: this.user})
      if(moment().diff(this.lastWsUpdate, 'milliseconds') > 2){
        input = JSON.parse(JSON.stringify(input));

        if(input !== null) {
          let data = {
            topic: "positionChange",
            index: input.index,
            length: input.length,
            user: this.authorName
          }

          this.ws.send(JSON.stringify(data));
        }
      }
    },
    debounceTextChange(){
      debounce(this.handleTextChange(),10000);
    },
    handleTextChange() {
      if(!this.textChangeTimeout && moment().diff(this.lastWsUpdate, 'milliseconds') > 2){
        let data = {
          topic: "textChange",
          text: this.editorContent
        }
        this.ws.send(JSON.stringify(data))
      }
    },
    unfocus(){
      let tmp = document.createElement("input");
      document.body.appendChild(tmp);
      tmp.focus();
      document.body.removeChild(tmp);
    }*/
  }
}
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header{
  margin-bottom: $bfs-l;
}

.actions {
  background: $mi-lila;
  border-radius: 5px;

  img {
    filter: invert(100%);
  }

  #saveButton {
    cursor: pointer;
    width: 50px;
    height: 50px;
  }
}

.editor {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
}

#guidelineTitle {
  font-family: "Roboto Slab", sans-serif;
  border: none;
  font-size: 2rem;
  margin-bottom: 5px;
}

#guidelineAuthor {
  font-family: "Roboto Slab", sans-serif;
  border: none;
  font-size: 1.5rem;
  margin-bottom: 20px;
}

#guidelineTitle:focus, #guidelineAuthor:focus {
  outline: none !important;
}

</style>
