document.formJamBooking.onsubmit = async (e) => {
  e.preventDefault();
  const jamBooking = document.formJamBooking.jamBooking.value;
  const bayar = jamBooking * 50000;
  await fetch("/api/postpembayaran", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      jamBooking,
      bayar,
    }),
  });

  await fetch("/api/getpembayaran", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      const divTotal = document.querySelector(".div-total");
      const divTamp = document.createElement("div");

      const judulNota = document.createElement("p");
      judulNota.className = "judul-nota";
      judulNota.textContent = "* Nota Pembayaran *";
      divTamp.appendChild(judulNota);
      const p1 = document.createElement("p");
      p1.textContent = `Id user : ${data.id_user}`;
      divTamp.appendChild(p1);
      const p2 = document.createElement("p");
      p2.textContent = `Email : ${data.email}`;
      divTamp.appendChild(p2);
      const p3 = document.createElement("p");
      p3.textContent = `Nama lengkap : ${data.nama_lengkap}`;
      divTamp.appendChild(p3);
      const p4 = document.createElement("p");
      p4.textContent = `Waktu booking : ${data.jam} jam`;
      divTamp.appendChild(p4);
      const p5 = document.createElement("p");
      p5.textContent = `Total bayar : Rp.${data.pembayaran}`;
      divTamp.appendChild(p5);

      divTotal.appendChild(divTamp);
    });
};
