// Data Produk
let products = JSON.parse(localStorage.getItem("products")) || [];

//  Halaman Penjual  //
if (document.querySelector("#productForm")) {
    const productForm = document.querySelector("#productForm");
    const productTable = document.querySelector("#productTable tbody");

    // Fungsi untuk render tabel
    const renderTable = () => {
        productTable.innerHTML = products
            .map(
                (product, index) => `
                <tr>
                    <td>${product.name}</td>
                    <td>${product.type}</td>
                    <td>Rp ${product.price}</td>
                    <td>
                        <button onclick="editProduct(${index})">Edit</button>
                        <button onclick="deleteProduct(${index})">Hapus</button>
                    </td>
                </tr>
            `
            )
            .join("");
    };

    // Fungsi untuk menambahkan atau memperbarui produk
    productForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.querySelector("#productName").value;
        const type = document.querySelector("#productType").value;
        const price = document.querySelector("#productPrice").value;

        // Tambahkan produk baru ke array
        products.push({ name, type, price });

        // Simpan array produk ke localStorage
        localStorage.setItem("products", JSON.stringify(products));

        // Bersihkan form
        productForm.reset();

        // Render ulang tabel
        renderTable();
    });

    // Fungsi untuk mengedit produk
    window.editProduct = (index) => {
        const product = products[index];

        // Isi form dengan data produk yang akan diedit
        document.querySelector("#productName").value = product.name;
        document.querySelector("#productType").value = product.type;
        document.querySelector("#productPrice").value = product.price;

        // Hapus produk lama dari array
        products.splice(index, 1);

        // Simpan perubahan ke localStorage
        localStorage.setItem("products", JSON.stringify(products));

        // Render ulang tabel
        renderTable();
    };

    // Fungsi untuk menghapus produk
    window.deleteProduct = (index) => {
        // Hapus produk dari array
        products.splice(index, 1);

        // Simpan perubahan ke localStorage
        localStorage.setItem("products", JSON.stringify(products));

        // Render ulang tabel
        renderTable();
    };

    // Render tabel saat halaman dimuat
    renderTable();
}

// ================= Halaman Pembeli ================= //
if (document.querySelector("#purchaseForm")) {
    const selectProduct = document.querySelector("#selectProduct");
    const purchaseForm = document.querySelector("#purchaseForm");

    // Render pilihan produk dari localStorage
    const renderOptions = () => {
        selectProduct.innerHTML = products
            .map(
                (product) =>
                    `<option value="${product.name}|${product.price}">${product.name} - Rp ${product.price}</option>`
            )
            .join("");
    };

    // Fungsi untuk menangani pembelian
    purchaseForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const selectedProduct = selectProduct.value.split("|");
        const productName = selectedProduct[0];
        const productPrice = parseInt(selectedProduct[1]);
        const bank = document.querySelector("#bankAccount").value;
        const quantity = parseInt(document.querySelector("#quantity").value);

        const total = productPrice * quantity;

        // Simpan data pembelian
        const purchaseDetails = {
            productName,
            productPrice,
            quantity,
            total,
            bank,
            date: new Date().toLocaleString(),
        };

        localStorage.setItem("lastPurchase", JSON.stringify(purchaseDetails));

        // Arahkan ke halaman struk
        window.location.href = "struk.html";
    });

    // Render pilihan produk
    renderOptions();
}

// Halaman Struk  //
if (document.getElementById("strukPage")) {
    const purchaseDetails = JSON.parse(localStorage.getItem("lastPurchase"));

    if (purchaseDetails) {
        document.getElementById("productName").textContent = purchaseDetails.productName;
        document.getElementById("productPrice").textContent = `Rp ${purchaseDetails.productPrice}`;
        document.getElementById("quantity").textContent = purchaseDetails.quantity;
        document.getElementById("total").textContent = `Rp ${purchaseDetails.total}`;
        document.getElementById("bank").textContent = purchaseDetails.bank;
        document.getElementById("date").textContent = purchaseDetails.date;
    } else {
        alert("Tidak ada detail pembelian! Kembali ke halaman pembeli.");
        window.location.href = "penjualan.html";
    }
}
