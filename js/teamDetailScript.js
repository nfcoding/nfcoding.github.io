// REGISTER SERVICE WORKER
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/service-worker.js")
            .then(() => {
                console.log("Pendaftaran ServiceWorker berhasil");
            })
            .catch(() => {
                console.log("Pendaftaran ServiceWorker gagal");
            });
    });
} else {
    console.log("ServiceWorker belum didukung browser ini.");
}

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const isFromSaved = urlParams.get("saved");
    const btnSave = document.getElementById("save");
    const item = getTeamById();
    if (isFromSaved) {
        // Hide fab jika dimuat dari indexed db
        btnSave.style.display = 'none';

        // ambil artikel lalu tampilkan
        getSavedTeamById();
    } else {
        item
    }
    btnSave.onclick = () => {
        console.log("Tombol FAB di klik.");
        item.then((team) => {
            saveForLater(team);
        });
    };

});
