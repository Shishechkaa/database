function getIndex(list, id) {
    for(var i = 0; i <list.length; i++ ) {
        if(list[i].id === id) {
            return i;
        }
    }
    return -1;
}

var ShipCrewApi = Vue.resource('/shipcrew{/id}');

Vue.component('member-form', {
    props: ['members', 'memberAttr'],
    data: function() {
        return {
            text: '',
            id: ''
        }
    },

    watch: {
        memberAttr: function(newVal) {
            this.text = newVal.text;
            this.id = newVal.id;
        }
    },

    template:
        '<div>' +
            '<input type="name" placeholder="Write name" v-model="text"/>' +
            '<input type="button" value="Save" @click="save"/>' +
        '</div>',

    methods: {
        save: function() {
            var member = {text: this.text};

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
            '<i>({{ member.id }})</i> {{ member.text }}' +
            '<span style="position: absolute; right: 0">' +
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
            '<member-row v-for="member in members" :key="member.id" :member="member"' +
            ':updateMember="updateMember" :members="members"/>' +
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