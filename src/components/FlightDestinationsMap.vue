<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="9">
        <v-card class="map-card">
            <Map
              height="100%"
              width="100%"
              :center="[-100, 39]"
              :zoom="4"
              >
              <Marker v-for="destination in destinations" :coordinates="[destination.airportLongitude, destination.airportLatitude]">
                <Popup :offset="25" @open="destinationClicked(destination)">
                  <div class="text-overline">{{ destination.airportName }}</div>
                  <div>flights/day: {{ destination.dailyFlightCount }}</div>
                </Popup>
              </Marker>
            </Map>

          </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-data-table :items="destinations" :headers="headers"></v-data-table>
        <v-card v-if="selectedDestination" :title="selectedDestination.cityName" :subtitle="selectedDestination.airportName">
          
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  
</template>
<script lang="ts" setup>
import { Map, Marker, Popup } from 'libregl';
import destinations from "../data/destinations.json";
import Destination from '../models/DestinationModel';
import { ref } from 'vue';

const selectedDestination = ref<Destination | undefined>(undefined);
const headers = [
  {title: "City", key: "cityName"},
  {title: "Airport", key: "airportName"},
  {title: "Flights per day", key: "dailyFlightCount"}
]
function destinationClicked(destination: Destination) {
  selectedDestination.value = destination
}



</script>
<style>
.map-card {
  height:95vh;
  width: 100%;
}
</style>
