var UserApi = Vue.resource('/user{/id}');
/*var csrf_token = $('meta[name="csrf-token"]').attr('content');*/

Vue.component('user-row', {
    props: ['user'],
    data: function () {
        return {
            username: '',
            roles: [],
            id: ''
        }
    },

    template:
        '<div>' +
            '{{ user.username }}' +
            '<input type="text" value="" v-model="username"/>' +
            '<input type="checkbox" id="user" value="USER" v-model="user.roles" @change="update_roles"/>' +
            '<label for="user">User</label>' +
            '<input type="checkbox" id="admin" value="ADMIN" v-model="user.roles" @change="update_roles"/>' +
            '<label for="admin">Admin</label>' +
            '<div><span>Отмеченные роли: {{user.roles}}</span></div>' +
        '</div>',

    methods: {
        update_roles: function () {
            var user = {id: this.user.id,
                        username: this.user.username,
                        password: null,
                        roles: this.user.roles,
                        active: true}
            UserApi.update({id: this.user.id}, user);
        }
    }
})

Vue.component('user-list', {
    props: ['users'],

    data: function () {
        return {
            user: null
        }
    },

    template:
        '<div>' +
        '<user-row v-for="user in users" :key="user.id" :user="user" :users="users"/>' +
        '</div>',

    created: function () {
        UserApi.get().then(result =>
            result.json().then(data =>
                data.forEach(user => this.users.push(user))
            )
        )
    }
})

var UserApp = new Vue({
    el: '#UserApp',
    template:
    '<user-list :users="users"/>',
    data: {
        /*token: csrf_token,*/
        users:[]
    }
})