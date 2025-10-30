import Flight from "../data/Flight";

export default class FlightModel {
    private _flight: Flight;

    constructor(flight: Flight) {
        this._flight = flight;
    }

    public get flightNumber(): string {
        return this._flight.flightNumber;
    }

    public get status(): string {
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