import Vue from 'vue'
import App from './UserInfo/UserInfoResult.vue'

const vm = new Vue({
    el: '#userInfoApp',
    name: 'UserInfoApp',
    template: '<App />',
    components: { App },
});
