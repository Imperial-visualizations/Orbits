<template>
    <div>
        <div id="potentialPlot" >
        </div>
    </div>
</template>

<script>
import * as d3 from 'd3';
import Plotly from 'plotly.js';

export default {
    name:'iv-eff-pot',
    props: {
        pathVals: {default: []},
        redraw: {default: true},
    },
    methods:{
        updatePlot(pathVals){
            console.log('updatePlot EffPot');
            this.pathVals = pathVals;
            this.redraw = true;
        }
    },
    mounted(){
        let vm = this;
        const GravConst = 1;
        const sunMass = 100;

        let plotRadius = 200;

        //find energy of orbit
        function findE(){
            // E = Ueff + radial KE
            let rMag = Math.pow(Math.pow(vm.pathVals[0][0], 2) + Math.pow(vm.pathVals[0][1],2),0.5);
            let vMag = Math.pow(Math.pow(vm.pathVals[1][0], 2) + Math.pow(vm.pathVals[1][1],2),0.5);

            let E = effectivePotential(rMag) + 0.5*Math.pow(vMag,2);
            return E
        };

        //r should be scalar
        function feltPotential(r){
            let vMag = Math.pow(Math.pow(vm.pathVals[1][0],2) + Math.pow(vm.pathVals[1][1],2), 0.5);
            let rMag = Math.pow(Math.pow(vm.pathVals[0][0],2) + Math.pow(vm.pathVals[0][1],2), 0.5); //Current position for constant L calculation
            let aMag = Math.pow(Math.pow(vm.pathVals[0][0] + vm.pathVals[1][0],2) + Math.pow(vm.pathVals[0][1] + vm.pathVals[1][1],2), 0.5);
            let theta = Math.acos((Math.pow(rMag,2) + Math.pow(vMag,2) - Math.pow(aMag,2))/(2*rMag*vMag));
            
            //console.log(vMag, rMag, aMag, theta);

            let L = vMag * rMag * Math.sin(theta);

            return Math.pow(L, 2)/(2*Math.pow(r, 2));
        };

        //r should be scalar
        function realPotential(r){
            return -GravConst*sunMass*(1/r);
        };

        //r should be scalar
        function effectivePotential(r){
            return feltPotential(r) + realPotential(r);
        };

        //finds min and max of potentials at minimum radius of orbit (for reasonable plotting)
        function findYRange(){
            let minR = vm.pathVals[3];
            let yMin = Math.min(realPotential(minR), feltPotential(minR));
            let yMax = Math.max(realPotential(minR), feltPotential(minR));
            return [yMin*1.5, yMax];
        }

        function redraw(){
            requestAnimationFrame(redraw);

            if(vm.redraw && vm.pathVals.length){
                
                let rVals = [];
                let Ueff = [];
                let U = [];
                let Ufelt = [];
                let EnergyY = [];
                let Energy = findE();
                
                plotRadius = vm.pathVals[2];
                let stepSize = plotRadius/100;

                for(let r = 0.1; r < plotRadius; r+= stepSize){
                    rVals.push(r);
                    Ueff.push(effectivePotential(r));
                    U.push(realPotential(r));
                    Ufelt.push(feltPotential(r));
                    EnergyY.push(Energy);
                };


                let trace1 = {
                x: rVals,
                y: Ueff,
                type: 'lines',
                name: 'Eff Pot',
                };

                let trace2 = {
                x: rVals,
                y: U,
                type: 'lines',
                name: 'Potential',
                };

                let trace3 = {
                x: rVals,
                y: Ufelt,
                type: 'lines',
                name: 'Ang Mom',
                };

                let totE = {
                x: rVals,
                y: EnergyY,
                name: 'Total Energy',
                line: {dash: 'dash', width: 1},
                };

                let data = [totE, trace1, trace2, trace3];

                Plotly.newPlot('potentialPlot', data, {
                xaxis: {range: [0, plotRadius]},
                yaxis: {range: findYRange()}
                })


                vm.redraw = false;
            }
        }

        redraw();
    }
}
</script>

<style scoped>

</style>