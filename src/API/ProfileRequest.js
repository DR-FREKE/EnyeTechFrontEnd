export const fetchprofileData = async () => {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/records`);
  if (response.ok) {
    const { records, status, size } = await response.json();
    return { records, status, size };
  } else {
    throw new Error();
  }
};

// export const fetchUserLocation = async (longitude, latitude) => {
//   const response = await fetch(``)
// }
