export class Room {
    constructor(
        public Id : number,
        public RoomNumber : number,
        public Capacity: number,
        public isReserver: boolean,
        public AccomodationTypeEntityId: number
    ){}
}