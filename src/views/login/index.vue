<template>
  <div class="login-container">
    <div class="login-banner-wrap">
      <div class="login-narrow">
        <h1 class="login-slogan">CRM后台管理系统</h1>
        <login-form
          :load-flag="loading"
          :error-message="errorMessage"
          @loginUserInfo="handleLogin"
          @setLoadFlag="setLoadFlag"/>
      </div>
    </div>
    <ul class="login-content-list">
      <li class="login-content-resource">
        <img src="@/assets/login/login_resource.png" alt="">
        <h3>优势的教育资源</h3>
        <p>10 年经验名师团队，课程有<br>效有料，传授高分秘诀。</p>
      </li>
      <li class="login-content-plan">
        <img src="@/assets/login/login_plan.png" alt="">
        <h3>精准的练习规划</h3>
        <p>精准能力评测、个性化训练计<br>划，提升备考效率。</p>
      </li>
      <li class="login-content-data">
        <img src="@/assets/login/login_data.png" alt="">
        <h3>全面的数据跟踪</h3>
        <p>学习数据实时记录，训练质量全<br>面跟踪，管控学习过程。</p>
      </li>
      <li class="login-content-system">
        <img src="@/assets/login/login_system.png" alt="">
        <h3>科学的管理体系</h3>
        <p>多维度数据建模，协同校长、教<br>师、学生及家长高效融合。</p>
      </li>
    </ul>
  </div>
</template>

<script>
import loginForm from './components/LoginForm'
export default {
  name: 'Login',
  components: {
    loginForm
  },
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: 'admin'
      },
      loading: false,
      pwdType: 'password',
      redirect: undefined,
      errorMessage: ''
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      this.pwdType = this.pwdType === 'password' ? '' : 'password'
    },
    handleLogin(userInfo) {
      this.loading = true
      this.$store.dispatch('Login', userInfo).then(() => {
        this.loading = false
        this.$router.push({ path: this.redirect || '/' })
      }).catch((err) => {
        this.loading = false
        this.errorMessage = err.message
      })
    },
    setLoadFlag(bool) {
      this.loading = bool
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .login-container {
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
    .login-banner-wrap {
      height: 500px;
      background-image: url(../../assets/login/login_banner.png);
      background-size: cover;
      color: #fff;
    }
    .login-narrow {
      width: 1140px;
      margin: 0 auto;
    }
    .login-slogan {
      float: left;
      margin-top: 130px;
      margin-left: 30px;
      font-size: 48px;
    }
    .login-content-list {
      width: 1140px;
      margin: 74px auto 74px;
      li {
        float: left;
        margin-left: 44px;
        text-align: center;
      }
      img {
        display: block;
        width: 145px;
        height: 102px;
        margin: auto;
      }
      h3 {
        margin: 25px auto 12px;
        font-size: 20px;
      }
      p {
        color: #767676;
        font-size: 18px;
      }
      li:first-child {
        margin-left: 0;
      }
      &:after {
        content: "";
        display: block;
        clear: both;
      }
    }
    .login-content-resource i {
      background: url(../../assets/login/login_resource.png) 50% no-repeat;
    }
    .login-content-plan i {
      background: url(../../assets/login/login_plan.png) 50% no-repeat;
    }
    .login-content-data i {
      background: url(../../assets/login/login_data.png) 50% no-repeat;
    }
    .login-content-system i {
      background: url(../../assets/login/login_system.png) 50% no-repeat;
    }
    .login-hotline {
      display: inline-block;
      font-size: 18px;
      i {
        float: left;
        margin-right: 10px;
        margin-top: 8px;
        width: 22px;
        height: 22px;
      }
    }
  }
</style>
