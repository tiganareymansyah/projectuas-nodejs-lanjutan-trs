document.formChangeProfil.onsubmit = async (event) => {
  event.preventDefault();
  const changePp = new FormData();
  changePp.append("foto", document.formChangeProfil.filePp.files[0]);
  await fetch("/api/changepp", {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
        changePp
    })
  }).then(async (response) => {
    if (response.ok) {
      const message = await response.text();
      alert(message);
      location.reload();
    }
  });
};


fetch("/api/me", {
  method: "GET",
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    const tamPro = document.querySelector(".div-tampilprofil");
    const img = document.createElement("img");
    img.src = `/foto/${data.foto_profil}`;
    tamPro.appendChild(img);

    const profilusername = document.createElement("div");
    profilusername.className = "namaprofil";
    profilusername.textContent = data.nama_lengkap;
    tamPro.appendChild(profilusername);
  });
