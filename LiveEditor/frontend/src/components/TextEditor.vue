<template>
  <div class="main">
    <div class="navigator"><h1>mi</h1><h2>/</h2><h1 style="font-weight: normal;">guidelines</h1><h2>/</h2><h1 style="font-weight: normal;">editor</h1></div>
    <div class="editor">
      <input type="text" name="guidelineTitle" v-model="guidelineTitle" placeholder="Titel..." id="guidelineTitle">
      <input type="text" name="guidelineTitle" v-model="authorName" placeholder="Autorenname..." id="guidelineAuthor" @change="setAuthorName">
      <!--<input type="text" v-model="position" @change="changeCursorPosition">-->
      <VueEditor
          ref="editor"
          v-model="editorContent"
          id="vueEditor"
          :customModules="customModulesForEditor"
          :editorOptions="editorSettings"
          @selection-change="handleCursorChange"
          @text-change="handleTextChange"
      />
      <p v-if="webSocketActive" style="color: green;">Web-Socket Verbindung aktiv</p>
      <p v-if="!webSocketActive" style="color: red;">Web-Socket Verbindung inaktiv</p>
    </div>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import MultiCursor from "quill-cursors";
import { get, set } from 'idb-keyval';
import { debounce } from 'debounce';
import moment from 'moment';
//import apiService from "@/services/apiService";

export default {
  name: 'TextEditor',
  components: {
    VueEditor
  },
  data() {
    return {
      ws: null,
      position: 0,
      authorName: '',
      guidelineTitle: '',
      editorContent: '',
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
    this.authorName = await get('username')
    this.webSocketInvoke();
  },
  methods: {
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
    async setAuthorName() {
      await set('username', this.authorName);
    },
    unfocus(){
      let tmp = document.createElement("input");
      document.body.appendChild(tmp);
      tmp.focus();
      document.body.removeChild(tmp);
    }
  }
}
</script>

<style scoped>
.main {
  margin-left: 40px;
  margin-right: 40px;
}

.navigator {
  display: flex;
  font-family: RobotoSlab;
  font-weight: bold;
  border-bottom: solid 3px #00ad2f;
  padding-bottom: 20px;
}

.navigator h1 {
  color: black;
  margin: 0;
  margin-right: 20px;
  font-size: 64px;
  line-height: 64px;
}

.navigator h2 {
  margin: 0;
  margin-right: 20px;
  font-size: 64px;
  line-height: 64px;
  color: #d16;
}

.editor {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
}

#guidelineTitle {
  font-family: RobotoSlab, sans-serif;
  border: none;
  font-size: 2rem;
  margin-bottom: 5px;
}

#guidelineAuthor {
  font-family: RobotoSlab, sans-serif;
  border: none;
  font-size: 1.5rem;
  margin-bottom: 20px;
}

#guidelineTitle:focus, #guidelineAuthor:focus {
  outline: none !important;
}

</style>
