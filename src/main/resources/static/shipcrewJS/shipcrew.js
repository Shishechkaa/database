function isEmpty(member) {
    return ((member.first_name === '') && (member.second_name === '') && (member.third_name === '')
        && (member.first_name_foreign === '') && (member.second_name_foreign === '') && (member.position === '')
        && (member.division === '') && (member.citizenship === '') && (member.birth_date === ''));
}

var OrderApi = Vue.resource('/order{/shipCrew_id}');

Vue.component('order-row', {
    props: ['order'],
    template:
        '<div class="doc_window">' +
            '<a style="position: relative; top: -15px">Приказ:</a>' +
            '<div style="position: relative; top: -15px">{{ order.order_type }}</div>' +
            '<div style="position: relative; top: -15px">Номер приказа: {{ order.order_number }}</div>' +
            '<div style="position: relative; top: -15px">Дата приказа: {{ order.order_date }}</div>' +
        '</div>'
})

var CMCApi = Vue.resource('/cmc{/shipCrew_id}');

Vue.component('cmc-form', {
    props: ['cmc_list', 'shipCrew'],
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
            var cmc = {application_number: this.application_number,
                application_date: this.application_date,
                cmc_number: this.cmc_number,
                cmc_start_date: this.cmc_start_date,
                cmc_end_date: this.cmc_end_date,
                is_active: this.is_active
            }

            CMCApi.save({shipCrew_id: this.shipCrew}, cmc).then(result =>
                result.json().then(data => {
                    this.cmc_list.push(data);
                    this.application_number = '';
                    this.application_date = '';
                    this.cmc_number = '';
                    this.cmc_start_date = '';
                    this.cmc_end_date = '';
                    this.is_active = true;
                }));
        }
    }
})

Vue.component('cmc-row', {
    props: ['cmc_unit','shipCrew', 'cmc_list'],
    data: function () {
        return {
            info: false
        }
    },
    template:
        '<div>' +
            '<a hidden>{{ shipCrew }}</a>' +
            'Номер УЧЭ: {{ cmc_unit.cmc_number }} - ' +
            '<a v-if="cmc_unit.is_active">Активен</a>' +
            '<a v-else>Не активен</a>' +
            '<form v-if="info">' +
                '<div>Номер заявки: {{ cmc_unit.application_number }}</div>' +
                '<div>Дата заявки: {{ cmc_unit.application_date }}</div>' +
                '<div>Дата выдачи УЧЭ: {{ cmc_unit.cmc_start_date }}</div>' +
                '<div>Дата окончания срока действия УЧЭ: {{ cmc_unit.cmc_end_date }}</div>' +
                '<div v-if="cmc_unit.is_active">УЧЭ активно</div>' +
                '<div v-else>Дата возврата УЧЭ: {{ cmc_unit.cmc_retrun_date }}</div>' +
            '</form>' +
            '<div v-if="!info"><span>' +
                '<button @click="info=!info">Показать</button>' +
                '<button @click="del">X</button>' +
            '</span></div>' +
            '<div v-else><span>' +
                '<button @click="info=!info">Скрыть</button>' +
                '<button @click="del">X</button>' +
            '</span></div>' +
        '</div>',

    methods: {
        del: function () {
            CMCApi.remove({shipCrew_id: this.shipCrew}, this.cmc_unit).then(result => {
                if (result.ok)
                    this.cmc_list.splice(this.cmc_list.indexOf(this.cmc_unit), 1)
            })
        }
    }
})

Vue.component('cmc-list', {
    props: ['cmc_list', 'shipCrew'],

    data: function () {
        return {
            cmc_unit: null
        }
    },

    template:
        '<div>' +
            '<cmc-form :cmc_list="cmc_list" :shipCrew="shipCrew"/>' +
            '<div class="scroll">' +
                '<cmc-row v-for="cmc_unit in cmc_list" :key="cmc_unit.cmc_number" :cmc_unit="cmc_unit" ' +
                ':shipCrew="shipCrew"/>' +
            '</div>' +
        '</div>',

    created: function () {
        this.cmc_list.splice(0);
        CMCApi.get({shipCrew_id: this.shipCrew}).then(result =>
            result.json().then(data =>
                data.forEach(member => this.cmc_list.push(member))
            )
        );
    }
})

var ShipCrewApi = Vue.resource('/shipcrew{/id}');

Vue.component('memberUpdate-form')

Vue.component('member-form', {
    props: ['members', 'memberAttr', 'search_shipCrew'],
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
            birth_date: '',
            last_work: ''
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
            '<div>Дата рождения: <input type="date" v-model="birth_date"></div>' +
            '<div><input type="button" value="Save" @click="save"/>' +
            '<input type="button" value="Search" @click="search_ship"></div>' +
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
                last_work: this.last_work
            };

            if(this.id) {
                ShipCrewApi.update({id: this.id}, member).then(result =>
                    result.json().then(data => {
                        this.members.splice(this.members.indexOf(this.member), 1, data);
                        this.id = ''
                        this.first_name = ''
                        this.second_name = ''
                        this.third_name = ''
                        this.first_name_foreign = ''
                        this.second_name_foreign = ''
                        this.position = ''
                        this.division = ''
                        this.citizenship = ''
                        this.birth_date = ''
                        this.last_work = ''
                    })
                )
            } else {
                ShipCrewApi.save({}, member).then(result =>
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
                        this.birth_date = ''
                        this.last_work = ''
                    })
                )
            }
        },

        search_ship: function () {
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
                last_work: this.last_work
            };

            this.search_shipCrew(member);
        }
    }
})

Vue.component('member-row', {
    props: ['member', 'updateMember', 'members', 'cmc_infoUpdate', 'order_list', 'order_info', 'order_infoUpdate'],
    data: function () {
        return {
            order: null,
            display_orderAdd: false,
            display_shipCrew: false,
            order_number: '',
            order_date: '',
            order_type: ''
        }
    },
    template:
        '<div>' +
            '<i @click="show_cmc">({{ member.id }}) </i>' +
            '<a @click="show_orders">{{ member.second_name }} {{ member.first_name }} {{ member.third_name}}</a>' +
            '<form v-if="display_shipCrew">{{ member.first_foreign_name }} {{member.second_foreign_name}} ' +
            '{{ member.position }} {{ member.division }} {{ member.citizenship }} {{member.last_work}}' +
            '<div>Дата рождения: {{ member.birth_date }}</div></form>' +
            '<div><button @click="display_shipCrew=!display_shipCrew">Доп инфо</button></div>' +
            '<span style="position: absolute; right: 30px">' +
                '<input type="button" value="Добавить приказ" @click="display_orderAdd=!display_orderAdd"/>' +
                '<input type="button" value="Update" @click="update"/>' +
                '<input type="button" value="X" @click="del"/>' +
            '</span>' +
            '<order-row v-if="order_info" v-for="order in order_list" :key="order.order_number" :order="order"/>' +
            '<div v-if="display_orderAdd"><form class="window">' +
                '<input type="text" placeholder="Write doc number" v-model="order_number"/>' +
                '<div><select size="1" v-model="order_type">' +
                '<option value="EMPLOYMENT">Приказ о приеме</option>' +
                '<option value="DISMISSAL">Приказ об увольнение</option>' +
                '</select></div>' +
                '<div>' +
                    'Приказ от: <input type="date" v-model="order_date">' +
                '</div>' +
                '<input type="button" value="Save" @click="addOrder">' +
            '</form></div>' +
        '</div>',

    created: function () {
        this.order_list.splice(0);
        OrderApi.get({shipCrew_id: this.member.id}).then(result =>
            result.json().then(data =>
                data.forEach(order => this.order_list.push(order))
            )
        )
    },

    methods: {
        update: function () {
            this.updateMember(this.member)
        },

        del: function () {
            ShipCrewApi.remove({id: this.member.id}).then(result => {
                if (result.ok) {
                    this.members.splice(this.members.indexOf(this.member), 1)
                }
            })
        },

        show_cmc: function () {
            this.cmc_infoUpdate(this.member);
        },

        show_orders: function () {
            this.order_infoUpdate(this.member);
        },

        addOrder: function () {
            var order = {
                order_number: this.order_number,
                start_date: this.order_date,
                order_type: this.order_type
            }

            OrderApi.save({shipCrew_id: this.member.id}, order).then(result =>
                result.json().then(data => {
                    this.order_list.push(data);
                    this.order_number = '';
                    this.order_date = '';
                    this.order_type = '';
                }
            ))

            this.display_orderAdd = false;
        }
    }
})

Vue.component('members-list', {

    props: ['members', 'cmc_list', 'order_list'],

    data: function() {
        return {
            member: null,
            cmc_info: false,
            order_info: false,
            shipCrew: null,
            shipCrew_order: null,
        }
    },

    template:
        '<div>' +
            '<member-form :members="members" :memberAttr="member" :cmc_list="cmc_list" ' +
            ':search_shipCrew="search_shipCrew"/>' +
            '<div class="scroll">' +
                '<member-row v-for="member in members" :key="member.id" :member="member" ' +
                ':updateMember="updateMember" :members="members" :cmc_infoUpdate="cmc_infoUpdate"' +
                ':order_list="order_list" :order_info="order_info" :order_infoUpdate="order_infoUpdate"/>' +
            '</div>' +
            '<div v-if="cmc_info">' +
                '<cmc-list :cmc_list="cmc_list" :shipCrew="shipCrew.id"/>' +
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
        },

        search_shipCrew: function (member) {
            this.members.splice(0);
            if(isEmpty(member)) {
                ShipCrewApi.get().then(result =>
                    result.json().then(data =>
                        data.forEach(member => this.members.push(member))
                    )
                )
            } else {
                ShipCrewApi.update({id: "search"}, member).then(result =>
                    result.json().then(data =>
                        data.forEach(member => this.members.push(member))
                    )
                )
            }
        },

        cmc_infoUpdate: function (shipCrew) {
            if(this.shipCrew == null) {
                this.cmc_info = !this.cmc_info;
                this.shipCrew = shipCrew;
            } else if (this.shipCrew === shipCrew){
                this.cmc_info = !this.cmc_info;
                this.shipCrew = null;
            }
        },

        order_infoUpdate: function (shipCrew_order) {
            if(this.shipCrew_order == null) {
                this.order_info = !this.order_info;
                this.shipCrew_order = shipCrew_order;
            } else if (this.shipCrew_order === shipCrew_order) {
                this.order_info = !this.order_info;
                this.shipCrew_order = null;
            }
        }
    }
})

var ShipCrewApp = new Vue({
    el: '#ShipCrewApp',
    template: '<members-list :members="members" :cmc_list="cmc_list" :order_list="order_list"/>',
    data: {
        members:[],
        cmc_list:[],
        order_list:[]
    }
})
