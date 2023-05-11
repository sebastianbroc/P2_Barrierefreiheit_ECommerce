<template>
  <div class="login">
    <router-link to="/">zurück</router-link>
    <div class="forms">
      <form>
        <h1>Registrieren</h1>
        <label for="register_email">E-Mail</label><br><input type="text" name="email" id="register_email" :value="register_email"><br>
        <label for="register_name">Name</label><br><input type="text" name="name" id="register_name" :value="register_name">
        <label for="register_password">Passwort</label><br><input type="password" name="password" id="register_password" :value="register_password">
        <label for="register_password_repeat">Passwort (wiederholen)</label><br><input type="password" name="password_repeat" id="register_password_repeat" :value="register_password_repeat">
        <input type="submit" value="Registrieren">
      </form>
      <div class="separator"></div>
      <form>
        <h1>Login</h1>
        <label for="login_email">E-Mail</label><br><input type="text" name="email" id="login_email" :value="login_email"><br>
        <label for="login_password">Passwort</label><br><input type="password" name="password" id="login_password" :value="login_password">
        <input type="submit" value="Login">
      </form>
    </div>
    <!--<div class="extender"></div>-->
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data(){
    return {
      register_email: null,
      register_name: null,
      register_password: null,
      register_password_repeat: null,
      login_email: null,
      login_password: null
    }
  }
}
</script>
<style lang="scss" scoped>
.login {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to top, $mi-lila, rgba(0,0,0,0.9)), url('@/assets/images/code.jpg');

  a {
    font-family: "Roboto Slab";
    position: absolute;
    color: $mi-hellgrau;
    top: $l;
    left: $l;
  }
}

.forms {
  background: $mi-black;
  padding: $l;
  border-radius: 10px;
  width: 50%;
  display: flex;
  flex-direction: row;
  z-index: 1;
  position: relative;

  h1 {
    color: $mi-hellgrau;
    font-size: $bfs-xl;
  }

  form {
    width: 50%;

    label {
      font-size: $s;
      color: $mi-hellgrau;
    }

    input[type=text], input[type=password] {
      background: $mi-hellgrau;
      font-family: "PT Sans";
      width: 100%;
      height: 1.4rem;
    }

    input[type=submit] {
      font-family: "Roboto Slab";
      font-weight: bold;
      background: $mi-lila;
      color: $mi-hellgrau;
      margin-top: $s;
      padding: $xs;
    }
  }
}

.separator {
  background: $mi-hellgrau;
  width: 1px;
  margin: 0 $l 0 $l;
}

.extender {
  background: linear-gradient(to bottom, $mi-black, rgba(0,0,0,0.5));
  position: absolute;
  top: 74%;
  height: 26%;
  width: 50%;
  padding: 0 $l 0 $l;
  z-index: 0;
}

@media only screen and (max-width: 900px){
  .forms, .extender {
    width: 100%;
  }
}
</style>
