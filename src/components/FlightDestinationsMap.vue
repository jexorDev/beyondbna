<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="3" v-if="!$vuetify.display.mobile || selectedMobileView === 0">
        <v-list :class="$vuetify.display.mobile ? '' : 'main-component'">
          <v-list-item v-for="destination in destinationModels"
           :title="destination.cityName"
           :subtitle="destination.airportName"
           @click="selectedDestination = destination">
          <template v-slot:append>
            <v-list-item-action class="flex-column align-center">
              <v-chip color="primary" variant="elevated" size="small">
                {{ destination.dailyFlightCount }}
              </v-chip>
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
      <v-col cols="12" md="7" v-if="!$vuetify.display.mobile || selectedMobileView === 1">
        <v-card class="map-card">
            <Map
              height="100%"
              width="100%"
              :center="[-100, 39]"
              :zoom="4"
              >
              <Marker v-for="destination in destinationModels" :coordinates="[destination.airportLongitude, destination.airportLatitude]">
                <Popup :offset="25">
                  <b>{{destination.cityName}}</b><br/>
                  {{ destination.airportName }}<br/>
                  <b>{{ destination.dailyFlightCount }} flights</b>
                  <div v-for="airline in destination.airlines">
                    {{ airline }}
                  </div>
                  <br/>
                  <button @click="selectedDestination = destination" style="color: blue">Details</button>
                </Popup>
              </Marker>
            </Map>

          </v-card>
      </v-col>   
      <v-col cols="12" md="2" v-if="!$vuetify.display.mobile || selectedMobileView === 2">
        <v-card>
          <v-card-text>
            <div class="text-overline">On Time Index</div>
            <StatusBreakdownChart :flights="flightModels"></StatusBreakdownChart>
          </v-card-text>
        </v-card>        
        <v-card class="mt-2">
          <v-card-text>
            <div class="text-overline">Served by Airlines</div>
            <v-list style="height:55vh">
              <AirlineBreakdownChart :airlineStatisticsModel="airlineStatisticsModel"></AirlineBreakdownChart>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-bottom-navigation 
      v-if="$vuetify.display.mobile" 
      v-model="selectedMobileView">
      <v-btn>
        <v-icon icon="mdi-format-list-bulleted"></v-icon>
        List
      </v-btn>
      <v-btn>
        <v-icon icon="mdi-map-marker-outline"></v-icon>
        Map
      </v-btn>
      <v-btn>
        <v-icon icon="mdi-gauge"></v-icon>
        Summary
      </v-btn>
    </v-bottom-navigation>
  </v-container>

  <v-dialog
    v-model="showSelectedDestinationDetail"
    fullscreen>
    <v-card 
      v-if="selectedDestination"
      :title="selectedDestination?.cityName"
      :subtitle="selectedDestination?.airportName"
      color="primary">
        <template v-slot:append>
          <v-icon icon="mdi-close" @click="showSelectedDestinationDetail = false"></v-icon>
        </template>
        <v-container fluid>
          <v-row>
            <v-col cols="12" md="3">
              <v-card>
                <v-card-text>
                  <div class="text-overline">Served by airlines</div>
                  <v-list>
                    <v-list-item v-for="stat in selectedDestination.airlineStatisticsModel.airlineStatistics"
                      :title="stat.airline">
                      <template v-slot:append>
                        <v-chip :text="`${stat.percentage}%`"></v-chip>
                      </template>               
                      <v-chip label size="small" color="secondary">
                        {{ stat.dailyFlightCount }}
                      </v-chip>
                      Flights                      
                    </v-list-item>
                  </v-list>                  
                </v-card-text>  
              </v-card>
              <v-card class="mt-2">
                <v-card-text>
                  <div class="text-overline">On Time Index</div>
                  <StatusBreakdownChart :flights="selectedDestination.flights"></StatusBreakdownChart>
                </v-card-text>
              </v-card>
              <WeatherCard class="mt-2" :cityName="selectedDestination.cityName"></WeatherCard>              
            </v-col>
            <v-col cols="12" md="9">
              <v-card>
                <v-card-text>
                  <div class="text-overline">Flights</div>
                  <FlightList :flights="selectedDestination.flights"></FlightList>                  
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
       <!--  <v-tabs fixed-tabs>
          <v-tab value="airlines">Airlines</v-tab>
          <v-tab value="flights">Flights</v-tab>
        </v-tabs>
        <v-tabs-window v-model="selectedTab">
          <v-tabs-window-item value="airlines">
          </v-tabs-window-item>
          <v-tabs-window-item value="flights"></v-tabs-window-item>
        </v-tabs-window> -->
        
      
    </v-card>
  </v-dialog>
  
</template>
<script lang="ts" setup>
import { Map, Marker, Popup } from 'libregl';
import destinations from "../data/destinations.json";
import flights from "../data/flights.json";
import { computed, ref } from 'vue';
import DestinationModel from '../models/DestinationModel';
import FlightModel from '../models/FlightModel';
import FlightList from "./FlightList.vue";
import StatusBreakdownChart from './StatusBreakdownChart.vue';
import WeatherCard from './WeatherCard.vue';
import AirlineStatisticModel from "../models/AirlineStatisticModel";
import AirlineBreakdownChart from './AirlineBreakdownChart.vue';

const flightModels = computed<FlightModel[]>(() => flights.map(x => new FlightModel(x)));
const destinationModels = computed<DestinationModel[]>(() => destinations.map(x => new DestinationModel(x, flightModels.value.filter(y => y.airportCode === x.airportCode))));
const selectedDestination = ref<DestinationModel | undefined>(undefined);
const selectedMobileView = ref(0);

const showSelectedDestinationDetail = computed({
  get(): boolean {
    return selectedDestination.value !== undefined;
  },
  set(newValue: boolean) {
    if (!newValue) {
      selectedDestination.value = undefined;
    }
  }
});

const airlineStatisticsModel = computed(() => new AirlineStatisticModel(flightModels.value));

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


