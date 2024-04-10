<template>
  <div class="mainContainer">
    <router-view/>
  </div>
</template>

<style>
  *{
    padding: 0;
    margin: 0;
    background-color: #121212;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  .mainContainer{
    width: 80%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    margin: auto;
    align-items: center;
    justify-content: center;
  }    

  input:focus{
    outline: none   ;
  }

  .errorMessage{
    display: flex;
    justify-content: flex-start;
    width: 100%;
  }
</style>
