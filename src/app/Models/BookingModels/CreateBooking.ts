import { DecimalPipe } from "@angular/common";

export class Booking {
    constructor(
        public RoomId : number,
        public UserId : number,
        public NumberOfGuests: number,
        public NumberOfChildren: number,
        public CheckInDate : Date,
        public CheckOutDate : Date,
        public RoomFeePerNight: DecimalPipe,
        public PaymentId: number
    ){}
}