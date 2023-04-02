document.formBooking.onsubmit = async (event) => {
    event.preventDefault();
    const namaLengkap = document.formBooking.namaLengkap.value;
    const berapaOrang = document.formBooking.berapaOrang.value;
    const ruangan = document.formBooking.ruangan.value;
    const mulaiJam = document.formBooking.mulaiJam.value;
    const akhirJam = document.formBooking.akhirJam.value;
    const nomorHp = document.formBooking.nomorHp.value;
    await fetch("/api/booking", {
        method: "POST",
        headers: {
            "Content-type" : "application/json"
        },
        body: JSON.stringify({
            namaLengkap,
            berapaOrang,
            ruangan,
            mulaiJam,
            akhirJam,
            nomorHp
        })
    }).then(async (response) => {
        if(response.ok) {
            const message = await response.text();
            alert(message);
            location.href = "../pembayaran/pembayaran.html";
        }
        else {
            const message = await response.text();
            alert(message);
            location.reload();
        }
    });
};

document.querySelector(".logout").onclick = async () => {
    await fetch("/api/logout").then(async (response) => {
        if(response.ok) {
            alert(await response.text());
            location.href = "../"
        }
    })
};