import { useEffect, useState } from "react";

export default function ExternalApi() {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    fetch("https://api.tvmaze.com/search/shows?q=batman")
      .then((res) => res.json())
      .then((data) => {
        setShows(data);
      });
  }, []);

  return (
    <div>
      <h2>Resultados externos (Batman)</h2>

      {shows.map((item, index) => (
        <div key={index}>
          <h3>{item.show.name}</h3>
        </div>
      ))}
    </div>
  );
}

