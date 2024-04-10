<template>
    <div class="modalOverlay">
        <div class="deleteContainer">
            <div class="deleteInfo">
                <p>Are you sure you want to delete <span id="username">{{ username }}</span> ?</p>
            </div>
            <div class="btnContainer">
                <button id="cancelBtn" @click="emitCloseModal" >No</button>
                <button id="saveBtn" @click="emitDeleteClient">Yes</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DeleteClientComponent",
        props: ['username'],        
        methods: {
            emitCloseModal(){
                this.$emit('closeModal');
            },
            emitDeleteClient(){
                this.$emit('emitDeleteClient');
            }
        }
    }
</script>

<style scoped>
    *{
        background-color: inherit;
    }

    .modalOverlay{
        width: 100vw; 
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);
        position: fixed; 
        top: 0; 
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .deleteContainer{
        margin: auto;        
        width: 25%;        
        display: flex;
        flex-direction: column;
        align-items: center;        
        border-radius: 12px;
        background-color: #001018;
        padding: 24px 0px;
    }

    .deleteInfo{
        display: flex;
        width: 100%;
        flex-direction: row;
        align-items: center;
        justify-content: center;                
        text-align: center;
    }

    .btnContainer{
        display: flex;
        width: 80%;        
        justify-content: space-around;        
    }

    .btnContainer button{
        width: 100px;
        padding: 8px;
        margin: 8px 0px;
        border-radius: 12px;
        outline: none;
        border: none;
        cursor: pointer;
    }
    
    .btnContainer #saveBtn{
        background-color: #4c956c;
        color: white;
        font-size: 16px;
        font-weight: 600;
    }

    .btnContainer #cancelBtn{
        background-color: #d62828;
        color: white;
        font-size: 16px;
        font-weight: 600;
    }

    #username{        
        font-weight: 600;
        color: #d62828;
    }
    

</style>