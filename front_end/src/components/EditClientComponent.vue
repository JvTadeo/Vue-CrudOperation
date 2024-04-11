<template>
    <div class="modalOverlay">
        <div class="editContainer">
            <div class="inputContainer">
                <div class="editItem">
                    <p>Username</p>
                    <InputComponent :value="username" @input="(event) => {username = event.target.value}"/>
                </div>
                <div class="editItem">
                    <p>Phone</p>
                    <InputComponent :value="phoneNumber" @input="(event) => {phoneNumber = event.target.value}" />
                </div>
                <div class="editItem">
                    <p>E-mail</p>
                    <InputComponent :value="email" @input="(event) => {email = event.target.value}"/>
                </div>
                <div class="editItem">
                    <p>Address</p>
                    <InputComponent :value="address" @input="(event) => {address = event.target.value}"/>
                </div>
                <div class="editItem">
                    <p>Postalcode</p>
                    <InputComponent :value="postalcode" @input="(event) => {postalcode = event.target.value}"/>
                </div>
                <ErrorMessageComponent :errorMessage="errorMessage" :showErrorMessage="showErrorMessage" />
            </div>
            <div class="btnContainer">
                <button id="cancelBtn" @click="handleCloseModal" >Cancel</button>
                <button id="saveBtn" @click="sendForm" >Save</button>
            </div>
        </div>        
    </div>
</template>

<script>    
    import ErrorMessageComponent from './ErrorMessageComponent.vue';
    import InputComponent from './InputComponent.vue'
    export default {
        components: { InputComponent, ErrorMessageComponent },
        name: "EditClientComponent",
        props: ['clientObject'],
        data(){
            return{
                username: "",
                phoneNumber: "",
                email: "",
                address: "",
                postalcode: "",

                errorMessage: "",
                showErrorMessage: false,
            }
        },
        mounted(){
            this.initValue();            
        },
        methods: {
            handleCloseModal() {
                this.emitCloseAndResetValues();
            },
            emitCloseAndResetValues(){                                
                this.$emit('closeModal');                
                this.initValue();

                this.errorMessage = "";
                this.showErrorMessage = false; 
            },            
            initValue(){
                this.username = this.clientObject.name;
                this.phoneNumber = this.clientObject.phone;
                this.email = this.clientObject.email;
                this.address = this.clientObject.address;
                this.postalcode = this.clientObject.postalcode;
            },            
            async sendForm(){

                const formData = {
                    id: this.clientObject.id,
                    username: this.username,
                    phone: this.phoneNumber,
                    email: this.email,
                    address: this.address,
                    postalcode: this.postalcode
                }                

                /**
                 * Validates the form data to ensure all fields are filled out.
                 * If any field is empty, sets the `errorMessage` and `showErrorMessage` properties to display an error message.
                 */
                const hasEmptyField = Object.values(formData).some((value) => !value);

                if (hasEmptyField) {
                    this.errorMessage = "Please fill in all fields";
                    this.showErrorMessage = true;
                    return;
                }

                /**
                 * Sends a PUT request to the server to update the client information.
                 * If the request is successful, emits events to update the client information and close the modal.
                 * If the request fails, logs the error to the console.
                 */
                try {
                    const req = await fetch("http://localhost:8800/updateClient", {
                    method: "PUT",
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                    });

                    if (req.ok) {
                        this.$emit("updateInformation");
                        this.$emit("closeModal");

                        this.errorMessage = "";
                        this.showErrorMessage = false;
                    }
                } catch (error) {
                    console.log(error);
                    this.$router.push({ name: "login" });
                }
            },
        },  
    }
</script>

<style scoped>

    *{
        background-color: inherit;
        color: white;
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

    .editContainer{
        margin: auto;        
        width: 25%;        
        display: flex;
        flex-direction: column;
        align-items: center;        
        border-radius: 12px;
        background-color: #001018;
        padding: 24px 0px;
    }

    .inputContainer{
        display: flex;
        flex-direction: column;
        align-items: center;
        background: none;
        width: 80%;                
    }

    .btnContainer{
        display: flex;
        width: 80%;
        margin-top: 16px;
        background-color: none;
        justify-content: space-between;        
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

    .editItem{
        display: flex;
        flex-direction: column;
        width: 100%;                
    }

    .editItem p{
        margin-top: 14px;
        margin-bottom: 8px;
        font-size: 16px;
        font-weight: 600;
    }

</style>