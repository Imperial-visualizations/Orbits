<template>
  <div id="app">
    <iv-title-bar />
    <iv-visualisation>
      <template #hotspots>
        <iv-pane position="left" format="full"/>
        <iv-pane position="right" format="overlay" >
            
        </iv-pane>
        <!-- <iv-toggle-hotspot id="iv-toggle-hotspot-bottomleft" position="bottomleft" title="BOTTOM LEFT"></iv-toggle-hotspot> -->
        <!-- <iv-toggle-hotspot id="iv-toggle-hotspot-topleft" position="topleft" title="TOP LEFT"></iv-toggle-hotspot> -->

        <iv-toggle-hotspot id="iv-fixed-hotspot-bottom" position="bottom" title="Effective Potential">
            <EffPot ref="effPlot" />
        </iv-toggle-hotspot>
        <iv-fixed-hotspot id="iv-fixed-hotspot-topright" position="topright" title="PlayackControlls" style="height: 40%">
          <label style="padding-top: 3%">Playback Speed</label>
          <iv-slider style="padding-top: 5%;" min=0 max=15 initVal=1 step=1 @sliderChanged="playSpeed"></iv-slider>
        </iv-fixed-hotspot>
        <!-- <iv-fixed-hotspot id="iv-fixed-hotspot-right" position="right" title="RIGHT"></iv-fixed-hotspot> -->
        
      </template>

      <template #main-stage> 
        <Orbits @energies="updatePlot"  @onresize="updateSize" v-bind:animationSpeed="animationSpeed"/>
        <!-- <EffPot ref="effPlot" /> -->
      </template>

      <iv-guidance-button guidanceIdentifier="A1"/>
    </iv-visualisation>
    <iv-guidance-system :guidance_branches_input="guidance_branch_list" />
  </div>
</template>

<script>
import Orbits from './components/Orbits.vue'; 
import EffPot from './components/EffectivePotential.vue';
//<iv-pane position="left" />
//
//
export default {
  name:"App",
  components:{
    Orbits,
    EffPot
  },
  data(){
    return{
      guidance_branch_list:[
        {title:"Branch 1",
          branch_data:[
              {text:"A text 1", highlightDiv:"iv-fixed-hotspot-topright" ,identifier: "A1", positionModal:[4,8,2,5]},
              {text:"A text 2", highlightDiv:"iv-toggle-hotspot-bottomright" ,identifier: "A2", positionModal:[4,8,7,9]},
              {text:"A text 3", highlightDiv:"iv-toggle-hotspot-bottom" ,identifier: "A3", positionModal:[4,8,5,7]}
          ]
        },
        {title:"Branch 2",
          branch_data:[
              {text:"B text 1", highlightDiv:"iv-toggle-hotspot-bottomright" ,identifier: "B1", positionModal:[4,8,7,9]},
              {text:"B text 2", highlightDiv:"iv-toggle-hotspot-bottomright" ,identifier: "B2", positionModal:[4,8,7,9]},
              {text:"B text 3", highlightDiv:"iv-toggle-hotspot-bottomright" ,identifier: "B3", positionModal:[4,8,7,9]}
          ]
        },
        {title:"Branch 3",
          branch_data:[
              {text:"C text 1", highlightDiv:"iv-toggle-hotspot-bottom" ,identifier: "C1", positionModal:[4,8,3,5]},
              {text:"C text 2", highlightDiv:"iv-toggle-hotspot-bottom" ,identifier: "C2", positionModal:[4,8,3,5]},
              {text:"C text 3", highlightDiv:"iv-toggle-hotspot-bottom" ,identifier: "C3", positionModal:[4,8,3,5]}
          ]
        },
      ]
    }
  },
  methods:{
    updatePlot(energies){
      this.$refs.effPlot.updatePlot(energies);     
    },
    updateSize(){
      console.log('resize');
    },
    playSpeed(e){
      this.animationSpeed = e;
    }
  },
  props:{
    animationSpeed: {
      default: 1
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
 
