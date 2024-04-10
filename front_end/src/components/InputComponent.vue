<template>
     <input type="text" @input="updateValue" :value="value" class="textInput" :name="nameAttribute" :placeholder="placeholderValue">
</template>

<script>
    export default {
        name: "CustomInput",
        props: ['value', 'placeholderValue', 'nameAttribute'],        
        methods:{
            updateValue(event){                
                this.$emit('input', event);
            }
        }
    }
</script>

<style scoped>
    .textInput {
        border-radius: 4px;
        border: 2px solid #5f5f5f;
        height: 32px;      
        font-size: 18px;          
        min-height: 12px;
        box-shadow: none;
        margin-bottom: 16px;
        padding: 4px;
        background-color: #5f5f5f;
        color: whi;
    }
</style>