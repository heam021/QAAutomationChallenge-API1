const { test, expect } = require('@playwright/test');
const BookingRequest = require('../plain-objects/BookingRequest');
const ApiRequest = require('../controllers/ApiRequest');
const postApi = require('../../Data/post_request_structure.json');
const putApi = require('../../Data/put_request_structure.json');
const tokenApi = require('../../Data/token.json');

test('API Requests Methods', async ({ request }) => {
    const api = new ApiRequest(request);

    // Post Method
    
    const postApiResponse = await api.postBooking(postApi);
    console.log('POST Response:', postApiResponse.status());
  
    //Validate Post
    expect(postApiResponse.ok()).toBeTruthy();
    expect(postApiResponse.status()).toBe(200);

    const bookingId = await postApiResponse.json();
    console.log("Post Response: ", bookingId);
    const bId = bookingId.bookingid;

    // Get Method 
   
    const getApiResponse = await api.getBookingById(bId);
    console.log('GET  Response:', getApiResponse.status());

    // Validate status code
    console.log(await getApiResponse.json());
    expect(getApiResponse.ok()).toBeTruthy();
    expect(getApiResponse.status()).toBe(200);

    //PUT Method

  
       // PUT Method
      //  console.log("/////////  PUT   ///////////");
      //  const tokenAPIResponse = await api.postBooking("/auth", {
      //       data: tokenApi 
      //      });

      // const varFloat = await console.log(tokenAPIResponse.ok());
      //  //console.log(expect(varFloat).toBeTruthy());
       
      //  //expect(tokenAPIResponse.status()).toBe(200);
   
      //  console.log(await tokenAPIResponse.json());
      //  const tokenResponseBody = await tokenAPIResponse.json();
      //  const tokenNumber = tokenResponseBody.token;
   
      //  const putResponse = await api.putBookingById(bId, tokenNumber, putApi);
      //  console.log('PUT Response:', putResponse.status());
   
      //  const putResponseBody = await putResponse.json();
      //  console.log(putResponseBody)
   
      //  // Validate 
      //  expect(putResponse.status()).toBe(200);

  // generate token
  const tokenAPIResponse = await request.post("/auth", {
    data: tokenApi,
  });
  expect(tokenAPIResponse.ok()).toBeTruthy();
  expect(tokenAPIResponse.status()).toBe(200);

  console.log(await tokenAPIResponse.json());
  const tokenResponseBody = await tokenAPIResponse.json();
  const tokenNumber = tokenResponseBody.token;


  const putResponse = await request.put(`/booking/${bId}`,{
    headers:{
        "Content-Type":"application/json",
        "Cookie": `token=${tokenNumber}`
    },
    data:putApi
    
})
  console.log('PUT Response:', putResponse.status());

  const putResponseBody = await putResponse.json();
  console.log(putResponseBody);

  //validate 
  expect(putResponse.status()).toBe(200);

    // GET updated reservation
    const getUpdatedApiResponse = await api.getBookingById(bId);
    console.log('GET Updated Response:', getUpdatedApiResponse.status());

    expect(getUpdatedApiResponse.ok()).toBeTruthy();
    expect(getUpdatedApiResponse.status()).toBe(200);
    const updatedBooking = await getUpdatedApiResponse.json();

    // Validate that the reservation has been successfully updated
    console.log('Updated Booking:', updatedBooking) 

    // Delete Method
    const deleteApiResponse = await api.deleteBookingById(bId, tokenNumber);

    await expect(deleteApiResponse.status()).toEqual(201);
    await expect(deleteApiResponse.statusText()).toBe('Created')

    expect(deleteApiResponse.ok()).toBeTruthy();
    expect(deleteApiResponse.status()).toBe(201);

    // Try to get the deleted reservation
    const getDeletedApiResponse = await api.getBookingById(bId);
    console.log('GET Delete Response:', getDeletedApiResponse.status());
    expect(getDeletedApiResponse.status()).toBe(404);
});
