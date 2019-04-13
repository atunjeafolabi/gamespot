<template>
    <div class="dashboard_form">
        <h1>Add Posts</h1>
        <form @submit.prevent="submitHandler">
            <div 
                class="input_field"
                :class="{invalid: $v.formData.title.$error}"
            >
                <label for="title">Title</label>
                <input 
                    type="text" 
                    @blur="$v.formData.title.$touch()"
                    v-model="formData.title"
                >
                <p class="error_label" v-if="$v.formData.title.$error">
                    This input is required
                </p>
            </div>
            <div 
                class="input_field"
                :class="{invalid: $v.formData.desc.$error}"
            >
                <label for="title">Description</label>
                <input 
                    type="text" 
                    @blur="$v.formData.desc.$touch()"
                    v-model="formData.desc"
                >
                <p class="error_label" v-if="$v.formData.desc.$error">
                    This input is required
                </p>
                <p class="error_label" v-if="!$v.formData.desc.maxLength">
                    Must not be greater than {{$v.formData.desc.$params.maxLength.max}} characters
                </p>
            </div>
            <div class="input_field">
                <wysiwyg v-model="formData.content"/>
            </div>
            <div 
                class="input_field"
                :class="{invalid: $v.formData.rating.$error}"
            >
                <label for="">Rating</label>
                <select
                    v-model="formData.rating"
                    @blur="$v.formData.rating.$touch()"
                >
                <option value="">1</option>
                <option value="">2</option>
                <option value="">3</option>
                <option value="">4</option>
                <option value="">5</option>
                </select>
                <p class="error_label" v-if="$v.formData.rating.$error">
                    You need to select one
                </p>
            </div>
            <button type="submit">Add post</button>
        </form>

        <div v-if="add_post" class="post_succesfull">Your post was added</div>

        <md-dialog :md-active="dialog">
            <p>Your post has no conetent. Are you sure you want to post this?</p>
            <md-dialog-actions>
                <md-button class="md-primary" @click="dialogOnCancel">Oops, I want to add it.</md-button>
                <md-button class="md-primary" @click="dialogOnConfirm">Yes I am sure</md-button>
            </md-dialog-actions>
        </md-dialog>
    </div>
</template>

<script>
    import {required, maxLength} from 'vuelidate/lib/validators';
    export default {
        data() {
            return {
                dialog: false,
                formData: {
                    title: '',
                    desc: '',
                    content: '',
                    rating: ''
                }
            }
        },
        validations: {
            formData: {
                title: {
                    required
                },
                desc: {
                    required,
                    maxLength: maxLength (100)
                },
                rating: {

                }
            }
        },
        computed: {
            //computed name may clash with method name
            add_post() {
                let status = this.$store.getters['admin/addPostStatus'];

                if (status) {
                    this.clearPost();
                }

                return status; 
            }
        },
        methods: {
            submitHandler() {
                if (!this.$v.$invalid) {
                    if (this.formData.content === '') {
                        this.dialog = true;
                    } else {
                        this.addPost();
                    }
                } else {
                  alert('something is wrong')  
                }
            },
            addPost(){
                this.$store.dispatch('admin/addPost', this.formData);
                // console.log('add the post')
            },
            dialogOnCancel(){
                this.dialog = false;
            },
            dialogOnConfirm(){
                this.dialog = false;
                this.addPost();
            },
            clearPost(){
                this.formData = {
                    title: '',
                    desc: '',
                    content: '',
                    rating: ''
                };

                this.$v.$reset();   //clear error memory of vuelidate
            }
        },
    }
</script>

<style scoped>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";

.input_field.invalid input,
.input_field.invalid select 
{
    border: 1px solid red
}
</style>