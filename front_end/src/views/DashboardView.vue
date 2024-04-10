<template>
    <div class="dashBoardContainer">
        <div class="leftBar">
            <div class="infoProfile">
                <HeaderComponents textColor="#ffffff" />
                <div class="imgContainer">
                    <img src="../assets/managerIconProfile.png" alt="Manager Icon">
                </div>
                <p id="username"> {{ usernameData  }}</p>
                <p id="accessLevel">Access Level {{ accessLevelData }}</p>
            </div>                     
            <div class="logoutContainer" @click="logout">
                <span id="whiteIcon" class="material-icons">logout</span>
                <a>Logout</a>
            </div>
        </div>
        <div class="rightBar">
            <ClientsView :clients="clientsData" :updateClients="getAllClients" :accessLevel="accessLevelData.toString()"/>
        </div>
    </div>
</template>

<script>
    import HeaderComponents from '../components/HeaderComponent.vue'
    import ClientsView from './ClientsView.vue';
    import 'material-icons/iconfont/material-icons.css'

    export default {
        components: { HeaderComponents, ClientsView},
        name: "DashBoard",      
        props: {'userID': String},
        data(){
            return{
                usernameData: "",
                accessLevelData: "",
                clientsData: [],
            }
        },
        methods:{
   
            logout() {
                /*
                * Logs the user out by removing the token from local storage and redirecting them to the login page.
                */
                localStorage.setItem("token", "");
                this.$router.push({ name: "login" });
            },             
            async getUserDate() {
                /*
                * Fetches the user data from the server and updates the component's data properties.
                *
                * This method is responsible for making a GET request to the server to retrieve the user's
                * username and access level. It then updates the `usernameData` and `accessLevelData`
                * properties accordingly. If the request is successful, it also calls the `getAllClients`
                * method to fetch the client data.
                */
                try {
                    const req = await fetch(`http://localhost:8800/getUser/${this.userID}`, {
                        method: "GET",
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
            
                    const data = await req.json();
                    if (req.ok) {
                        this.usernameData = data.user.username;
                        this.accessLevelData = data.user.access_level;
                        this.getAllClients();
                    } else {
                        this.usernameData = " ";
                        this.accessLevelData = " ";
                    }
                } catch (error) {
                    console.log("Erro: ", error);
                }
            },                
            async getAllClients() {
                /*
                * Fetches all clients from the server based on the user's access level.
                *
                * This method makes a GET request to the `/getAllClients/:accessLevel` endpoint on the server,
                * where `:accessLevel` is the value of the `accessLevelData` property. The response from the
                * server is expected to be a JSON object with a `clients` property, which is an array of
                * client data. If the request is successful, the `clientsData` property is updated with
                * the fetched client data.
                */
                try {
                    const req = await fetch(
                    `http://localhost:8800/getAllClients/${this.accessLevelData}`,
                    {
                        method: "GET",
                        headers: {
                        "Content-Type": "application/json",
                        },
                    }
                    );

                    const data = await req.json();
                    if (req.ok) {
                    this.clientsData = data.clients;
                    }
                } catch (error) {
                    console.log("Erro: ", error);
                }
            },
        },
        mounted(){
            this.getUserDate();
        }
    }   
</script>

<style scoped>  

    *{
        background-color: inherit;
    }

    .dashBoardContainer{
        width: 100vw;
        height: 100%;
        display: flex;
        flex-direction: row;
    }
    .leftBar{
        background-color: #012131;        
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        min-width: 10%;
        width: 25%;
        height: 100%;        
    }

    .rightBar{        
        width: 100%;
        height: 100%;
        display: flex;
        background-color: #55707D
;
    }

    .imgContainer {
        width: 128px;
        border-radius: 128px;
        overflow: hidden;
    }

    .imgContainer img{
        width: 100%;    
        object-fit: cover;        
    }

    .optionsContainer{
        display: flex;
        width: 100%;
        flex-direction: column;        
        align-items: center;                              
    }

    .optionItem{
        display: flex;
        flex-direction: row;
        width: 50%;        
        padding: 12px;        
        margin-bottom: 12px;
        border-radius: 8px;
        justify-content: center;
        align-items: center;   
        background-color: #678290;
        cursor: pointer;
    }

    .optionItem a{
        text-decoration: none;
        font-size: 20px;
        color: white;
        margin-left: 6px;
    }

    .infoProfile{
        display: flex;
        height: 50%;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;        
        margin-top: 12px;
    }

    .logoutContainer{ 
        display: flex;
        flex-direction: row;
        width: 50%;        
        padding: 12px;
        margin-top: 128px;       
        margin-bottom: 12px;
        border-radius: 8px;
        justify-content: center;
        align-items: center;        
        background-color: #678290;
        cursor: pointer;        
    }

    .logoutContainer a{
        text-decoration: none;
        font-size: 20px;
        color: white;
        margin-left: 6px;
    }

    #username{
        font-size: 24px;
        margin: 12px 0px;
        color: white;
        font-weight: 700;
    }

    #whiteIcon{
        color: white;
    }
    #accessLevel{
        color: white;
        font-size: 16px;
        font-weight: 100;
    }
</style>