<template>
    <div>
        <iv-visualisation :title="pageName">
            <div class="iv-welcome-message">
                <img src='@/assets/ImpVis-logo.png' alt="ImpVisLogo" height="50"/>
                <h1> Welcome to Imperial Visualisations!</h1>
                <p> Your page, Orbits1 has succesfully been set up using the multiPage CLI template!</p>
            </div>
        </iv-visualisation>
    </div>
</template>
<script>
export default {
    name:"orbits1",
    data(){
        return {
            pageName:"Orbits1"
        }
    }
}
</script>
<style>
.iv-welcome-message{
    display:flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
}
</style>