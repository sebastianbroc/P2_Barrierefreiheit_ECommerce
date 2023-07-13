<template>
  <div class="login">
    <router-link to="/">zurück</router-link>
    <div class="forms">
      <form id="register_form" @submit="register">
        <h1>Registrieren</h1>
        <label for="register_email">E-Mail</label><br><input type="text" name="email" id="register_email" v-model="register_email"><br>
        <label for="register_name">Name</label><br><input type="text" name="name" id="register_name" v-model="register_name" >
        <label for="register_password">Passwort</label><br><input type="password" name="password" id="register_password" v-model="register_password" >
        <label for="register_password_repeat">Passwort (wiederholen)</label><br><input type="password" name="password_repeat" id="register_password_repeat" v-model="register_password_repeat" >
        <input type="submit" value="Registrieren">
      </form>
      <div class="separator" id="separator"></div>
      <form id="login_form" @submit="login">
        <h1>Login</h1>
        <label for="login_email">E-Mail</label><br><input type="text" name="email" id="login_email" v-model="login_email"><br>
        <label for="login_password">Passwort</label><br><input type="password" name="password" id="login_password" v-model="login_password">
        <input type="submit" value="Login"><router-link to="/menu">Weiter ohne Login</router-link>
      </form>
    </div>
    <!--<div class="extender"></div>-->
  </div>
</template>

<script>
import AuthService from "@/services/AuthService";

export default {
  name: 'HomeView',
  data(){
    return {
      isMounted : false,
      register_email: null,
      register_name: null,
      register_password: null,
      register_password_repeat: null,
      login_email: null,
      login_password: null,
      msg: null,
    }
  },
  mounted() {
    this.isMounted = true
  },
  methods : {
    async login(){
        try {
          const credentials = {
            username: this.login_email,
            password: this.login_password
          };
          const response = await AuthService.login(credentials);

          const token = response.token;
          const user = response.user;

          this.$store.dispatch('login', { token, user });

          if(response.status === 200) {
            this.$router.push('/menu');
          }
        } catch (error) {
          this.msg = error.response.data.msg;
        }
    },
    register(){
      this.$router.push('/guidelines');
    },
    expandForm(){
        if(this.login_email || this.login_password){
          document.getElementById("login_form").classList.add("active")
          document.getElementById("login_form").classList.remove("passive")
          document.getElementById("register_form").classList.add("passive")
          document.getElementById("register_form").classList.remove("active")
          document.getElementById("separator").classList.add("hide")
        } else if (this.register_email || this.register_name || this.register_password || this.register_password_repeat) {
          document.getElementById("register_form").classList.add("active")
          document.getElementById("register_form").classList.remove("passive")
          document.getElementById("login_form").classList.add("passive")
          document.getElementById("login_form").classList.remove("active")
          document.getElementById("separator").classList.add("hide")
        } else {
          document.getElementById("register_form").removeAttribute("class");
          document.getElementById("login_form").removeAttribute("class");
          document.getElementById("separator").classList.remove("hide");
        }
    }
  },
  watch: {
    $data: {
      handler() {
        if(this.isMounted){
          this.expandForm();
        }
      },
      deep: true,
      immediate: true
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
    font-family: RobotoSlab, sans-serif;
    position: absolute;
    color: $mi-hellgrau;
    top: $l;
    left: $l;
    z-index: 2;
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
    overflow: hidden;
    transition: 0.2s ease;

    &.passive {
      width: 0;
    }

    &.active {
      width: 100%;
    }

    a {
      display: block;
      font-family: "PT Sans", sans-serif;
      font-size: $bfs;
      color: $mi-grau;
      position: relative;
      text-align: center;
      margin-top: $l * 2;
      width: 100%;
      top: auto;
      left: auto;
      white-space: nowrap;
    }

    label {
      font-size: $s;
      color: $mi-hellgrau;
      white-space: nowrap;
    }

    input[type=text], input[type=password] {
      background: $mi-hellgrau;
      font-family: "PT Sans", sans-serif;
      width: 100%;
      height: 1.4rem;
    }

    input[type=submit] {
      cursor: pointer;
      font-family: RobotoSlab, sans-serif;
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
  transition: 0.2s ease;

  &.hide {
    background: rgba(0,0,0,0);
    margin: 0;
  }
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

  #separator {
    background: none;
    height: $l;
  }

  .forms {
    flex-direction: column;
    justify-content: center;
    height: 100%;
    border-radius: 0;
    padding-top: 0;
    padding-bottom: 0;
    margin: 0;

    form {
      width: 100%;

      a {
        margin-top: $l;
      }

      &.passive {
        width: 100%;
      }

      &.active {
        width: 100%;
      }
    }

    h1 {
      margin-bottom: $xs;
    }
  }
}
</style>
