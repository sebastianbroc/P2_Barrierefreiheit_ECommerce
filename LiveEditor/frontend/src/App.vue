<template>
  <div id="app">
    <TextEditor></TextEditor>
  </div>
</template>

<script>
import TextEditor from './components/TextEditor'

export default {
  name: 'App',
  components: {
    TextEditor
  }
}
</script>

<style>
#app {
  font-family: RobotoSlab, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

@font-face {
  font-family: 'RobotoSlab';
  src: url('./fonts/RobotoSlab.ttf');
}
</style>
