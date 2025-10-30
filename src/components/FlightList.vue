<template>
     <v-list>
        <v-list-item v-for="flight in props.flights"
            :title="`${flight.airlineName} ${flight.flightNumber}`"
            :subtitle="flight.airlineOperatedBy === '' ? '' : `Operated by ${flight.airlineOperatedBy}`">
            <v-row>
            <v-col align-self="center">
                <div class="text-overline">Status</div>
                <v-chip label :text="flight.status" :variant="getFlightStatusChipVariant(flight.status)" :color="getFlightStatusColor(flight.statusDescription)" size="small"></v-chip>
                <div v-if="flight.status !== flight.statusDescription" class="font-italic" :style="`color: ${getFlightStatusColor(flight.statusDescription)}`">{{ flight.statusDescription }}</div>
            </v-col>
            <v-col>
                <div class="text-overline">{{ flight.isArrival ? "Arrival" : "Departure" }} Time</div>
                <div v-if="flight.scheduledTime !== (flight.actualTime ?? flight.estimatedTime)" class="text-decoration-line-through">{{ flight.scheduledTime }}</div>
                <div>{{ flight.actualTime ?? flight.estimatedTime }}</div>
            </v-col>
            </v-row>
        </v-list-item>
    </v-list>
</template>
<script lang="ts" setup>
import FlightModel from '../models/FlightModel';

const props = defineProps<{flights: FlightModel[]}>();

function getFlightStatusChipVariant(status: string): "outlined" | "flat" {  
  return ["Arrived", "Cancelled", "Landed"].includes(status) ? "flat" : "outlined";  
}

function getFlightStatusColor(status: string): string {
  const splits = status.split('/');
  var color = "";

  for (var i = 0; i < splits.length; i++) {
    if (color === "") {
      if (splits[i].trim() === "Cancelled") color = "red";
      if (splits[i].trim() === "Delayed") color = "orange";
      if (splits[i].trim() === "On Time") color = "green";
    }
  }
  
  return color === "" ? "primary" : color;
  
}

</script>