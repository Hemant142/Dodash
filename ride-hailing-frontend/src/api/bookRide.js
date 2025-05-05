import instance from "./axios"; // adjust the path if needed

export const bookRide = async ({
  pickupAddress,
  dropoffAddress,
  fare,
  driverId,
  token,
}) => {
  try {
    const response = await instance.post(
      "/rides/book",
      {
        pickupLocation: pickupAddress,
        dropoffLocation: dropoffAddress,
        fare,
        driverId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("✅ Ride booked:", response.data.ride);
    alert("Ride booked successfully!");
  } catch (error) {
    console.log(error, "Ride error");
    // console.error(
    //   "❌ Ride booking failed:",
    //   error.response?.data || error.message
    // );
    alert("Failed to book ride.");
  }
};
