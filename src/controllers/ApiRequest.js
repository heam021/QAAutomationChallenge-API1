const putApi = require('../../Data/put_request_structure.json');

class ApiRequest {
    constructor(request) {
        this.request = request;
    }

    async postBooking(data) {
        return await this.request.post("/booking", { data });
    }

    async getBookingById(bookingId) {
        return await this.request.get(`/booking/${bookingId}`);
    }

    async putBookingById(bookingId, tokenNumber, putApi) {
        return await this.request.put(`/booking/${bookingId}`, {
            headers: {
                "Content-Type": "application/json",
                "Cookie": `token=${tokenNumber}`
            },
            putApi
        });
    }

    async getBookingById(bookingId) {
        return await this.request.get(`/booking/${bookingId}`);
    }


    async deleteBookingById(bookingId, tokenNumber) {
        return await this.request.delete(`/booking/${bookingId}`, {
            headers: {
                "Content-Type": "application/json",
                "Cookie": `token=${tokenNumber}`
            },
        });
    }
}

module.exports = ApiRequest;
