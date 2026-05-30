document.addEventListener("DOMContentLoaded", function () {
    
    // 1. DOM: Dark Mode Toggle
    const themeToggleBtn = document.getElementById("themeToggle");
    themeToggleBtn.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        if (document.body.classList.contains("dark-mode")) {
            themeToggleBtn.textContent = "Light Mode";
            themeToggleBtn.classList.replace("btn-outline-light", "btn-light");
        } else {
            themeToggleBtn.textContent = "Dark Mode";
            themeToggleBtn.classList.replace("btn-light", "btn-outline-light");
        }
    });

    // 2. DOM: Filter Kategori Produk
    const filterButtons = document.querySelectorAll(".filter-btn");
    const productItems = document.querySelectorAll(".product-item");

    filterButtons.forEach(button => {
        button.addEventListener("click", function () {
            filterButtons.forEach(btn => {
                btn.classList.replace("btn-success", "btn-outline-success");
            });
            this.classList.replace("btn-outline-success", "btn-success");

            const targetCategory = this.getAttribute("data-category");
            productItems.forEach(item => {
                const itemCategory = item.getAttribute("data-category");
                if (targetCategory === "all" || itemCategory === targetCategory) {
                    item.classList.remove("d-none");
                } else {
                    item.classList.add("d-none");
                }
            });
        });
    });

    // 3. DOM: Kalkulator Kebutuhan Pupuk
    const btnHitung = document.getElementById("btnHitung");
    const luasLahanInput = document.getElementById("luasLahan");
    const hasilKalkulasiDiv = document.getElementById("hasilKalkulasi");

    btnHitung.addEventListener("click", function () {
        const luas = parseFloat(luasLahanInput.value);
        if (isNaN(luas) || luas <= 0) {
            hasilKalkulasiDiv.classList.remove("d-none", "alert-info");
            hasilKalkulasiDiv.classList.add("alert-danger");
            hasilKalkulasiDiv.innerHTML = "<strong>Error!</strong> Masukkan angka luas lahan yang valid.";
            return;
        }

        const kebutuhanPupuk = (luas * 0.2).toFixed(1);
        hasilKalkulasiDiv.classList.remove("d-none", "alert-danger");
        hasilKalkulasiDiv.classList.add("alert-info");
        hasilKalkulasiDiv.innerHTML = `Estimasi kebutuhan pupuk untuk lahan seluas <strong>${luas} m²</strong> adalah sekitar <strong>${kebutuhanPupuk} kg</strong> pupuk organik.`;
    });

    // 4. DOM: Validasi Form & Notifikasi Sukses
    const feedbackForm = document.getElementById("feedbackForm");
    const notifSukses = document.getElementById("notifSukses");

    feedbackForm.addEventListener("submit", function (event) {
        event.preventDefault();
        
        if (!feedbackForm.checkValidity()) {
            event.stopPropagation();
            feedbackForm.classList.add("was-validated");
            notifSukses.classList.add("d-none");
        } else {
            feedbackForm.classList.remove("was-validated");
            notifSukses.classList.remove("d-none");
            feedbackForm.reset();
            
            setTimeout(() => {
                notifSukses.classList.add("d-none");
            }, 4000);
        }
    });
});