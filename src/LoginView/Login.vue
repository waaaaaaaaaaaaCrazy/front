<template>
  <div style="height: 100vh;display: flex;align-items: center;justify-content: center;background-color: #0f9876">
    <div style="display: flex;background-color: white;flex-grow: 0.6;border-radius: 5px;overflow: hidden">
      <div style="flex: 1">
        <img src="@/assets/login.png" alt="" style="width: 100%">
      </div>
      <div style="flex: 1;display: flex;align-items: center;justify-content: center">
        <el-form :model="user" style="width: 80%;" ref="loginRef" rules="rules">
          <div style="font-size: 50px;font-weight: bold;text-align: center;margin-bottom:80px;flex: 1 ">欢迎使用智慧教学系统</div>
          <el-form-item prop="IDnumber">
            <el-input   placeholder="请输入账号" v-model="user.IDnumber"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input  show-password placeholder="请输入密码" v-model="user.password"></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <div style="display: flex">
              <el-input  style="flex: 1" v-model="user.code" ></el-input>
              <div style="flex: 1;align-items: center;justify-content: center;text-align: center">
                <valid-code ref="validCodeRef"/>
              </div>
            </div>
          </el-form-item>
          <div style="display: flex;justify-content: center;align-items: center" >
            <el-button type="primary" style="width:100% ;align-items: center;margin-bottom: 10px" @click="login">登 录</el-button>
          </div>
          <div style="text-align: right"><span style="color: blue">忘记密码？</span></div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import ValidCode from '@/components/ValidCode.vue';
import axios from "axios";
import { ElMessage } from "element-plus";
export default {
  name: ' myLogin',
  components: {
    ValidCode
  },
  data() {
    return {
      code:'',//验证码传过来的code
      user: {
        IDnumber: '',
        password: '',
        code: '' // 表单用户输入的code验证码
      },
      isteacher:null,
      rules: {
        IDnumber:[
          {required:true,message:'请输入账号',trigger:'blur'}
        ],
        password:[
          {required:true,message:'请输入密码',trigger:'blur'}
        ]

      }
    };
  },
  methods: {

    async login() {


      try {
        const response = await axios.post('http://localhost:8080/user/login', {
          IDnumber: this.user.IDnumber,
          password: this.user.password,
          isteacher:this.isteacher,
        },{
          headers: {
            'Content-Type': 'application/json'
          }
        });
        let user=this.user;
        // eslint-disable-next-line no-unused-vars
        const generatedCode=this.$refs.validCodeRef.getCode();

        if(user.IDnumber&&user.password!==''){

          if(generatedCode.toLowerCase()===user.code.toLowerCase()){
              const data = response.data; // 假设response.data是数字0或1
              let message;
              if (data === '身份信息：0') {
                message = '欢迎学生登录';
              } else if (data === '身份信息：1') {
                message = '欢迎老师登录';
              } else {
                ElMessage.error('请重新输入');
              }
              ElMessage({
                message: message,
                type: 'success',
              });
              if (data === '身份信息：0') {
// 使用 path 和 query
                this.$router.push({ path: '/home', query: { isTeacher: 0 ,IDnumber: this.user.IDnumber } });
              } else if (data === '身份信息：1') {
                message = '欢迎老师登录';
// 使用 path 和 query
                this.$router.push({ path: '/home', query: { isTeacher: 1,IDnumber: this.user.IDnumber } });
              }
          }else if( generatedCode !==user.code){
            ElMessage.error('请输入正确验证码');
          }
          else if(user.code===''){
            ElMessage.error('请输入验证码');
          }

          let IDnumber = this.user.IDnumber;
          let Isteacher;
          const data = response.data;
          if (data === '身份信息：0') {
            Isteacher=0;
          }
          else if (data === '身份信息：1') {
            Isteacher=1;
          }
          // 存储到localStorage
          localStorage.setItem('IDnumber', IDnumber);
          localStorage.setItem('Isteacher', Isteacher);
        }
      }
          catch (error) {
            if (error.response) {
              ElMessage.error('Login failed: ' + error.response.data);
            } else {
              ElMessage.error('Login failed: ' + error.message);
            }

          }


      }

    },

}



</script>
