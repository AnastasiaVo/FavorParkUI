import { DecimalPipe } from "@angular/common";

export class Payment {
    constructor(
        public Id : number,
        public BookingId : number,
        public PaymentTypeId : number,
        public PaymentAmount : DecimalPipe,
        public IsActive : boolean,
        public IsPaid : boolean
    ){}
}