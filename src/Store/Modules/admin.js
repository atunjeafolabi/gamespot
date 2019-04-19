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
        refreshLoading: true,
        addPost: false,
        imageUpload: null
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
        },
        addPostStatus(state){
            return state.addPost;
        },
        imageUpload(state){
            return state.imageUpload;
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
        },
        addPost(state){
            state.addPost = true;
        },
        clearAddPost(state){
            state.addPost = false;
        },
        imageUpload(state, imageData){
            state.imageUpload = imageData.secure_url;
        },
        clearImageUpload(state){
            state.imageUpload = null;
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
        },
        addPost({commit, state}, payload){
            Vue.http.post(`posts.json?auth=${state.token}`, payload)
            .then(response => response.json())
            .then(resp => {
                commit('addPost');
                setTimeout(()=>{
                    commit('clearAddPost')
                }, 3000);
                // console.log(resp)
            })
        },
        imageUpload({commit}, file){
            const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dh5y0hff4/image/upload';
            const CLOUDINARY_PRESET = 'e8jg5mex';

            let formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', CLOUDINARY_PRESET);

            Vue.http.post(CLOUDINARY_URL, formData, {
                headers:{
                    'Content-type':'application/x-www-form-urlencoded'
                }
            })
            .then(response => response.json())
            .then(res => {
                // console.log(res)
                commit('imageUpload', res)
            })
        }
    }
}

export default admin;