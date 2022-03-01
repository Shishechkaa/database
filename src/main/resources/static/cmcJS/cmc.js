var CMCApi = Vue.resource('/cmc{/cmc_number}');

Vue.component('cmc-form', {
    props: ['cmc_list'],
    data: function () {
        return {
            application_number: '',
            application_date: '',
            cmc_number: '',
            cmc_start_date: '',
            cmc_end_date: '',
            is_active: true
        }
    },
    template:
        '<div>' +
            '<input type="name" placeholder="Write application number" v-model="application_number"/>' +
            '<input type="name" placeholder="Write cmc number" v-model="cmc_number">' +
            '<div>Дата заявки: <input type="date" v-model="application_date"/></div>' +
            '<div>Дата выдачи УЧЭ: <input type="date" v-model="cmc_start_date"/></div>' +
            '<div>Дата окончания срока действия УЧЭ: <input type="date" v-model="cmc_end_date"/></div>' +
            '<div><input type="button" value="Save" @click="save"></div>' +
        '</div>',
    methods: {
        save: function () {
            var cmc_unit = {application_number: this.application_number,
                            application_date: this.application_date,
                            cmc_number: this.cmc_number,
                            cmc_start_date: this.cmc_start_date,
                            cmc_end_date: this.cmc_end_date,
                            is_active: this.is_active
            }

            CMCApi.save({}, cmc_unit).then(result =>
            result.json().then(data =>
            this.cmc_list.push(data)));
        }
    }
})

Vue.component('cmc-row', {
    props: ['cmc_unit'],
    data: function () {
        return {
            application_number: '',
            application_date: '',
            cmc_number: '',
            cmc_start_date: '',
            cmc_end_date: '',
            cmc_return_date: '',
            is_active: '',
            info: false
        }
    },
    template:
        '<div>' +
            'Номер УЧЭ: {{ cmc_number }} - ' +
            '<a v-if="is_active">Активен</a>' +
            '<a v-else>Не активен</a>' +
            '<form v-if="info">' +
                '<div>Номер заявки: {{ application_number }}</div>' +
                '<div>Дата заявки: {{ application_date }}</div>' +
                '<div>Дата выдачи УЧЭ: {{ cmc_start_date }}</div>' +
                '<div>Дата окончания срока действия УЧЭ: {{ cmc_end_date }}</div>' +
                '<div v-if="is_active">УЧЭ активно</div>' +
                '<div v-else>Дата возврата УЧЭ: {{ cmc_retrun_date }}</div>' +
            '</form>' +
            '<div v-if="!info"><button @click="info=!info">Показать</button></div>' +
            '<div v-else><button @click="info=!info">Скрыть</button></div>' +
        '</div>'
})

Vue.component('cmc-list', {
    props: ['cmc_list'],
    template:
        '<div>' +
            '' +
        '</div>'
})

var CMCApp = new Vue ({
    el: '#CMCApp',
    template:
        '<cmc-list :cmc_list="cmc_list"/>',
    data: {
        cmc_list: []
    }
})