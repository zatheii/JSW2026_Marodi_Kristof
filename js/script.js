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
    const inputs = form.querySelectorAll("input[type='text']");
    const dialog = document.getElementById("result-dialog");
    const dialogContent = document.getElementById("dialog-content");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let firstInvalid = null;

        inputs.forEach(input => {
            const val = input.value.trim();
            if (val === "" || isNaN(val) || parseFloat(val) <= 0) {
                input.setCustomValidity("Írjon be egy számot.");
                if (!firstInvalid) firstInvalid = input;
            } else {
                input.setCustomValidity("");
            }
        });

        if (firstInvalid) {
            firstInvalid.reportValidity();
        } else {
            const h = parseFloat(document.getElementById("hossz").value);
            const sz = parseFloat(document.getElementById("szelesseg").value);
            const m = parseFloat(document.getElementById("magassag").value);
            const vol = Math.round(h * sz * m);

            dialogContent.innerHTML = `
                <h5 class="fw-bold mb-2" style="font-family: 'Rubik Distressed'">EREDMÉNY</h5>
                <p class="mb-0">Maximum ${vol}cm<sup>3</sup> térkitöltőre lenne szükséged.</p>
            `;
            dialog.showModal();
            form.reset();
        }
    });

    inputs.forEach(input => {
        input.addEventListener("input", () => {
            input.setCustomValidity("");
        });
    });

    document.getElementById("close-dialog").addEventListener("click", () => {
        dialog.close();
    });
});