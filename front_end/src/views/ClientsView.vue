<template>
    <div class="clientsContainer">        
        <div class="navbar">
            <div class="addClientContainer" @click="handleShowRegisterClient">
                <a class="addClientBtn">
                    Register New Client
                    <span class="material-icons">person_add</span>  
                </a>
            </div>
            <div class="searchContainer">
                <input type="text" placeholder="Search Clients" v-model="searchData" @input="searchClients">
                <span id="searchIcon" class="material-icons">search</span>
            </div>
        </div>
        <div class="clientsGridContainer">            
            <ClientInfoComponents v-for="client in filteredClients" :key="client.id" :clientObject="client" @updateClientsView="updateClients"/>                  
        </div>
        <div v-show="showAddClientModal">
            <RegisterClientComponent @cancelRegister="handleShowRegisterClient" :levelAccess="accessLevel" @registerSuccess="updateClients"/>
        </div>
    </div>
</template>

<script>
    import ClientInfoComponents from '../components/ClientInfoComponents.vue'
    import RegisterClientComponent from '../components/RegisterClientComponent.vue';
    export default {
        components: { ClientInfoComponents, RegisterClientComponent },
        name: "ClientsView",
        props: {
            clients:{
                type: Array,
                required: true,
            },
            updateClients:{
                type: Function,
                required: true,
            },
            accessLevel:{
                type: String,
                required: true,
            }
        },
        data(){
            return{
                searchData: "",                
                filteredClients: [],
                showAddClientModal: false,
            }
        },      
        watch: {
            clients(newClients) {
                // Watches the `clients` prop and updates the `filteredClients` data property with the new value.
                // This ensures that the list of clients displayed in the UI is always up-to-date with the latest data.
            this.filteredClients = newClients;
            },
        },
        methods:{
            searchClients(){  
                /**
                 * Filters the list of clients based on the search input.
                 * If the search input is empty, the full list of clients is displayed.
                 * Otherwise, the list is filtered to only include clients whose name contains the search text (case-insensitive).
                 */
                if (!this.searchData) {
                    this.filteredClients = this.clients;
                    return;
                }

                const search = this.searchData.toLowerCase();
                this.filteredClients = this.clients.filter((client) => {
                    return client.name.toLowerCase().includes(search);
                });
            },
            handleShowRegisterClient(){
                this.showAddClientModal = !this.showAddClientModal;
            }
        },        
    }
</script>

<style scoped>
    *{
        background-color: inherit;
    }

    .clientsContainer{
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: center;
        flex-direction: column;
        margin: 0px 64px;
    }

    .clientsGridContainer{
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: auto;        
    }

    .searchContainer{
        padding: 16px 0px;
        display: flex;
        position: relative;        
        justify-content: flex-end;
        height: 40px;        
    }

    .searchContainer input{                
        width: 250px;
        border-radius: 8px;
        background-color: #99a6ac;        
        border: none;
        font-size: 18px;                  
        box-shadow: none;
        padding: 16px;        
        color: white;
    }

    input::placeholder{
        color: rgba(255, 255, 255, 0.75);
        font-weight: 100;
    }

    .addClientContainer{
        display: flex;
        justify-content: center;
        align-items: center;        
        padding: 0px 12px;
        height: 40px;
        background-color: #38b000;
        border-radius: 12px;
        margin-right: 12px;
        cursor: pointer;
    }

    .addClientBtn{
        color: white;
        font-size: 16px;
        font-weight: 400;        
        display: flex;
        align-items: center;
        gap: 16px;
    }    

    .navbar{
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: flex-end;
    }

    #searchIcon{
        position: absolute;
        top: 50%;
        right: 10px; /* Ajuste a posição do ícone */
        transform: translateY(-50%);
        color: white;
        background-color: #99a6ac;       
    }
</style>