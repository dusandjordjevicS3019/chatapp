import axios from "axios";

// helper funkcija
const sendData = async (resource, data) => {
  await axios.post(
    `https://rvas-3903b-default-rtdb.europe-west1.firebasedatabase.app/${resource}.json`,
    data
  );
};

export default sendData;
