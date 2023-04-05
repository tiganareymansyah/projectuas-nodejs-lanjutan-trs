fetch("/api/adminuserdata", {
  method: "GET",
})
  .then((response) => response.json())
  .then((data) => {
    const tbodyUserdata = document.querySelector(".tbody-userdata");
    for (let a = 0; a < data.length; a++) {
      const tr = document.createElement("tr");

      const tdIdUser = document.createElement("td");
      tdIdUser.textContent = data[a].id_user;
      tr.appendChild(tdIdUser);

      const tdUsername = document.createElement("td");
      tdUsername.textContent = data[a].username;
      tr.appendChild(tdUsername);

      const tdEmail = document.createElement("td");
      tdEmail.textContent = data[a].email;
      tr.appendChild(tdEmail);

      const tdTemtanglah = document.createElement("td");
      tdTemtanglah.textContent = data[a].temtanglah;
      tr.appendChild(tdTemtanglah);

      const tdJenkel = document.createElement("td");
      tdJenkel.textContent = data[a].jenkel;
      tr.appendChild(tdJenkel);

      tbodyUserdata.appendChild(tr);
    }
  });

fetch("/api/adminbooking", {
  method: "GET",
})
  .then((response) => response.json())
  .then((data) => {
    const tbodyBooking = document.querySelector(".tbody-booking");
    for (let a = 0; a < data.length; a++) {
      const tr = document.createElement("tr");
      const tdIdBooking = document.createElement("td");
      tdIdBooking.textContent = data[a].id_booking;
      tr.appendChild(tdIdBooking);

      const tdIdNamaLengkap = document.createElement("td");
      tdIdNamaLengkap.textContent = data[a].nama_lengkap;
      tr.appendChild(tdIdNamaLengkap);

      const tdBerapaOrang = document.createElement("td");
      tdBerapaOrang.textContent = data[a].berapa_orang;
      tr.appendChild(tdBerapaOrang);

      const tdMulaiJamBerapa = document.createElement("td");
      tdMulaiJamBerapa.textContent = new Date(
        data[a].mulai_jam_berapa
      ).toLocaleString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
      tr.appendChild(tdMulaiJamBerapa);

      const tdAkhirJamBerapa = document.createElement("td");
      tdAkhirJamBerapa.textContent = new Date(
        data[a].akhir_jam_berapa
      ).toLocaleString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
      tr.appendChild(tdAkhirJamBerapa);

      const tdNomorHp = document.createElement("td");
      tdNomorHp.textContent = data[a].nomor_hp;
      tr.appendChild(tdNomorHp);

      const tdRuangan = document.createElement("td");
      tdRuangan.textContent = data[a].ruangan;
      tr.appendChild(tdRuangan);

      const tdIdUser1 = document.createElement("td");
      tdIdUser1.textContent = data[a].id_user;
      tr.appendChild(tdIdUser1);
      tbodyBooking.appendChild(tr);
    }
  });
