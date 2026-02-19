"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const filters = document.querySelectorAll(".cat-item");
    const blocks = document.querySelectorAll(".content-block");

    filters.forEach(filter => {
        filter.addEventListener("click", () => {
            filters.forEach(f => f.classList.remove("active"));
            filter.classList.add("active");

            const category = filter.getAttribute("data-category");

            blocks.forEach(block => {
                if (category === "all" || block.id === category) {
                    block.style.display = "block";
                } else {
                    block.style.display = "none";
                }
            });
        });
    });

    const form = document.getElementById("calc-form");
    const dialog = document.getElementById("result-dialog");
    const dialogContent = document.getElementById("dialog-content");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const h = parseFloat(document.getElementById("hossz").value);
        const sz = parseFloat(document.getElementById("szelesseg").value);
        const m = parseFloat(document.getElementById("magassag").value);

        if (h > 0 && sz > 0 && m > 0) {
            const vol = h * sz * m;
            dialogContent.innerHTML = `<h3>Eredmény</h3><p>A szükséges térkitöltő mennyisége: ${vol} cm³</p>`;
            dialog.showModal();
            form.reset();
        }
    });

    document.getElementById("close-dialog").addEventListener("click", () => {
        dialog.close();
    });
});