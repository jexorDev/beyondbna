<template>
    <v-list-item v-for="stat in props.airlineStatisticsModel.airlineStatistics"
        :title="stat.airline">
        <template v-slot:append>
            <v-chip v-if="stat.percentage === 0">&lt;1%</v-chip>
            <v-chip v-else :text="`${stat.percentage}%`"></v-chip>

        </template>               
        <v-chip label size="small" color="secondary">
            {{ stat.dailyFlightCount }}
        </v-chip>
        Flights                      
    </v-list-item>
</template>
<script lang="ts" setup>
import AirlineStatisticModel from '../models/AirlineStatisticModel';

const props = defineProps<{airlineStatisticsModel: AirlineStatisticModel}>();

</script>