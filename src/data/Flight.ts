export default interface Flight {
    disposition: number;
    status: string;
    airlineIdentifier: string;
    airlineName: string;
    codesharePartners: string[];
    flightNumber: string;
    airportGate: string;
    scheduledDepartureTime: string;
    estimatedDepartureTime: string;
    actualDepartureTime: string | null;
    scheduledArrivalTime: string;
    estimatedArrivalTime: string;
    actualArrivalTime: string | null;
    cityCode: string;
    cityName: string;
    cityAirportName: string;
    aircraftType: string;
    lastUpdated: string;
}