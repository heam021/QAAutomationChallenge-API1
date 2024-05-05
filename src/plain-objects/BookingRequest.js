class BookingRequest {
    constructor(data) {
        this.data = data;
    }

    get firstName() {
        return this.data.firstname;
    }

    get lastName() {
        return this.data.lastname;
    }

    get totalPrice() {
        return this.data.totalprice;
    }

    get depositPaid() {
        return this.data.depositpaid;
    }

    get bookingDates() {
        return this.data.bookingdates;
    }

    get additionalNeeds() {
        return this.data.additionalneeds;
    }
}

module.exports = BookingRequest;
