import Destination from "../data/Destination";
import FlightModel from "./FlightModel";

export default class DestinationModel {
    private _destination: Destination;
    private _flights: FlightModel[];
    private _statistics: DestinationAirlineStatistic[] = [];

    constructor(destination: Destination, flights: FlightModel[]) {
        this._destination = destination;
        this._flights = flights;
        this.setAirlineStatistics();
    }

    public get airportCode(): string {
        return this._destination.airportCode;
    }

    public get airportName(): string {
        return this._destination.airportName;
    }

    public get cityName(): string {
        return this._destination.cityName;
    }

    public get airportLatitude(): number {
        return this._destination.airportLatitude;
    }
    
    public get airportLongitude(): number {
        return this._destination.airportLongitude;
    }

    public get dailyFlightCount(): number {
        return this._destination.dailyFlightCount;
    }

    public get airlines(): string[] {
        return [... new Set(this._flights.map(x => x.airlineName))];
    }

    public get flights(): FlightModel[] {
        return this._flights;
    }

    public get airlineStatistics(): DestinationAirlineStatistic[] {
        return this._statistics;
    }
   
    private setAirlineStatistics() {
        for (var i = 0; i < this.airlines.length; i++) {
            const currentAirlineName = this.airlines[i];
            const airlineFlightCount = this._flights.filter(x => x.airlineName === currentAirlineName).length;
            this._statistics.push({airline: currentAirlineName, percentage: Math.round((airlineFlightCount / this._destination.dailyFlightCount) * 100)});
        }
    }
    
}

export interface DestinationAirlineStatistic {
    airline: string;
    percentage: number;
}