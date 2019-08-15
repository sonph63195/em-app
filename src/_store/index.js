import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import { authenticate } from './authenticate.module';
import { campuslink } from "./campuslink.module";
import { candidate } from "./candidate.module";
import { event } from "./event.module"
import { file } from "./file.module";
import { home } from "./home.module";
import { section } from "./section.module";
import { subject } from "./subject.module";
import { supplier } from "./supplier.module";

export const store = new Vuex.Store({
    modules: {
        authenticate,
        campuslink,
        candidate,
        event,
        file,
        home,
        section,
        subject,
        supplier
    }
});