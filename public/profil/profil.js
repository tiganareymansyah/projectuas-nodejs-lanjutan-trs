document.formChangeProfil.onsubmit = async (event) => {
  event.preventDefault();
  const changePp = new FormData();
  changePp.append("foto", document.formChangeProfil.filePp.files[0]);
  await fetch("/api/changepp", {
    method: "PUT",
    body: changePp,
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
    const tamPro = document.querySelector(".div-tampilprofil");
    const img = document.createElement("img");
    img.src = `/foto/${data.foto_profil}`;
    tamPro.appendChild(img);

    const profilusername = document.createElement("div");
    profilusername.className = "namaprofil";
    profilusername.textContent = data.email;
    tamPro.appendChild(profilusername);
  });

fetch("/api/tampildata", {
  method: "GET",
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    const tbody = document.querySelector("tbody");
    const tr = document.createElement("tr");

    const tdIdUSer = document.createElement("td");
    tdIdUSer.textContent = data.id_user;
    tr.appendChild(tdIdUSer);

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

    const tdUpdate = document.createElement("td");
    const buttonUpdate = document.querySelector(".button-update");
    tdUpdate.appendChild(buttonUpdate);
    tr.appendChild(tdUpdate);

    tbody.appendChild(tr);
  });


document.formUpdate.onsubmit = async (event) => {
    event.preventDefault();
    const updateEmail = document.formUpdate.updateEmail.value;
    const updatePassword = document.formUpdate.updatePassword.value;
    const pilih = confirm(`Apakah anda ingin mengupdate akun anda dengan email ${updateEmail} dan password ${updatePassword} ?`);
    if(pilih == true) {
        await fetch("/api/updateakun", {
            method: "PUT",
            headers: {
                "Content-type" : "application/json"
            },
            body: JSON.stringify({
                updateEmail,
                updatePassword
            })
        }).then(async (response) => {
            if(response.ok) {
                const message = await response.text();
                alert(message);
                location.href = "../";
            }
        });
    }
    else {
        location.reload();
    }
};

document.querySelector(".button-delete").onclick = async (event) => {
    event.preventDefault();
    const pilih = confirm("Apakah anda yakin ingin menghapus akun anda ?");
    if(pilih == true) {
        await fetch("/api/deleteakun", {
            method : "DELETE"
        }).then(async (response) => {
            if(response.ok) {
                alert(await response.text());
                location.href = "../";
            }
        });
    }
    else {
        location.reload();
    }
};