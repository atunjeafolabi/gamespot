import Vue from 'vue';

const posts = {
    namespaced: true,
        state: {
            homePosts: null
        },
        getters: {
            getAllPosts: state => {
                return state.homePosts;
            }
        },
        mutations: {
            getAllPosts(state, posts) {
                state.homePosts = posts;
            }
        },
        actions: {
            getAllPosts({commit}, payload) {
                Vue.http.get(`posts.json?orderBy="$key"&limitToLast=${payload.limit}`)
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
            }
        }
};

export default posts;