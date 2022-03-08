function getIndex(list, id) {
    for(var i = 0; i <list.length; i++ ) {
        if(list[i].id === id) {
            return i;
        }
    }
    return -1;
}

var CandidateApi = Vue.resource('/candidate{/id}');
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
            id: '',
            approved: false
        }
    },

    watch: {
        memberAttr: function(newVal) {
            this.first_name = newVal.first_name;
            this.second_name = newVal.second_name;
            this.third_name = newVal.third_name;
            this.first_name_foreign = newVal.first_name_foreign;
            this.id = newVal.id;
            this.approved = newVal.approved;
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
                first_name_foreign: this.first_name_foreign,
                approved: false
            };

            if(this.id) {
                CandidateApi.update({id: this.id}, member).then(result =>
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
                CandidateApi.save({}, member).then(result =>
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
    data: function () {
        return {
            approved: this.member.approved
        }
    },
    template:
        '<div>' +
            '<input v-if="approved" type="button" value="Добавить в команду" @click="pushInCrew"/>' +
            '<i>({{ member.id }})</i>' +
            '{{ member.second_name }} {{ member.first_name }} {{ member. third_name}}' +
            '<span style="position: absolute; right: 0">' +
                '<input type="button" value="Одобрить" @click="approve"/>' +
                '<input type="button" value="Update" @click="update"/>' +
                '<input type="button" value="X" @click="del"/>' +
            '</span>' +
        '</div>',

    methods: {
        update: function() {
            this.updateMember(this.member);
        },

        del: function() {
            CandidateApi.remove({id: this.member.id}).then(result => {
                if(result.ok) {
                    this.members.splice(this.members.indexOf(this.member), 1)
                }
            })
        },

        approve: function () {
            if (this.approved === null) {
                this.approved = true;
            } else {
                this.approved = !this.approved;
            }
        },

        pushInCrew: function () {
            var member = {
                id: '',
                first_name: this.member.first_name,
                second_name: this.member.second_name,
                third_name: this.member.third_name,
                first_name_foreign: this.member.first_name_foreign,
                second_name_foreign: this.member.second_name_foreign,
                position: this.member.position,
                division: this.member.division,
                citizenship: this.member.citizenship,
                birth_date: this.member.birth_date,
                last_work: this.member.last_work
            }
            if(this.approved) {
                ShipCrewApi.save({}, member);
                CandidateApi.remove({id: this.member.id}).then(result => {
                    if(result.ok)
                        this.members.splice(this.members.indexOf(this.member), 1)
                });
            }
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
        CandidateApi.get().then(result =>
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

var CandidateApp = new Vue({
    el: '#CandidateApp',
    template: '<members-list :members="members"/>',
    data: {
        members:[]
    }
})