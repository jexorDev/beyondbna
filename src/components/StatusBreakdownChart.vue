<template>
    <v-list>
        <v-list-item title="On Time">
            <template v-slot:append>
                <v-chip>{{ onTimeFlightPercentage }}%</v-chip>
            </template>
            <v-chip color="green" size="large">
                {{ totalOnTimeFlights }}
            </v-chip>
        </v-list-item>
          <v-list-item title="Delayed">
            <template v-slot:append>
                <v-chip v-if="delayedFlightPercentage === 0">&lt;1%</v-chip>
                <v-chip v-else>{{ delayedFlightPercentage }}%</v-chip>
            </template>            
            <v-chip color="orange" size="large">
                {{ totalDelayedFlights }}
            </v-chip>                
        </v-list-item>
          <v-list-item title="Cancelled">
            <template v-slot:append>
                <v-chip v-if="cancelledFlightPercentage === 0">&lt;1%</v-chip>
                <v-chip v-else>{{ cancelledFlightPercentage }}%</v-chip>
            </template>
            <v-chip color="red" size="large">
                {{ totalCancelledFlights }}
            </v-chip>            
        </v-list-item>
    </v-list>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import FlightModel from '../models/FlightModel';

const props = defineProps<{flights: FlightModel[]}>();

const totalFlightCount = computed(() => props.flights.length);
const totalDelayedFlights = computed(() => props.flights.filter(x => x.statusDescription === "Delayed").length);
const totalCancelledFlights = computed(() => props.flights.filter(x => x.statusDescription === "Cancelled").length);
const totalOnTimeFlights = computed(() => totalFlightCount.value - totalDelayedFlights.value - totalCancelledFlights.value);

const delayedFlightPercentage = computed(() => Math.round(totalDelayedFlights.value / totalFlightCount.value * 100));
const cancelledFlightPercentage = computed(() => Math.round(totalCancelledFlights.value / totalFlightCount.value * 100));
const onTimeFlightPercentage = computed(() => Math.round(totalOnTimeFlights.value / totalFlightCount.value * 100));
</script>