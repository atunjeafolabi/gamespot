import Vue from 'vue';

import router from '../../routes'
import { truncate } from 'fs';

const FbAuth = "https://www.googleapis.com/identitytoolkit/v3/relyingparty";
const FbApiKey = "AIzaSyDRQ_099mPHa6JyOKVtx6LDFRwDjtb6w3A";

const admin = {

    namespaced: true,

    state: {
        token: null,
        refresh: null,
        authFailed: false,
        refreshLoading: true
    },
    getters: {
        isAuth(state){
            if(state.token) {
                return true;
            }
            return false;
        },
        refreshLoading(state){
            return state.refreshLoading;
        }
    },
    mutations: {
        authUser(state, authData){
            state.token = authData.idToken;
            state.refresh = authData.refreshToken;

            if (authData.type === 'signin') {
                router.push('/dashboard');
            } else {
                
            }
        },
        authFailed(state, type){
            if (type === 'reset') {
                state.authFailed = false;
            } else {
                state.authFailed = true;
            }
        },
        logoutUser(state){
            state.token = null;
            state.refresh = null;
            localStorage.removeItem('token');
            localStorage.removeItem('refresh');

            router.push('/');
        },
        refreshLoading(state){
            state.refreshLoading = false;
        }
    },
    actions: {
        signin({commit}, payload){
            Vue.http.post(`${FbAuth}/verifyPassword?key=${FbApiKey}`, {
                ...payload,
                returnSecureToken: true
            })
            .then(response => response.json())
            .then(authData => {
                
                commit('authUser', {...authData, type:'signin'});

                localStorage.setItem('token', authData.idToken);
                localStorage.setItem('refresh', authData.refreshToken)
            })
            .catch(error => {
                commit('authFailed');
            })
            
            
        },
        refreshToken({commit}){
            
            const refreshToken = localStorage.getItem('refresh');

            if (refreshToken) {
                Vue.http.post(`https://securetoken.googleapis.com/v1/token?key=${FbApiKey}`, {
                    grant_type: 'refresh_token',
                    refresh_token: refreshToken
                })
                .then(response => response.json())
                .then(authData => {
                    commit('authUser', {
                        idToken: authData.id_token,
                        refreshToken: authData.refresh_token,
                        type: 'refresh' //not really doing anything. value could be anything apart from signin
                    });
                    commit('refreshLoading');
                    localStorage.setItem('token', authData.id_token);
                    localStorage.setItem('refresh', authData.refresh_token);
                });
            } else {
                commit('refreshLoading');  
            }
        }
    }
}

export default admin;