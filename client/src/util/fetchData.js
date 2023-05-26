import axios from "axios";

const fetchData = async (resource) => {
  const res = await axios.get(
    `https://rvas-3903b-default-rtdb.europe-west1.firebasedatabase.app/${resource}.json`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
};

export default fetchData;
