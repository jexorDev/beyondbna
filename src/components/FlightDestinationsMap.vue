<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="2">
        <v-list class="main-component">
          <v-list-item v-for="destination in destinationModels"
           :title="destination.cityName"
           :subtitle="destination.airportName"
           @click="selectedDestination = destination">
          <template v-slot:append>
            <v-list-item-action class="flex-column align-center">
              <v-chip :text="destination.dailyFlightCount" color="primary" variant="elevated" size="small"></v-chip>
              <div class="text-overline" >
                Flights
              </div>
            </v-list-item-action>
          </template>
          <v-chip-group column>
            <v-chip v-for="airline in destination.airlines" :text="airline" size="small"></v-chip>
          </v-chip-group>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col cols="12" md="8">
        <v-card class="map-card">
            <Map
              height="100%"
              width="100%"
              :center="[-100, 39]"
              :zoom="4"
              >
              <Marker v-for="destination in destinationModels" :coordinates="[destination.airportLongitude, destination.airportLatitude]">
                <Popup :offset="25" @open="selectedDestination = destination">
                  <div class="text-overline">{{ destination.airportName }}</div>
                  <div>flights/day: {{ destination.dailyFlightCount }}</div>
                </Popup>
              </Marker>
            </Map>

          </v-card>
      </v-col>
      <v-col cols="12" md="2">
       
        <v-card v-if="selectedDestination" :title="selectedDestination.cityName" :subtitle="selectedDestination.airportName" class="main-component">
          <template v-slot:append>
            <v-chip :text="selectedDestination.dailyFlightCount" color="primary" size="large" variant="elevated"></v-chip>
          </template>
          <v-card-text>
            <div class="text-overline">Served by airlines</div>
            <v-list>
              <v-list-item v-for="stat in selectedDestination.airlineStatistics"
                :title="stat.airline">
                <template v-slot:append>
                  <v-chip :text="`${stat.percentage}%`"></v-chip>
                </template>                
              </v-list-item>
            </v-list>

            <div class="text-overline">Flights</div>
            <v-list>
              <v-list-item v-for="flight in selectedDestination.flights"
                :title="`${flight.airlineName} ${flight.flightNumber}`"
                :subtitle="flight.airlineOperatedBy === '' ? '' : `Operated by ${flight.airlineOperatedBy}`">
                <template v-slot:append>
                  {{ getFlightOnTimeStatus(flight.status) }}
                </template>
                <v-chip label :text="getFlightStatus(flight.status)" :variant="getFlightStatusChipVariant(getFlightStatus(flight.status))" :color="getFlightStatusColor(flight.status)"></v-chip>
                
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  
</template>
<script lang="ts" setup>
import { Map, Marker, Popup } from 'libregl';
import destinations from "../data/destinations.json";
import flights from "../data/flights.json";
import { computed, ref } from 'vue';
import DestinationModel from '../models/DestinationModel';
import FlightModel from '../models/FlightModel';

const flightModels = computed<FlightModel[]>(() => flights.map(x => new FlightModel(x)));
const destinationModels = computed<DestinationModel[]>(() => destinations.map(x => new DestinationModel(x, flightModels.value.filter(y => y.airportCode === x.airportCode))));
const selectedDestination = ref<DestinationModel | undefined>(undefined);

function getFlightOnTimeStatus(status: string): string {
  const splits = status.split('/');
  if (splits.length === 2) {
    return splits[1].trim();
  }

  return status;
}

function getFlightStatus(status: string): string {
  const splits = status.split('/');
  if (splits.length > 0) {
    return splits[0].trim();
  }

  return status;
}

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
<style>
.main-component {
  height:95vh;
}
.map-card {
  height: 95vh;
  width: 100%;
}
</style>

