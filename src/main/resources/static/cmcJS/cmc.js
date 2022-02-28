function getIndex(list, id) {
    for(var i = 0; i <list.length; i++ ) {
        if(list[i].id === id) {
            return i;
        }
    }
    return -1;
}

var CMCApi = Vue.resource('/cmc{/id}');

Vue.component('memberUpdate-form')

Vue.component('member-form', {
    props: ['members', 'memberAttr'],
    data: function() {
        return {
            application_number: '',
            application_date: '',
            id: '',
            cmc_start_date: '',
            cmc_end_date: '',
            cmc_return_date: '',
            is_active: ''
        }
    },

    watch: {
        memberAttr: function(newVal) {
            this.application_number = newVal.application_number;
            this.application_date = newVal.application_date;
            this.id = newVal.id;
            this.cmc_start_date = newVal.cmc_end_date;
            this.cmc_return_date = newVal.cmc_return_date;
            this.is_active = newVal.is_active
        }
    },

    template:
        '<div>' +
        '<form>' +
        '<input type="name" placeholder="Write application number" v-model="application_number"/>' +
        '<input type="name" placeholder="Write application date" v-model="application_date"/>' +
        '<input type="name" placeholder="Write cmc number" v-model="id"/>' +
        '</form><form>' +
        'CMC start date: <input type="date" placeholder="Write cmc start date" v-model="cmc_start_date"/>' +
        '</form><form>' +
        'CMC end date: <input type="date" placeholder="Write cmc end date" v-model="cmc_end_date">' +
        '</form><form>' +
        'CMC return date: <input type="date" placeholder="Write cmc_return_date" v-model="cmc_return_date">' +
        '</form>' +
        '<input type="button" value="Activate/Save" @click="save"/>' +
        '</div>',

    methods: {
        save: function() {
            var member = {application_number: this.application_number,
                application_date: this.application_date,
                id: this.id,
                cmc_start_date: this.cmc_start_date,
                cmc_end_date: this.cmc_end_date,
                cmc_return_date: this.cmc_return_date,
                is_active: true
            };

            if(this.id) {
                CMCApi.update({id: this.id}, member).then(result =>
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
                CMCApi.save({}, member).then(result =>
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
        '{{ member.application_number }} {{ member.application_date }} {{ member.is_active}}' +
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
            CMCApi.remove({id: this.member.id}).then(result => {
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
        '<div class="scroll">' +
        '<member-form :members="members" :memberAttr="member"/>' +
        '<member-row v-for="member in members" :key="member.id" :member="member"' +
        ':updateMember="updateMember" :members="members"/>' +
        '</div>',

    created: function () {
        CMCApi.get().then(result =>
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

var CMCApp = new Vue({
    el: '#CMCApp',
    template: '<members-list :members="members"/>',
    data: {
        members:[]
    }
})