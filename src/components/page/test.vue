<template>
    <div class="message">
        <el-button @click="test">

        </el-button>
        <div class="login_fields__submit" id="btn">
            <input style="padding: 10px 105px" type="button" value="登录">
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increment (state) {
            state.count++;
            console.log(store.state.count)
        }
    }
});

export default {
    name: 'test',
    data () {
        return {

        }
    },
    methods: {
        test () {
            store.commit('increment');
        }
    },
    computed: {

    }
}

</script>