import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import { account } from './account.module';
import { authenticate } from './authenticate.module';
import { campuslink } from "./campuslink.module";
import { candidate } from "./candidate.module";
import { event } from "./event.module"
import { faculty } from "./faculty.module"
import { file } from "./file.module";
import { home } from "./home.module";
import { section } from "./section.module";
import { subject } from "./subject.module";
import { supplier } from "./supplier.module";

export const store = new Vuex.Store({
    modules: {
        account,
        authenticate,
        campuslink,
        candidate,
        event,
        faculty,
        file,
        home,
        section,
        subject,
        supplier
    }
});