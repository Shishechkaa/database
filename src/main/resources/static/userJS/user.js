var UserApi = Vue.resource('/user{/id}');
/*var csrf_token = $('meta[name="csrf-token"]').attr('content');*/

Vue.component('user-form', {
    props: ['users'],
    data: function () {
        return {
            username: '',
            password: ''
        }
    },
    template:
    '<div>' +
        '<div>' +
            '<input type="name" placeholder="Write UserName" v-model="username"/>' +
        '</div>' +
        '<div>' +
            '<input type="name" placeholder="Write Password" v-model="password"/>' +
        '</div>' +
        '<div>' +
            '<input type="button" value="Save" @click="save"/>' +
        '</div>' +
    '</div>',
    methods: {
        save: function () {
            var user = {id: '',
                username: this.username,
                password: this.password,
                roles: ["USER"],
                active: true}
            UserApi.save({}, user).then(result =>
            result.json().then(data => {
                this.users.push(data);
                this.username = '';
                this.password = '';
            }));
        }
    }
})

Vue.component('user-row', {
    props: ['user'],
    data: function () {
        return {
            username: '',
            roles: [],
            id: '',
            active: ''
        }
    },

    template:
        '<div>' +
            '<input type="text" value="username" v-model="user.username" @keyup.enter="update_user"/>' +
                '<input type="checkbox" id="user" value="USER" v-model="user.roles" @change="update_user"/>' +
                '<label for="user">User</label>' +
                '<input type="checkbox" id="admin" value="ADMIN" v-model="user.roles" @change="update_user"/>' +
                '<label for="admin">Admin</label>' +
            '<div><span>Отмеченные роли: {{user.roles}}</span></div>' +
            '<div><span>Статус учетной записи: ' +
                '<input type="checkbox" id="activ" v-model="user.active" @change="update_user"/>' +
                '<label for="activ"><a v-if="user.active">Active</a><a v-else>Non-active</a></label>' +
            '</span></div>' +
        '</div>',

    methods: {
        update_user: function () {
            var user = {id: this.user.id,
                        username: this.user.username,
                        password: null,
                        roles: this.user.roles,
                        active: this.user.active}
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
            '<h3>Форма регистрации:</h3>' +
            '<user-form :users="users"/>' +
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