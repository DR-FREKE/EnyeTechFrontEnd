export const fetchprofileData = async () => {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/records`);
  if (response.ok) {
    const { records, status, size } = await response.json();
    return { records, status, size };
  } else {
    throw new Error();
  }
};

export const fetchUserLocation = async (longitude, latitude) => {
  const API_KEY = "AIzaSyAQAAZ433yycr-J7zMBI421gj5G3zXdhgA";
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&key=${API_KEY}`
  );

  if (response.ok) {
    const result = await response.json();
    return result;
  }
};
