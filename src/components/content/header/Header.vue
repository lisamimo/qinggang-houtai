<template>
  <div id="header">
  	<div class="d-flex align-items-center">
	    <img class="logo" src="../../../../public/img/logo3-2.png">
    </div>
    <div class="d-flex align-items-center" id="user">
    	<p class="welcome">欢迎登录！</p>
    	<div class="dropdown">
			  <div
          class="dropdown-toggle" 
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          data-offset="-50,0"
        >
			    {{this.$store.state.name}}
			  </div>
			  <div class="dropdown-menu" style="min-width: 100px;" aria-labelledby="dropdownMenuButton">
  			    <button class="dropdown-item" >修改密码</button>
  			    <button class="dropdown-item" @click="backToLogin">退出登录</button>
			  </div>
      </div>
    </div>
  </div>
</template>

<script>
	export default {
		name: 'Header',
    methods: {
      backToLogin() {
        this.$router.push('/')
      }
    }
	}
</script>

<style scoped>
  #header {
  	background-color: #3c4145;
  	color: #fff;
  	display: flex;
  	justify-content: space-between;
  }
  .title {
  	margin-left: 30px;
  	font-size: 16px;
  }

  .logo{
    margin-left: 10px;
    height: 100%;
    width: 100%;
    padding: 10px 0;
  }
  #user img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 20px;
  }
  .dropdown {
  	margin-right: 50px;
  }
  .dropdown-menu {
    margin-top: 20px;
  }
  .welcome {
    margin-bottom: 0;
    padding-right: 10px;
  }
</style>