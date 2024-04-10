<template>
    <div v-show="showErrorMessage" class="errorMessage" id="errorMessageCustom">
        <p>{{ errorMessage }}</p>
    </div>
</template>

<script>
    export default {
        name: "ErrorMessageComponent",
        props: ['showErrorMessage', 'errorMessage']
    }
</script>

<style scoped>

    *{
        background-color: inherit;
    }

    #errorMessageCustom{
        background-color: #d62828;        
    }

    #errorMessageCustom p{
        padding: 4px;
    }
</style>