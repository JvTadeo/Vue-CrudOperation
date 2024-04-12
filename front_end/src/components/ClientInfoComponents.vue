<template>
    <div class="gridItem">
        <div class="clientHeader">
            <div id="basicInfoContainer">
                <p id="idClient">{{ clientObject.id }}</p>
                <p>{{ clientObject.name }}</p>
            </div>
            <div id="editDeleteContainer">
                <span @click="handleEditCancel" class="material-icons">edit</span>
                <span @click="handleDeleteCancel" style="color:#d62828" class="material-icons">delete</span>
                <span v-if="!showMoreInformation" @click="showMoreInformationClick" class="material-icons">expand_more</span>
                <span v-if="showMoreInformation" @click="showMoreInformationClick" class="material-icons">expand_less</span>
            </div>
        </div>
        <div v-show="showMoreInformation" id="moreInformation">
            <div id="info">
                <div id="infoHeader">
                    <span class="material-icons">call</span>
                    <p>Phone:</p>
                </div>                
                <p>{{ clientObject.phone }}</p>
            </div>            
            <div id="info">
                <div id="infoHeader">
                    <span class="material-icons">mail</span>
                    <p>Email:</p>
                </div>                
                <p>{{ clientObject.email }}</p>
            </div>            
            <div id="info">
                <div id="infoHeader">
                    <span class="material-icons">home</span>
                    <p>Address:</p>
                </div>                
                <p>{{ clientObject.address }}</p>
            </div>            
            <div id="info">
                <div id="infoHeader">
                    <span class="material-icons">local_post_office</span>
                    <p>Postalcode: </p>
                </div>                
                <p>{{ clientObject.postalcode }}</p>
            </div>            
        </div>
        <div v-show="editClient">
            <EditClientComponent @closeModal="handleEditCancel" :clientObject="clientObject" @updateInformation="updateInformation"/>
        </div>
        <div v-show="showDeleteModal">
            <DeleteClientComponent :username="clientObject.name" @closeModal="handleDeleteCancel" @emitDeleteClient="handleSendDelte"/>
        </div>
    </div>
</template>

<script>
    import DeleteClientComponent from './DeleteClientComponent.vue';
    import EditClientComponent from './EditClientComponent.vue';

    export default {
        components: { EditClientComponent, DeleteClientComponent },
        name: "ClientInfoComponents",
        props:["clientObject",],
        data(){
            return {
                showMoreInformation: false,
                editClient: false,
                showDeleteModal: false,
            }                
        },
        methods: {
            showMoreInformationClick(e){
                e.preventDefault();
                
                this.showMoreInformation = !this.showMoreInformation;
            },
            handleEditCancel(){
                this.editClient = !this.editClient;                                
            },
            handleDeleteCancel(){
                this.showDeleteModal = !this.showDeleteModal;
            },
            async handleSendDelte() {
                /*
                * Handles the deletion of a client by sending a DELETE request to the server.
                *
                * This method is called when the user confirms the deletion of a client. It sends a DELETE request to the server with the client's ID, and if the request is successful, 
                * it calls the `handleDeleteCancel` and `updateInformation` methods to close the delete modal and update the client information.
                */
                const id = this.clientObject.id;

                try {
                    const req = await fetch(`http://localhost:8800/deleteClient/${id}`, {
                    method: "DELETE",
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                    },
                    });

                    if (req.ok) {
                        this.handleDeleteCancel();
                        this.updateInformation();
                    }
                } catch (error) {
                    console.log(error);
                    this.$router.push({ name: "login" });                    
                }
            },
            updateInformation(){
                this.$emit('updateClientsView')
            },
        },
    }
</script>

<style scoped>
        *{
        background-color: inherit;
    }


    .gridItem {
        margin: 12px;
        padding: 20px 24px;
        display: flex;
        width: 50%;
        flex-direction: column;                
        align-items: center;
        background-color: #001a27;
        border-radius: 12px;
        color: white;
    }    

    .gridItem span{
        cursor: pointer;
    }

    .clientHeader{
        display: flex;
        width: 100%;
        flex-direction: row;                
    }

    #editDeleteContainer{
        width: 100%;
        display: flex;
        justify-content: flex-end;
        gap: 24px;
    }

    #basicInfoContainer{
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: flex-start;
        gap: 12px;
    }

    #moreInformation{
        margin-top: 12px;
        display: flex;
        width: 100%;
        flex-direction: column;
        background-color: #1a3745;
        border-radius: 12px;
        padding: 12px;
    }

    #moreInformation span{
        cursor: default;
    }

    #info{
        display: flex;
        flex-direction: row;        
        align-items: center;        
        margin-bottom: 4px;
        width: 100%;
    }

    #infoHeader{
        display: flex;
        flex-direction: row;
        width: 120px;
        gap: 6px;
        align-items: center;
        justify-content: flex-start;
        margin-left: 6px;
        margin-right: 12px;        
    }

    #idClient{
        font-weight: 600;
        border-left: 4px solid #f77f00;
        padding: 0px 6px;
    }
    
</style>