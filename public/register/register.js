const myWord = ["Recording Studio Bookings"];
let tamp = 0;
let tamp1 = 0;
let word = '';
let word1 = '';
(
    function myMove () {
        if (tamp === myWord.length) {
            tamp = 0;
        }
        word = myWord[tamp];
        word1 = word.slice(0, ++tamp1);
        document.querySelector(".content-gerak").textContent = word1;
        if(word1.length === word.length) {
            tamp++;
            tamp1 = 0;
        }
        setTimeout(myMove, 200);
    }
)();

document.register.onsubmit = (event) => {
    event.preventDefault();
    const username = document.register.username.value;
    const email = document.register.email.value;
    const password_ = document.register.password_.value;
    const temtanglah = `${document.register.tahun.value}-${document.register.bulan.value}-${document.register.tanggal.value}`;
    const jenkel = document.register.jenkel.value;
    fetch("/api/register", {
        method: "POST",
        headers: {
            "Content-type" : "application/json"
        },
        body: JSON.stringify({
            username,
            email,
            password_,
            temtanglah,
            jenkel
        })
    }).then(async (response) => {
        if(response.ok) {
            const message = await response.text();
            alert(message);
            location.href = "../";
        }
    });
}