<template>
    <div>
        <router-link 
            v-if="type === 'link'"
            :to="linkTo" 
            :class="['button_default', ...addClass]"
            :style="ovStyle"
        >
            <slot/>
        </router-link>

        <div
            v-if="type === 'btn'"
            :to="linkTo" 
            :class="['button_default', ...addClass]"
            @click="action"
        >
            <slot/>
        </div>
    </div>
</template>

<script>
    export default {
        props:['linkTo', 'addClass', 'ovStyle', 'type', 'action']
    }
</script>

<style scoped>

</style>