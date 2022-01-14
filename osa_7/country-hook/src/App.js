import React, { useState, useEffect } from "react";
import axios from "axios";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  const url = `https://restcountries.com/v2/name/${name}?fullText=true`;

  useEffect(() => {
    if (name === "") {
      return setCountry(null);
    }

    axios.get(url).then((response) => {
      try {
        if (response.data[0].name.length === name.length) {
          const found = true;
          const data = response.data[0];
          setCountry({ data, found });
        }
      } catch (error) {
        const found = false;
        const data = response.data[0];
        setCountry({ data, found });
      }
    });
  }, [name, url]);

  return country;
};

const Country = ({ country }) => {
  if (!country) {
    return null;
  }

  if (!country.found) {
    return <div>not found...</div>;
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div>
      <img
        src={country.data.flag}
        height="100"
        alt={`flag of ${country.data.name}`}
      />
    </div>
  );
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button type="submit">find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;