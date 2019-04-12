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
                    v-model="rating"
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
    </div>
</template>

<script>
    import {required, maxLength} from 'vuelidate/lib/validators';
    export default {
        data() {
            return {
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
                    maxLength: maxLength (5)
                },
                rating: {

                }
            }
        },
        methods: {
            submitHandler() {

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