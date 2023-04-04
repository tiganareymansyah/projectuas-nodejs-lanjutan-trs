fetch("/api/adminuserdata", {
  method: "GET",
})
  .then((response) => response.json())
  .then((data) => {
    const tbodyUserdata = document.querySelector(".tbody-userdata");
    const tr = document.createElement("tr");

    const tdIdUser = document.createElement("td");
    tdIdUser.textContent = data.id_user;
    tr.appendChild(tdIdUser);

    const tdUsername = document.createElement("td");
    tdUsername.textContent = data.username;
    tr.appendChild(tdUsername);

    const tdEmail = document.createElement("td");
    tdEmail.textContent = data.email;
    tr.appendChild(tdEmail);

    const tdTemtanglah = document.createElement("td");
    tdTemtanglah.textContent = data.temtanglah;
    tr.appendChild(tdTemtanglah);

    const tdJenkel = document.createElement("td");
    tdJenkel.textContent = data.jenkel;
    tr.appendChild(tdJenkel);

    tbodyUserdata.appendChild(tr);
  });

fetch("/api/adminbooking", {
  method: "GET",
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    const tbodyBooking = document.querySelector(".tbody-booking");
    const tr = document.createElement("tr");

    const tdIdBooking = document.createElement("td");
    tdIdBooking.textContent = data.id_booking;
    tr.appendChild(tdIdBooking);

    const tdIdNamaLengkap = document.createElement("td");
    tdIdNamaLengkap.textContent = data.nama_lengkap;
    tr.appendChild(tdIdNamaLengkap);

    const tdBerapaOrang = document.createElement("td");
    tdBerapaOrang.textContent = data.berapa_orang;
    tr.appendChild(tdBerapaOrang);

    const tdMulaiJamBerapa = document.createElement("td");
    tdMulaiJamBerapa.textContent = new Date(
      data.mulai_jam_berapa
    ).toLocaleString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    tr.appendChild(tdMulaiJamBerapa);

    const tdAkhirJamBerapa = document.createElement("td");
    tdAkhirJamBerapa.textContent = new Date(
      data.akhir_jam_berapa
    ).toLocaleString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    tr.appendChild(tdAkhirJamBerapa);

    const tdNomorHp = document.createElement("td");
    tdNomorHp.textContent = data.nomor_hp;
    tr.appendChild(tdNomorHp);

    const tdRuangan = document.createElement("td");
    tdRuangan.textContent = data.ruangan;
    tr.appendChild(tdRuangan);

    const tdIdUser1 = document.createElement("td");
    tdIdUser1.textContent = data.id_user;
    tr.appendChild(tdIdUser1);

    tbodyBooking.appendChild(tr);
  });
