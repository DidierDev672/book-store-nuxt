<script setup lang="ts">
    const runtimeConfig = useAppConfig();

    const isActive = ref(true);
    const hasError = ref(false);
    const classObject = reactive({
        'active': true,
        'text-danger': false
    })

    const color = ref('red');
</script>

<template>
    <div class="static" :class="{ 'active': isActive, 'text-danger': hasError }">
        <div :class="classObject"></div>
        <div class="text">
            Hello
        </div>
        <div class="example">
            hi
        </div>
        <h1>Welcome to the homepage</h1>
        <AppAlert>
            This is a auto-imported componentr
        </AppAlert>
    </div>
</template>

<style lang="css">
    .text {
        color: v-bind(color);
    }

    .example {
        color: red;
    }
</style>