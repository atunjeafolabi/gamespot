<template>
    <div>
        <md-table>
            <md-table-row>
                <md-table-head>Title</md-table-head>
                <md-table-head>Description</md-table-head>
                <md-table-head>Rating</md-table-head>
                <md-table-head>Action</md-table-head>
            </md-table-row>
            <md-table-row v-for="(post, index) in posts" :key="index">
                <md-table-cell>{{post.title}}</md-table-cell>
                <md-table-cell>{{post.desc}}</md-table-cell>
                <md-table-cell>{{post.rating}}</md-table-cell>
                <md-table-cell>
                    <div class="post_delete" @click="deleteHandler(post.id)">
                        Delete
                    </div>
                    <!-- <md-button class="md-primary md-raised" @click="active = true">Delete</md-button> -->
                </md-table-cell>
            </md-table-row>
        </md-table>

        <md-dialog-confirm
            :md-active.sync="confirmDelete"
            md-title="Confirm Delete"
            md-content="Are you sure you want to delete?"
            md-confirm-text="Yes"
            md-cancel-text="No"
            @md-cancel="onCancel"
            @md-confirm="onConfirm" 
        />
    </div>
</template>

<script>
    export default {
        // name: 'DialogConfirm',
        data(){
            return{
                confirmDelete: false,
                value: null,
                idToDelete: ''
            }
        },
        computed: {
            posts() {
                return this.$store.getters['posts/getAllPosts']; 
            }
        },
        created(){
            this.$store.dispatch('posts/getAllPosts');
        },
        methods: {
            deleteHandler(postId) {
                this.idToDelete = postId;
                this.confirmDelete = true;
            },
            onConfirm () {
                this.$store.dispatch('posts/deletePost', this.idToDelete);
                this.confirmDelete = false;
            },
            onCancel () {
                this.idToDelete = '';
                this.confirmDelete = false;
            }
        },
    }
</script>

<style scoped>
.md-button{
    background: red;
}
</style>