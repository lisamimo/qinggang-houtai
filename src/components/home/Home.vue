<template>
	<div id="login" class="container-fluid">
		<div class="row">
      <img  class="col-xl-2 col-lg-3 col-md-4 col-6 offset-lg-8 offset-md-6 offset-5" src="../../../public/img/logo3.png">
    </div>
	  <div class="row content justify-content-center align-items-center">
	  	<form class="col-xl-3 col-lg-5 col-md-6 col-9">
	  		<div class="header">
	  	    青杠民宿后台管理系统
	  	  </div>
				<input type="text" class="form-control" id="inputAcount" placeholder="请输入账号" v-model="account">
				<input type="password" class="form-control" id="inputPassword" placeholder="请输入密码" v-model="pwd">
			  <ul class="nav">
				  <li class="nav-item">
				    <a class="nav-link" href="#">注册账号</a>
				  </li>
				  <li class="nav-item">
				    <a class="nav-link" href="#">忘记密码</a>
				  </li>
				</ul>
			 <button @click="Login" type="button" class="btn btn-default col-lg-12">登录</button>
      </form>
	  </div>
	  <footer class="container-fluid d-flex flex-column justify-content-center align-items-center">
	  	<p>成都乐萌科技有限公司</p>
	    <a href="www.lemengxiangju.com" target="_blank">www.lemengxiangju.com</a>
	  </footer>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'Home',
  data: function() {
    return {
      account: '',
      pwd: ''
    }
  },
  methods: {
    Login() {
      axios.get('/employ/login', {
        params: {
          account: this.account,
          pwd: this.pwd
        }
      })
      .then(this.LoginSucc)
      .catch(this.LoginFail)
    },
    LoginSucc(res) {
      var data = res.data;
      if (data.code === 1) {
        this.$store.commit('changeName', data.obj.name);
        this.$router.push('/singleorder')
      } else {
        alert('帐号或密码错误')
      }
    },
    LoginFail(res) {
      alert('登录出错，有疑问请联系开发人员');
    }
  }
}
</script>

<style scoped>
  @media screen and (max-width: 1024px) {
    .header {
      font-size: 32px !important;
    }
    footer p, footer a{
      margin: 0;
      font-size: 28px !important;
    }
  }

  @media screen and (max-width: 768px) {
    .header {
      font-size: 28px !important;
    }
    footer p, footer a{
      margin: 0;
      font-size: 21px !important;
    }
  }

  @media screen and (max-width: 480px) {
    .header {
      font-size: 20px !important;
    }
    footer p, footer a{
      margin: 0;
      font-size: 15px !important;
    }
  }

  #login {
  	position: absolute;
  	width: 100%;
    height: 100%;
	  background: url(../../../public/img/bg-1.png) center no-repeat;
	  background-size: 100% 100%;
	  padding: 0;
  }
  
  #login img {
    margin-top: 40px;
  }

  .content {
  	height: 50%;
  }
  
  form {
  	box-shadow: 0 20px 38px rgba(8, 49, 101, 0.4);
  	font-family: "Microsoft YaHei" !important; 
  	text-align: center;
  	color: #fff;
  	font-weight: 300;
  }

	.form-control::-webkit-input-placeholder{
	  color: #999;
	  font-family: "Microsoft YaHei" !important; 
	}    /* 使用webkit内核的浏览器 */
	.form-control::-moz-placeholder{
	  color: #999;
	  font-family: "Microsoft YaHei" !important; 
	}                  /* Firefox版本19+ */
	.form-control:-ms-input-placeholder{
	  color: #999;
	  font-family: "Microsoft YaHei" !important; 
	}     /* IE浏览器 */

  .header {
  	font-size: 25px;
  	margin-top: 20px;
  	margin-bottom: 20px;
  }

  input {
  	margin-bottom: 20px;
  	border-radius: 15px;
  	color: #333;
  }

  .nav {
  	display: flex;
  	justify-content: space-between;
  	font-family: "Microsoft YaHei" !important; 
  }

  .nav-link {
    color: #fff;
    padding: 0;
  }

  button {
  	background: #459dc6;
  	color: #fff;
  	margin-top: 20px;
  	margin-bottom: 20px;
  	border-radius: 15px;
  	font-family: "Microsoft YaHei" !important;
  }
  footer {
  	position: fixed;
  	padding: 0;
  	bottom: 0;
  	margin-bottom: 50px;
  	color: #fff;
  }
  footer p {
  	margin: 0;
  	font-size: 20px;
  }

  footer a {
  	color: #fff;
  }
</style>