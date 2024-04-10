<template>
    <div class="pageNotFoundContainer">
        <div class="pageNotFound">
                <span class="material-icons">error</span>
                <h1>Page Not Found!</h1>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PageNotFound"
    }   
</script>

<style scoped>

    *{
        background-color: inherit;
    }

    .pageNotFoundContainer{
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .pageNotFound{
        display: flex;
        flex-direction: row;
        align-items: center;
        background-color: #023047;
        padding: 24px;
        border-radius: 12px;
        gap: 20px;
    }

    .pageNotFound h1{
        color: white;
    }

    .pageNotFound span{
        color: #ffb703;    
        font-size: 64px;
    }
</style>