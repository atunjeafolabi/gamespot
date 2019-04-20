import Vue from 'vue';

const posts = {
    namespaced: true,
        state: {
            homePosts: null,
            post: null
        },
        getters: {
            getAllPosts: state => {
                return state.homePosts;
            },
            getPost(state){
                return state.post;
            }
        },
        mutations: {
            getAllPosts(state, posts) {
                state.homePosts = posts;
            },
            getPost(state, post){
                state.post = post;
            },
            clearPost(state){
                state.post = null;
            }
        },
        actions: {
            getAllPosts({commit}, payload) {
                let REQUEST_URL;    //varaiable declaration
                if(payload == undefined){   //we should also check for null
                    REQUEST_URL = `posts.json?orderBy="$key"`;
                }else {
                    REQUEST_URL = `posts.json?orderBy="$key"&limitToLast=${payload.limit}`;
                }
                
                Vue.http.get(REQUEST_URL)
                .then(response => response.json())
                .then(res => {
                    const posts = [];

                    for(let key in res){
                        posts.push({
                            ...res[key],
                            id: key
                        })
                    }
                    // console.log(posts)
                    commit('getAllPosts', posts);
                })
            },
            getPost({commit}, payload){
                Vue.http.get(`posts.json?orderBy="$key"&equalTo="${payload}"`)
                .then(response => response.json())
                .then(res => {
                    let post = {}
                    for(let key in res){
                        post = {
                            ...res[key]
                        }
                    }
                    commit("getPost", post)
                })
            },
            deletePost({commit, rootState, state}, id){
                let token = rootState.admin.token;  //get the token from admin module
                // console.log(token)
                Vue.http.delete(`posts/${id}.json?auth=${token}`)
                .then(response => {
                    let remainingPosts = state.homePosts.filter(post => post.id !== id)
                    commit('getAllPosts', remainingPosts)
                    // console.log(response)
                })
            }
        }
};

export default posts;