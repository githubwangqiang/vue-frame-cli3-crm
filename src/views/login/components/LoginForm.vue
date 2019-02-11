<template>
  <div class="login-form-wrap">
    <h3 class="login-form-title">用户登陆</h3>
    <div class="login-form-container">
      <label>
        <i class="iconfont icon-users" />
        <input
          v-model="userInfo.langlibUserName"
          type="text"
          placeholder="用户名/手机号/邮箱号">
      </label>
      <label>
        <i class="iconfont icon-lock" />
        <input
          v-model="userInfo.langlibPwd"
          :type="passwordType"
          placeholder="密码"
          @keydown.enter="login">
        <i
          :class="{password: 'icon-hide-pwd', text: 'icon-show-pwd'}[passwordType]"
          class="iconfont"
          @click="changePasswordType"/>
      </label>
      <p class="login-form-error">{{ hintText }}</p>
    </div>
    <el-button
      :loading="loading"
      class="login-form-btn"
      type="primary"
      @click="login">
      登 录
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  props: {
    errorMessage: {
      type: String,
      default: ''
    },
    loadFlag: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      userInfo: {
        langlibUserName: '',
        langlibPwd: ''
      },
      hintText: '',
      loading: false,
      passwordType: 'password'
    }
  },
  watch: {
    errorMessage() {
      this.hintText = this.errorMessage
    },
    loadFlag() {
      this.loading = this.loadFlag
    },
    userInfo: {
      handler(newValue, oldValue) {
        if (this.hintText && (this.userInfo.langlibUserName || this.userInfo.langlibPwd)) this.hintText = ''
      },
      deep: true
    }
  },
  methods: {
    login() {
      if (this.hintText) this.hintText = ''
      if (!(this.userInfo.langlibUserName).trim() || !(this.userInfo.langlibPwd).trim()) {
        this.hintText = '用户名或密码不能为空。'
      } else {
        this.$emit('loginUserInfo', this.userInfo)
      }
    },
    changePasswordType() {
      this.passwordType = this.passwordType === 'password' ? 'text' : 'password'
    }
  }
}
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
  $bg: rgba(255, 255, 255, .2);
  .login-form-wrap {
    float: right;
    width: 340px;
    height: 300px;
    padding: 20px;
    box-sizing: border-box;
    background-color: $bg;
    border-radius: 10px;
    color: #fff;
    display: -webkit-flex;
    flex-direction: column;
    margin-top: 130px;
    margin-right: 30px;
    .login-form-title {
      text-align: center;
      margin-top: 5px;
    }
    .login-form-container {
      position: relative;
      height: 150px;
    }
    label {
      height: 40px;
      background-color: $bg;
      margin-top: 20px;
      border-radius: 10px;
      display: -webkit-flex;
      align-items: center;
      padding-left: 10px;
      padding-right: 10px;
      input {
        margin-left: 10px;
        margin-right: 20px;
        flex: 1;
        height: 30px;
        border: none;
        outline: none;
        background: none;
        color: #fff;
        &::-webkit-input-placeholder {
          color: #ddd;
        }
      }
    }
    .login-form-btn {
      font-size: 16px;
      margin-top: 18px;
    }
    .login-form-error {
      color: #e48229;
      position: absolute;
      bottom: -5px;
      font-size: 12px;
    }
  }
</style>
