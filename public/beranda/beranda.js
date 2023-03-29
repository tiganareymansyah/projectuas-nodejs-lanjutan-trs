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
        }
        else {
            const message = await response.text();
            alert(message);
        }
    });
};