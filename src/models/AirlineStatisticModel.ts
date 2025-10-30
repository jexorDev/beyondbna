import FlightModel from "./FlightModel";

export default class AirlineStatisticModel {
    private readonly _flights: FlightModel[];
    private _statistics: AirlineStatistic[] = [];

    constructor(flights: FlightModel[]) {
        this._flights = flights;
        this.setAirlineStatistics();

    }

    public get airlines(): string[] {
        return [... new Set(this._flights.map(x => x.airlineName))];
    }

    public get airlineStatistics(): AirlineStatistic[] {
        return this._statistics;
    }

    private setAirlineStatistics() {
        for (var i = 0; i < this.airlines.length; i++) {
            const currentAirlineName = this.airlines[i];
            const airlineFlightCount = this._flights.filter(x => x.airlineName === currentAirlineName).length;
            this._statistics.push({airline: currentAirlineName, dailyFlightCount: airlineFlightCount, percentage: Math.round((airlineFlightCount / this._flights.length) * 100)});
        }
    }
}

export interface AirlineStatistic {
    airline: string;
    dailyFlightCount: number;
    percentage: number;
}