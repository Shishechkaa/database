function getIndex(list, id) {
    for(var i = 0; i <list.length; i++ ) {
        if(list[i].id === id) {
            return i;
        }
    }
    return -1;
}

var ShipCrewApi = Vue.resource('/shipcrew{/id}');

Vue.component('memberUpdate-form')

Vue.component('member-form', {
    props: ['members', 'memberAttr'],
    data: function() {
        return {
            first_name: '',
            second_name: '',
            third_name: '',
            first_name_foreign: '',
            id: ''
        }
    },

    watch: {
        memberAttr: function(newVal) {
            this.first_name = newVal.first_name;
            this.second_name = newVal.second_name;
            this.third_name = newVal.third_name;
            this.first_name_foreign = newVal.first_name_foreign;
            this.id = newVal.id;
        }
    },

    template:
        '<div>' +
        '<input type="name" placeholder="Write Name" v-model="first_name"/>' +
        '<input type="name" placeholder="Write second name" v-model="second_name"/>' +
        '<input type="name" placeholder="Write third name" v-model="third_name"/>' +
        '<input type="name" placeholder="Write foreign first name" v-model="first_name_foreign"/>' +
        '<input type="button" value="Save" @click="save"/>' +
        '</div>',

    methods: {
        save: function() {
            var member = {first_name: this.first_name,
                second_name: this.second_name,
                third_name: this.third_name,
                first_name_foreign: this.first_name_foreign
            };

            if(this.id) {
                ShipCrewApi.update({id: this.id}, member).then(result =>
                    result.json().then(data => {
                        var index = getIndex(this.members, data.id);
                        this.members.splice(index, 1, data);
                        this.first_name = ''
                        this.second_name = ''
                        this.third_name = ''
                        this.first_name_foreign = ''
                        this.id = ''
                    })
                )
            } else {
                ShipCrewApi.save({}, member).then(result =>
                    result.json().then(data => {
                        this.members.push(data);
                        this.text = ''
                    })
                )
            }
        }
    }
})

Vue.component('member-row', {
    props: ['member', 'updateMember', 'members'],
    template:
        '<div>' +
            '<i>({{ member.id }})</i>' +
            '{{ member.second_name }} {{ member.first_name }} {{ member. third_name}}' +
            '<span style="position: absolute; right: 30px">' +
                '<input type="button" value="Update" @click="update"/>' +
                '<input type="button" value="X" @click="del"/>' +
            '</span>' +
        '</div>',

    methods: {
        update: function() {
            this.updateMember(this.member);
        },

        del: function() {
            ShipCrewApi.remove({id: this.member.id}).then(result => {
                if(result.ok) {
                    this.members.splice(this.members.indexOf(this.member), 1)
                }
            })
        }
    }
})

Vue.component('members-list', {

    props: ['members'],

    data: function() {
        return {
            member: null
        }
    },

    template:
        '<div>' +
        '<member-form :members="members" :memberAttr="member"/>' +
        '<div class="scroll">' +
        '<member-row v-for="member in members" :key="member.id" :member="member"' +
        ':updateMember="updateMember" :members="members"/>' +
        '</div>' +
        '</div>',

    created: function () {
        ShipCrewApi.get().then(result =>
            result.json().then(data =>
                data.forEach(member => this.members.push(member))
            )
        )
    },

    methods: {
        updateMember: function (member) {
            this.member = member;
        }
    }
})

var ShipCrewApp = new Vue({
    el: '#ShipCrewApp',
    template: '<members-list :members="members"/>',
    data: {
        members:[]
    }
})