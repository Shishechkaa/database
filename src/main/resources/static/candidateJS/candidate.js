function isEmptyCandidate(candidate) {
    return ((candidate.first_name === '') && (candidate.second_name === '') && (candidate.third_name === '')
        && (candidate.first_name_foreign === '') && (candidate.second_name_foreign === '') && (candidate.position === '')
        && (candidate.division === '') && (candidate.citizenship === '') &&
        (candidate.birth_date === '' || candidate.birth_date === null) && (candidate.debts === ''));
}

function isEqualCandidates(fromList, filter) {
    return ((fromList.first_name === filter.first_name) || (filter.first_name === '')) &&
        ((fromList.second_name === filter.second_name) || (filter.second_name === '')) &&
        ((fromList.third_name === filter.third_name) || (filter.third_name === '')) &&
        ((fromList.first_name_foreign === filter.first_name_foreign) || (filter.first_name_foreign === '')) &&
        ((fromList.second_name_foreign === filter.second_name_foreign) || (filter.second_name_foreign === '')) &&
        ((fromList.position === filter.position) || (filter.position === '')) &&
        ((fromList.division === filter.division) || (filter.division === '')) &&
        ((fromList.citizenship === filter.citizenship) || (filter.citizenship === '')) &&
        ((fromList.birth_date === filter.birth_date) || (filter.birth_date == null)) &&
        ((fromList.debts === filter.debts) || (filter.debts === ''))
}

var CandidateApi = Vue.resource('/candidate{/id}')
var CandidateDeleteApi = Vue.resource('/candidate/delete{/id}')
var ShipCrewApi = Vue.resource('/shipcrew{/id}')

Vue.component('candidate-unit-details', {
    props: ['candidate'],
    template:
        '<div>' +
            'Details:<br/>' +
                'Имя в загранпасспорте: {{candidate.first_name_foreign}}<br/>' +
                'Фамилия в загранпаспорте: {{candidate.second_name_foreign}}<br/>' +
                'Должность: {{candidate.position}}<br/>' +
                'Подразделение: {{candidate.division}}<br/>' +
                'Гражданство: {{candidate.citizenship}}<br/>' +
                'Долги судебным приставам: {{candidate.debts}}' +
        '</div>',
})

Vue.component('candidate-unit-update', {
    props: ['candidate', 'update_candidate'],
    data: function () {
        return {
            first_name: this.candidate.first_name,
            second_name: this.candidate.second_name,
            third_name: this.candidate.third_name,
            first_name_foreign: this.candidate.first_name_foreign,
            second_name_foreign: this.candidate.second_name_foreign,
            position: this.candidate.position,
            division: this.candidate.division,
            citizenship: this.candidate.citizenship,
            birth_date: this.candidate.birth_date,
            last_work: this.candidate.birth_date,
            debts: this.candidate.debts,
            approved: this.candidate.approved
        }
    },
    template:
        '<div>' +
            '<input type="name" placeholder="Write first name" v-model="first_name"/>' +
            '<input type="name" placeholder="Write second name" v-model="second_name"/>' +
            '<input type="name" placeholder="Write third name" v-model="third_name"/>' +
            '<input type="name" placeholder="Write first name foreign" v-model="first_name_foreign"/>' +
            '<input type="name" placeholder="Write second name foreign" v-model="second_name_foreign"/>' +
            '<input type="name" placeholder="Write position" v-model="position"/>' +
            '<input type="name" placeholder="Write division" v-model="division"/>' +
            '<input type="name" placeholder="Write citizenship" v-model="citizenship"/>' +
            '<input type="name" placeholder="Write last work" v-model="last_work"/>' +
            '<input type="name" placeholder="Write debts" v-model="debts"/>' +
            '<div>Дата рождения: <input type="date" v-model="birth_date"></div>' +
            '<div><input type="button" value="Save" @click="push_updates"/></div>' +
        '</div>',

    methods: {
        push_updates: function () {
            var updates = {
                human: {
                    first_name: this.first_name, second_name: this.second_name,
                    third_name: this.third_name, first_name_foreign: this.first_name_foreign,
                    second_name_foreign: this.second_name_foreign, position: this.position,
                    division: this.division, citizenship: this.citizenship,
                    birth_date: this.birth_date, last_work: this.birth_date
                }, debts: this.debts, approved: this.approved
            }

            this.update_candidate(updates)
        }
    }
})

Vue.component('candidate-unit', {
    props: ['approved', 'candidate', 'approve', 'update', 'del'],
    data: function () {
        return {
            info: false,
            on_update: false
        }
    },
    template:
        '<div>' +
            '<h4>' +
                '<input v-if="approved" type="button" value="Добавить в команду" @click="pushInCrew"/>' +
                '<i hidden>({{ candidate.id }})</i>' +
                '{{ candidate.second_name }} {{ candidate.first_name }} {{ candidate. third_name}}' +
            '</h4>' +
            '<candidate-unit-details v-if="info" :candidate="candidate"/><br/>' +
            '<input type="button" value="Details" @click="info=!info"/>' +
        '</div>'
})

Vue.component('candidate-form', {
    props: ['candidates', 'candidateAttr', 'searchStatusUpdate'],
    data: function() {
        return {
            id: '', first_name: '', second_name: '', third_name: '',
            first_name_foreign: '', second_name_foreign: '',
            position: '', division: '', citizenship: '', birth_date: null,
            last_work: '', debts: '', approved: false
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
            '<div>' +
                '<input type="button" value="Save" @click="save"/> ' +
                '<input type="button" value="Search" @click="searchByFilter"/>' +
            '</div>' +
        '</div>',

    methods: {
        save: function() {
            var candidate = {
                human: {
                    first_name: this.first_name, second_name: this.second_name, third_name: this.third_name,
                    first_name_foreign: this.first_name_foreign, second_name_foreign: this.second_name_foreign,
                    position: this.position, division: this.division, citizenship: this.citizenship,
                    birth_date: this.birth_date, last_work: this.last_work,
                },
                debts: this.debts, approved: false
            };
            CandidateApi.save({}, candidate).then(result =>
                result.json().then(data => {
                    var new_candidate = data.human
                    new_candidate.debts = data.debts
                    new_candidate.approved = data.approved
                    this.candidates.push(new_candidate);
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
        },

        searchByFilter: function () {
            var filter = {
                first_name: this.first_name, second_name: this.second_name, third_name: this.third_name,
                first_name_foreign: this.first_name_foreign, second_name_foreign: this.second_name_foreign,
                position: this.position, division: this.division, citizenship: this.citizenship,
                birth_date: this.birth_date, last_work: this.last_work, debts: this.debts
            }

            if(!isEmptyCandidate(filter)) {
                this.searchStatusUpdate(true, filter)
            } else {
                this.searchStatusUpdate(false, [])
            }
        }
    }
})

Vue.component('candidate-row', {
    props: ['candidate', 'candidates'],
    data: function () {
        return {
            approved: this.candidate.approved,
            on_update: false
        }
    },
    template:
        '<div class="member_row">' +
            '<template v-if="on_update">' +
                '<candidate-unit-update :candidate="candidate" :update_candidate="update_candidate"/>' +
            '</template>' +
            '<template v-else>' +
                '<candidate-unit :approved="approved" :candidate="candidate" :approve="approve" ' +
                ':del="del"/>' +
            '</template>' +
            '<span style="float: inside">' +
                '<input type="button" value="Одобрить" @click="approve"/>' +
                '<input type="button" value="Update" @click="on_update=!on_update"/>' +
                '<input type="button" value="X" @click="del"/>' +
            '</span>' +
        '</div>',

    methods: {
        update_candidate: function(updates) {
            this.on_update = false
            CandidateApi.update({id: this.candidate.id}, updates).then(result =>
                result.json().then(data => {
                        var updated_candidate = data.human
                        updated_candidate.debts = data.debts
                        updated_candidate.approved = data.approved
                        this.candidates.splice(this.candidates.indexOf(this.candidate), 1, updated_candidate)
                    }
                )
            )
        },

        del: function() {
            CandidateDeleteApi.remove({id: this.candidate.id}).then(result => {
                if(result.ok) {
                    this.candidates.splice(this.candidates.indexOf(this.candidate), 1)
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
            var candidate = {
                first_name: this.candidate.first_name, second_name: this.candidate.second_name,
                third_name: this.candidate.third_name, first_name_foreign: this.candidate.first_name_foreign,
                second_name_foreign: this.candidate.second_name_foreign, position: this.candidate.position,
                division: this.candidate.division, citizenship: this.candidate.citizenship,
                birth_date: this.candidate.birth_date, last_work: this.candidate.last_work
            }
            if(this.approved) {
                ShipCrewApi.save({}, candidate);
                CandidateDeleteApi.remove({id: this.candidate.id}).then(result => {
                    if(result.ok)
                        this.candidates.splice(this.candidates.indexOf(this.candidate), 1)
                });
            }
        }
    }
})

Vue.component('candidates-list', {

    props: ['candidates'],

    data: function() {
        return {
            candidate: null,
            filtered_candidate: null,
            searching: false,
            filtered_candidates: []
        }
    },

    template:
        '<div>' +
            '<candidate-form :candidates="candidates" :candidateAttr="candidate" :searchStatusUpdate="searchStatusUpdate"/>' +
            '<div class="scroll">' +
                '<template v-if="!searching"><candidate-row v-for="candidate in candidates" :key="candidate.id" ' +
                ':candidate="candidate" :candidates="candidates"/></template>' +
                '<template v-else><candidate-row v-for="filtered_candidate in filtered_candidates" ' +
                ':key="filtered_candidate.id" ' +
                ':candidate="filtered_candidate" :candidates="filtered_candidates"/></template>' +
            '</div>' +
        '</div>',

    created: function () {
        CandidateApi.get().then(result =>
            result.json().then(data =>
                data.forEach(candidate => {
                    var new_candidate = candidate.human
                    new_candidate.debts = candidate.debts
                    new_candidate.approved = candidate.approved
                    this.candidates.push(new_candidate)
                })
            )
        )
    },

    methods: {
        searchStatusUpdate: function(status, searching_candidates) {
            this.filtered_candidates.splice(0)
            this.candidates.splice(0)
            CandidateApi.get().then(result =>
                result.json().then(data =>
                    data.forEach(candidate => {
                            var unpackCandidate = candidate.human
                            unpackCandidate.debts = candidate.debts
                            unpackCandidate.approved = candidate.approved
                            this.candidates.push(unpackCandidate)
                        }
                    )
                )
            )
            if(this.searching = status) {
                for (var i = 0; i < this.candidates.length; ++i) {
                    if (isEqualCandidates(this.candidates[i], searching_candidates))
                        this.filtered_candidates.push(this.candidates[i])
                }
            }
        }

    }
})

var CandidateApp = new Vue({
    el: '#CandidateApp',
    template: '<candidates-list :candidates="candidates"/>',
    data: {
        candidates:[]
    }
})