<template>
    <p :style="{color: textColor}" id="header">CRUD OPERATIONS</p>
</template>

<script>
    export default {
        name:"HeaderComponent",
        props: [
            "textColor"
        ]
    }
</script>

<style scoped>
    #header{
        font-size: 32px;
        text-align: center;
        font-weight: bold;
        margin-bottom: 28px;
        border-left: 4px solid #2a9d8f;
        padding: 0px 12px;
        background-color: inherit;
    }
</style>