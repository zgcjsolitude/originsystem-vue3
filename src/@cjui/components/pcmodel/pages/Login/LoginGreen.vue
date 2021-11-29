<template>
	<div class="logingreen-container">
    	<div class="box">
      		<div class="wrapper">
        		<div class="form-container">
          			<h1>Welcome</h1>
          			<form class="form" @submit.prevent="noSubmit">
          			  	<input type="text" v-model.trim="formLogin.name" placeholder="Username" />
          			  	<input type="password" v-model.trim="formLogin.password" placeholder="Password" />
          			  	<button id="login-button" @click="login">Login</button>
          			  	<div class="login-visitor">
          			  	  	<span @click="visitorLogin">Visitor >></span>
          			  	</div>
          			</form>
				</div>
        		<ul class="bg-bubbles">
        		 	<li v-for="i in 10" :key="i"></li>
        		</ul>
			</div>
		</div>

    	<div class="btn-back" @click="leftTopEvent">
    	  	<i class="el-icon-arrow-left"></i>Back
    	</div>

    	<div class="btn-Administrator" @click="rightTopEvent">Apply Administrator</div>
	</div>
</template>

<script>
import { reactive } from 'vue';
  import { ElMessage } from 'element-plus';

export default {
	name: "CjuiLoginGreen",
	props: {
		loginLoading: {
			type: Boolean,
			default: false,
		}
	},
	setup(props, context) {
		const formLogin = reactive({
			name: '',
			password: ''
		});
		const screenWidth = document.body.clientWidth;
		function noSubmit() {
    	  	return false;
    	}
		function login() {
            if (this.formLogin.name == "") {
            	ElMessage.warning("请输入用户名");
            	return;
            }
            if (this.formLogin.password == "") {
              	ElMessage.warning("请输入密码");
              	return;
            }
			context.emit('login', formLogin);
		}
		function visitorLogin() {
			context.emit('visitorLogin', formLogin);
		}
		function leftTopEvent() {
    		context.emit("leftTopEvent");
    	}
		function rightTopEvent() {
    		context.emit("rightTopEvent");
    	}

		return {
			formLogin,
			screenWidth,
			noSubmit,
			login,
			visitorLogin,
			leftTopEvent,
			rightTopEvent
		}
	}
};
</script>

<style lang="scss" scoped>
.logingreen-container {
	width: 100%;
	height: 100%;
	background: #ffffff;
	font-family: "Source Sans Pro", sans-serif;
	color: #ffffff;
	overflow: hidden;
	font-weight: 300;

	& ::placeholder {
		font-family: "Source Sans Pro", sans-serif;
		color: #ffffff;
		font-weight: 300;
	}
}
.box {
	width: 100%;
	height: 100%;
	background: linear-gradient(to bottom right, #50a3a2 0%, #53e3a6 100%);
	opacity: 0.8;
	display: flex;
	align-items: center;
	position: relative;
}
.wrapper {
	width: 100%;
	margin-top: -10%;
	overflow: hidden;

	&.form-success .container h1 {
		transform: translateY(85px);
	}
}
.form-container {
	max-width: 600px;
	margin: 0 auto;
	padding: 80px 0;
	height: 400px;
	text-align: center;

	h1 {
	  	font-size: 40px;
	  	transition-duration: 1s;
	  	transition-timing-function: ease-in-put;
	  	font-weight: 200;
	}
	
	form {
		padding: 20px 0;
	    position: relative;
	    z-index: 2;
	}
	input {
	    appearance: none;
	    outline: 0;
	    border: 1px solid rgba(255, 255, 255, 0.4);
	    background-color: rgba(255, 255, 255, 0.2);
	    width: 250px;
	    border-radius: 3px;
	    padding: 10px 15px;
	    margin: 0 auto 10px auto;
	    display: block;
	    text-align: center;
	    font-size: 18px;
	    color: white;
	    transition-duration: 0.25s;
	    font-weight: 300;
	}
	input:hover {
	    background-color: rgba(255, 255, 255, 0.4);
	}
	input:focus {
	    background-color: white;
	    width: 300px;
	    color: #53e3a6;
	}
	button {
	    appearance: none;
	    outline: 0;
	    background-color: white;
	    border: 0;
	    padding: 10px 15px;
	    color: #53e3a6;
	    border-radius: 3px;
	    width: 250px;
	    cursor: pointer;
	    font-size: 18px;
	    transition-duration: 0.25s;
	}
	button:hover {
	    background-color: #f5f7f9;
	}
}
.login-visitor {
  	text-align: right;
  	width: 250px;
  	margin: 0 auto;

  	span {
  		cursor: pointer;
  	}
}
.bg-bubbles {
  	& {
  	  	position: absolute;
  	  	top: 0;
  	  	left: 0;
  	  	width: 100%;
  	  	height: 100%;
  	  	z-index: 1;
  	}
  	li {
  	  	position: absolute;
  	  	list-style: none;
  	  	display: block;
  	  	width: 40px;
  	  	height: 40px;
  	  	background-color: rgba(255, 255, 255, 0.15);
  	  	bottom: -160px;
  	  	animation: square 25s infinite;
  	  	transition-timing-function: linear;
  	}
  	li:nth-child(1) {
  	  	left: 10%;
  	}
  	li:nth-child(2) {
  	  	left: 20%;
  	  	width: 80px;
  	  	height: 80px;
  	  	animation-delay: 1s;
  	  	animation-duration: 17s;
  	}
  	li:nth-child(3) {
  	  	left: 25%;
  	  	animation-delay: 3s;
  	}
  	li:nth-child(4) {
  	  	left: 40%;
  	  	width: 60px;
  	  	height: 60px;
  	  	animation-duration: 22s;
  	  	background-color: rgba(255, 255, 255, 0.25);
  	}
  	li:nth-child(5) {
  	  	left: 70%;
  	}
  	li:nth-child(6) {
  	  	left: 80%;
  	  	width: 120px;
  	  	height: 120px;
  	  	animation-delay: 2s;
  	  	background-color: rgba(255, 255, 255, 0.2);
  	}
  	li:nth-child(7) {
  	  	left: 32%;
  	  	width: 160px;
  	  	height: 160px;
  	  	animation-delay: 6s;
  	}
  	li:nth-child(8) {
  	  	left: 55%;
  	  	width: 20px;
  	  	height: 20px;
  	  	animation-delay: 14s;
  	  	animation-duration: 40s;
  	}
  	li:nth-child(9) {
  	  	left: 25%;
  	  	width: 10px;
  	  	height: 10px;
  	  	animation-delay: 1s;
  	  	animation-duration: 40s;
  	  	background-color: rgba(255, 255, 255, 0.3);
  	}
  	li:nth-child(10) {
  	  	left: 90%;
  	  	width: 160px;
  	  	height: 160px;
  	  	animation-delay: 10s;
  	}
}
@keyframes square {
  	0% {
  	  	transform: translateY(0);
  	}
  	100% {
  	  	transform: translateY(-700px) rotate(600deg);
  	}
}

.btn-back {
	position: absolute;
	top: 15px;
	left: 15px;
	font-size: 16px;
	color: #91dfc5;
	cursor: pointer;
}
.btn-Administrator {
	position: absolute;
	top: 15px;
	right: 20px;
	font-size: 16px;
	color: #91dfc5;
	cursor: pointer;
}
</style>