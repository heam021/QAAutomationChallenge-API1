const {test, expect} = require('@playwright/test');
const postApi = require('../Data/post_request_structure.json');
const putApi = require('../Data/put_request_structure.json');
const tokenApi = require('../Data/token.json');

test('API Requests Methods',async({request})=>{

  //Post Method
  console.log("/////////  POST   ///////////");
  const postApiResponse = await request.post("/booking",{
    data: postApi

  });
  console.log('POST Response:', postApiResponse.status());

  
  //Validate Post 
  expect(postApiResponse.ok()).toBeTruthy();
  expect(postApiResponse.status()).toBe(200);

  const bookingId = await postApiResponse.json();
  console.log("Post Response: ",bookingId);
  const bId = bookingId.bookingid;


  //Get Method 
  console.log("/////////  GET   ///////////");

  
  // Create GET 
  const getApiResponse = await request.get(`/booking/${bId}`);
  console.log('GET  Response:', getApiResponse.status());

  // Validate status code
  console.log(await getApiResponse.json());
  expect(getApiResponse.ok()).toBeTruthy();
  expect(getApiResponse.status()).toBe(200);
  



  //PUT Method
  console.log("/////////  PUT   ///////////");

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
  console.log(putResponseBody)


  //validate 
  expect(putResponse.status()).toBe(200);


   // GET updated reservation
   const getUpdatedApiREsponse = await request.get(`/booking/${bId}`);
   console.log('GET Updated Response:', getUpdatedApiREsponse.status());

   expect(getUpdatedApiREsponse.ok()).toBeTruthy();
   expect(getUpdatedApiREsponse.status()).toBe(200);
   const updatedBooking = await getUpdatedApiREsponse.json();

   // Validate that the reservation has been successfully updated
   console.log('Updated Booking:', updatedBooking) 

   //Delete Method
   console.log("/////////  DELETE   ///////////");


  const deleteApiResponse = await request.delete(`/booking/${bId}`,{
    headers:{
        "Content-Type":"application/json",
        "Cookie": `token=${tokenNumber}`
    },
})

  await expect(deleteApiResponse.status()).toEqual(201);
  await expect(deleteApiResponse.statusText()).toBe('Created')

  expect(deleteApiResponse.ok()).toBeTruthy();
  expect(deleteApiResponse.status()).toBe(201);

  // Try to get the deleted reservation
  const getDeletedApiREsponse = await request.get(`/booking/${bId}`);
  console.log('GET Delete Response:', getDeletedApiREsponse.status());
  expect(getDeletedApiREsponse.status()).toBe(404);
  




})

