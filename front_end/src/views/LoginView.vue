<template>
    <form class="loginContainer" @submit="login">
        <div class="loginHeader">
            <HeaderComponents/>
            <div class="loginInfo">
                <p id="loginInfoHeader">SIGN IN</p>
                <p>Enter your username to access your clients</p>
            </div>
        </div>
        <div class="loginItem">
                <label>Username</label>
                <ErrorMessageComponent :errorMessage="errorMessage" :showErrorMessage="showErrorMessage"/>
                <InputComponent  :value="username" :nameAttribute="username" :placeholderValue='placeholderMessage' @input="handleInput"/>                
                <input class="submitBtn" type="submit" value="Sign In">
        </div>        
    </form>
</template>

<script>
    import ErrorMessageComponent from '../components/ErrorMessageComponent.vue';
    import HeaderComponents from '../components/HeaderComponent.vue';
    import InputComponent from '../components/InputComponent.vue';

    export default {
        components: { HeaderComponents, InputComponent, ErrorMessageComponent },
        name: "LoginView",
        data(){
            return {
                username: "",
                errorMessage: "",
                showErrorMessage: false,
                placeholderMessage: "Enter your username"
            }
        },
        methods: {
            async login(e){
                e.preventDefault();

                /*
                 * Validates the username input and sets an error message if the username is empty.
                 * This check is performed before attempting to log in the user.
                 */
                if (this.username === "") {
                    this.errorMessage = "Please enter your username!";
                    this.showErrorMessage = true;
                    return;
                }

                try{
                    const req = await fetch(`http://localhost:8800/login/${this.username}`, {
                        method: 'GET',
                        headers:{
                            'Content-Type': 'application/json'
                        },
                    });                  

                    const data = await req.json();
                                    
                    /**
                     * Handles the successful login response by storing the user's token in localStorage and navigating to the dashboard page with the user's ID.
                     * This code is executed after a successful login request is made to the server.
                     */
                    if (req.ok) {
                        localStorage.setItem("token", data.token);

                        const id = data.user.id;

                        this.$router.push({ name: "dashboard", params: { userID: id } });

                        this.showErrorMessage = false;
                    }else{
                        this.errorMessage = data.message;
                        this.showErrorMessage = true;
                    }            
                }catch(error){
                    console.log("Erro: ", error.message);
                }                           
            }, 
            handleInput(newValue){         
                let inputValue = newValue.target.value;                
                this.username = inputValue;                
            }

        },
    }
</script>

<style scoped>

    *{
        background-color: inherit;
        color: white;
    }

    .loginContainer{
        min-width: 400px;
        width: 25%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;        
        background-color: #383838;
        padding: 80px 60px ;
        border-radius: 16px;
    }

    .loginItem{
        margin: 24px;        
        display: flex;
        width: 80%;        
        min-width: 25%;
        flex-direction: column;
        gap: 16px;
    }

    .loginItem label{
        font-weight: 500;
        font-size: 14px;                
        color: rgba(255, 255, 255, 0.75);
    }

    .loginHeader{         
        width: 80%;
        margin: 20px 0px;
        display: flex;        
        flex-direction: column;        
    }

    .loginInfo{
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
    }

    .loginInfo #loginInfoHeader{
        font-weight: 700;
        font-size: 24px;
        color: white;
        margin-bottom: 12px;
    }

    .loginInfo p{
        color: rgba(255,255,255, 0.5);
    }
    .submitBtn {
        border: none;        
        width: 100%;        
        box-shadow: none;
        border-radius: 4px;
        background-color: #2a9d8f;
        font-size: 18px;
        height: 40px;
        cursor: pointer;
    }
</style>