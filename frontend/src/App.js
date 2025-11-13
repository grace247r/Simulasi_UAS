import { useEffect, useState } from "react";

function App() {
  const [produk, setProduk] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/API/produk/")
      .then(res => res.json())
      .then(data => setProduk(data))
      .catch(err => console.error("Error:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Daftar Produk</h1>
      <ul>
        {produk.map((item) => (
          <li key={item.id}>
            <h3>{item.nama}</h3>
            <p>{item.deskripsi}</p>
            <p>Harga: Rp{item.harga}</p>
            {item.foto && (
              <img
                src={`http://127.0.0.1:8000${item.foto}`}
                alt={item.nama}
                width="150"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
