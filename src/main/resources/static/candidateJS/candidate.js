function isEmpty(member) {
    return ((member.first_name === '') && (member.second_name === '') && (member.third_name === '')
        && (member.first_name_foreign === '') && (member.second_name_foreign === '') && (member.position === '')
        && (member.division === '') && (member.citizenship === '') &&
        (member.birth_date === '' || member.birth_date === null));
}

var CandidateApi = Vue.resource('/candidate{/id}');
var CandidateDeleteApi = Vue.resource('/candidate/delete{/id}')
var ShipCrewApi = Vue.resource('/shipcrew{/id}');
var ShipCrewDeleteApi = Vue.resource('/shipcrew/delete{/id}')

Vue.component('memberUpdate-form')

Vue.component('member-form', {
    props: ['members', 'memberAttr', 'search_Candidate'],
    data: function() {
        return {
            id: '',
            first_name: '',
            second_name: '',
            third_name: '',
            first_name_foreign: '',
            second_name_foreign: '',
            position: '',
            division: '',
            citizenship: '',
            birth_date: null,
            last_work: '',
            debts: '',
            approved: false
        }
    },

    watch: {
        memberAttr: function(newVal) {
            this.id = newVal.id;
            this.first_name = newVal.first_name;
            this.second_name = newVal.second_name;
            this.third_name = newVal.third_name;
            this.first_name_foreign = newVal.first_name_foreign;
            this.second_name_foreign = newVal.second_name_foreign;
            this.position = newVal.position;
            this.division = newVal.division;
            this.citizenship = newVal.citizenship;
            this.birth_date = newVal.birth_date;
            this.last_work = newVal.last_work;
            this.debts = newVal.debts;
            this.approved = newVal.approved;
        }
    },

    template:
        '<div>' +
            '<input type="name" placeholder="Write Name" v-model="first_name"/>' +
            '<input type="name" placeholder="Write second name" v-model="second_name"/>' +
            '<input type="name" placeholder="Write third name" v-model="third_name"/>' +
            '<input type="name" placeholder="Write foreign first name" v-model="first_name_foreign"/>' +
            '<input type="name" placeholder="Write foreign second name" v-model="second_name_foreign"/>' +
            '<input type="name" placeholder="Write position" v-model="position"/>' +
            '<input type="name" placeholder="Write division" v-model="division"/>' +
            '<input type="name" placeholder="Write citizenship" v-model="citizenship"/>' +
            '<input type="name" placeholder="Write last work" v-model="last_work"/>' +
            '<input type="name" placeholder="Write debts" v-model="debts"/>' +
            '<div>Дата рождения: <input type="date" v-model="birth_date"/></div>' +
            '<div><input type="button" value="Save" @click="save"/>' +
            '<input type="button" value="Search" @click="search_can"></div>' +
        '</div>',

    methods: {
        save: function() {
            var member = {
                first_name: this.first_name,
                second_name: this.second_name,
                third_name: this.third_name,
                first_name_foreign: this.first_name_foreign,
                second_name_foreign: this.second_name_foreign,
                position: this.position,
                division: this.division,
                citizenship: this.citizenship,
                birth_date: this.birth_date,
                last_work: this.last_work,
                debts: this.debts,
                approved: false
            };

            if(this.id) {
                CandidateApi.update({id: this.id}, member).then(result =>
                    result.json().then(data => {
                        this.members.splice(this.members.indexOf(member), 1, data);
                        this.id = ''
                        this.first_name = ''
                        this.second_name = ''
                        this.third_name = ''
                        this.first_name_foreign = ''
                        this.second_name_foreign = ''
                        this.position = ''
                        this.division = ''
                        this.citizenship = ''
                        this.birth_date = null
                        this.last_work = ''
                        this.debts = ''
                    })
                )
            } else {
                CandidateApi.save({}, member).then(result =>
                    result.json().then(data => {
                        this.members.push(data);
                        this.id = ''
                        this.first_name = ''
                        this.second_name = ''
                        this.third_name = ''
                        this.first_name_foreign = ''
                        this.second_name_foreign = ''
                        this.position = ''
                        this.division = ''
                        this.citizenship = ''
                        this.birth_date = null
                        this.last_work = ''
                        this.debts = ''
                    })
                )
            }
        },

        search_can: function () {
            var member = {
                first_name: this.first_name,
                second_name: this.second_name,
                third_name: this.third_name,
                first_name_foreign: this.first_name_foreign,
                second_name_foreign: this.second_name_foreign,
                position: this.position,
                division: this.division,
                citizenship: this.citizenship,
                birth_date: this.birth_date,
                last_work: this.last_work,
                debts: this.debts,
                approved: false
            };

            this.search_Candidate(member)

            this.id = ''
            this.first_name = ''
            this.second_name = ''
            this.third_name = ''
            this.first_name_foreign = ''
            this.second_name_foreign = ''
            this.position = ''
            this.division = ''
            this.citizenship = ''
            this.birth_date = null
            this.last_work = ''
            this.debts = ''
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
            '<span style="position: absolute; right: 30px">' +
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
            CandidateDeleteApi.remove({id: this.member.id}).then(result => {
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
                CandidateDeleteApi.remove({id: this.member.id}).then(result => {
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
            '<member-form :members="members" :memberAttr="member" :search_Candidate="search_Candidate"/>' +
            '<div class="scroll">' +
                '<member-row v-for="member in members" :key="member.id" :member="member" ' +
                ':updateMember="updateMember" :members="members"/>' +
            '</div>' +
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
        },

        search_Candidate: function (member) {
            this.members.splice(0);
            if(isEmpty(member)) {
                CandidateApi.get().then(result =>
                    result.json().then(data =>
                        data.forEach(member => this.members.push(member))
                    )
                )
            } else {
                CandidateApi.update({id: "search"}, member).then(result =>
                    result.json().then(data =>
                        data.forEach(member => this.members.push(member))
                    )
                )
            }
        },
    }
})

var CandidateApp = new Vue({
    el: '#CandidateApp',
    template: '<members-list :members="members"/>',
    data: {
        members:[]
    }
})