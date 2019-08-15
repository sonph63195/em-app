import Vue from 'vue';
import Router from 'vue-router';

import Error404 from "@/components/utils/Error404";
import LoginPage from '@/components/auth/Login';
import HomePage from '../components/home/Homepage';
import Event from '../components/event/Event';
import EventInfo from '../components/event/EventInfo';
import Candidate from '../components/candidate/Candidate';
import CandidateInfo from '../components/candidate/CandidateInfo';
import Param from '../components/settings/Param';
import University from '../components/settings/University';
import Statistic from '../components/statistic/Statistic';
import Admin from '../components/Admin/Admin';
import AdminEditProfile from '../components/Admin/AdminEditProfile';

Vue.use(Router);

export const router = new Router({
    mode: 'history',
    routes: [
        /**
         * Candiadate Management
         */
        { path: '/candidate', name: 'candidate', redirect: "/candidate/page=1" },
        { path: '/candidate/candidateId=:candidateId', name: 'candidateInfo', component: CandidateInfo },
        { path: '/candidate/page=:page', name: 'candidatePage', component: Candidate },

        /**
         * Event Management
         */
        { path: '/event', name: 'event', redirect: "/event/page=1" },
        { path: '/event-info', redirect: "/event/page=1" },
        { path: '/event-info/eventId=:eventId', redirect: "/event-info/eventId=:eventId/page=1" },
        { path: '/event/page=:page', name: 'eventPage', component: Event },
        { path: '/event-info/eventId=:eventId/page=:page', name: 'eventInfoPage', component: EventInfo },

        /**
         * Statistic
         */
        { path: '/statistic', name: 'statistic', component: Statistic },

        /**
         * Admin
         */
        { path: '/admin', name: 'admin', component: Admin },
        { path: '/admin-edit-profile', name: 'admin-edit-profile', component: AdminEditProfile },

        /**
         * Other
         */
        { path: '*', component: Error404 },
        { path: '/login', component: LoginPage },
        { path: '/', name: 'home', component: HomePage },

        { path: '/setting-param', name: 'param', component: Param },
        { path: '/setting-university', name: 'university', component: University },
    ],
});
