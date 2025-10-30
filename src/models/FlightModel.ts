import Flight from "../data/Flight";
import dayjs from 'dayjs';

export default class FlightModel {
    private _flight: Flight;

    constructor(flight: Flight) {
        this._flight = flight;
    }

    public get isArrival(): boolean {
        return this._flight.disposition === 1;
    }

    public get flightNumber(): string {
        return this._flight.flightNumber;
    }

    public get status(): string {
        const splits = this._flight.status.split('/');
        if (splits.length > 0) {
            return splits[0].trim();
        }
        return this._flight.status;
    }

    public get statusDescription(): string {
        const splits = this._flight.status.split('/');
        if (splits.length === 2) {
            return splits[1].trim();
        }

        return this._flight.status;
    }

    public get airportCode(): string {
        return this._flight.cityCode;
    }

    public get cityAirportName(): string {
        return this._flight.cityAirportName;
    }

    public get cityName(): string {
        return this._flight.cityName;
    }

    public get airlineName(): string {
        return this.getAirlineOperatedFor(this._flight.airlineName, this._flight.codesharePartners) ?? this._flight.airlineName;
    }

    public get airlineOperatedBy(): string {
        return this.getAirlineOperatedFor(this._flight.airlineName, this._flight.codesharePartners) === null ? "" : this._flight.airlineName;
    }

    public get estimatedTime(): string {
        const time = this.isArrival ? this._flight.estimatedArrivalTime : this._flight.estimatedDepartureTime;
        return dayjs(time).format("h:m A");        
    }

    public get scheduledTime(): string {
        const time = this.isArrival ? this._flight.scheduledArrivalTime : this._flight.scheduledDepartureTime;
        return dayjs(time).format("h:m A");        
    }

    public get actualTime(): string | null {
        if ((this.isArrival ? this._flight.actualArrivalTime : this._flight.actualDepartureTime) === null) return null;

        const time = this.isArrival ? this._flight.actualArrivalTime : this._flight.actualDepartureTime;
        return dayjs(time).format("h:m A");        
    }

    private getAirlineOperatedFor(airline: string, codesharePartners: string[] | undefined): string | null {
        if (!codesharePartners) return null;

        if (['SkyWest', 'Endeavor', 'Republic', 'Envoy'].includes(airline)) {
            if (codesharePartners.includes("United")) return "United";
            if (codesharePartners.includes("Delta")) return "Delta";
            if (codesharePartners.includes("American")) return "American";
        }

        return null;
    }
}