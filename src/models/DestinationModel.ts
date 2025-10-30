import Destination from "../data/Destination";
import AirlineStatisticModel from "./AirlineStatisticModel";
import FlightModel from "./FlightModel";

export default class DestinationModel {
    private _destination: Destination;
    private _flights: FlightModel[];    
    
    public airlineStatisticsModel: AirlineStatisticModel;

    constructor(destination: Destination, flights: FlightModel[]) {
        this._destination = destination;
        this._flights = flights;
        this.airlineStatisticsModel = new AirlineStatisticModel(flights);
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

    public get flights(): FlightModel[] {
        return this._flights;
    }

    public get airlines(): string[] {
        return this.airlineStatisticsModel.airlines;
    }
}
