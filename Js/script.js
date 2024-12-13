// LOGIN
// Fungsi untuk mengambil data pengguna dari file JSON
async function loadUsers() {
    try {
        const response = await fetch('akun/pengguna.json'); // Mengambil file JSON yang berisi data pengguna
        const users = await response.json(); // Mengonversi respons ke format JSON
        return users;
    } catch (error) {
        console.error('Error loading users:', error);
        return [];
    }
}

// Fungsi untuk menangani login
document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Mencegah form reload halaman

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    // Memuat data pengguna dari file JSON
    const users = await loadUsers();

    // Mencari user berdasarkan username dan password yang cocok
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        // Jika login berhasil, simpan status login di localStorage
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('userFoto', user.photo); // Menyimpan nama pengguna untuk digunakan di dashboard
        localStorage.setItem('userName', user.name); // Menyimpan nama pengguna untuk digunakan di dashboard
        // localStorage.setItem('userFoto', user.photo); // Menyimpan foto untuk digunakan di dashboard

        // Arahkan ke halaman dashboard
        alert(`Selamat datang, ${user.name}!`);
        window.location.href = 'index.html'; // Mengarahkan ke halaman dashboard
    } else {
        // Menampilkan pesan error jika login gagal
        errorMessage.style.display = 'block';
    }
});


function logout() {
            localStorage.removeItem('loggedIn');
            localStorage.removeItem('userName');
            localStorage.removeItem('userFoto');
            window.location.href = 'login.html'; // Arahkan ke halaman login setelah logout
        }


function searchShape() {
  const searchInput = document.getElementById('search').value.toLowerCase();  // Ambil input pencarian
  const shapeList = document.getElementById('shapes-list');
  const shapes = shapeList.getElementsByClassName('shape-item');  // Ambil semua elemen dengan kelas 'shape-item'
  
  for (let i = 0; i < shapes.length; i++) {
    const shape = shapes[i];
    const shapeId = shape.id.toLowerCase();  // Ambil id elemen dan ubah ke lowercase untuk pencarian yang tidak sensitif huruf besar/kecil
    
    if (shapeId.includes(searchInput)) {  // Cek apakah input pencarian ada dalam id
      shape.style.display = '';  // Tampilkan elemen jika id cocok
    } else {
      shape.style.display = 'none';  // Sembunyikan elemen jika id tidak cocok
    }
  }
}


document.addEventListener('DOMContentLoaded', function() {
    // Mendapatkan elemen modal dan tombol close
    const modal = document.getElementById('featureModal');
    const closeModal = document.getElementById('closeModal');

    // Mendapatkan semua elemen feature-item
    const featureItems = document.querySelectorAll('.feature-item');

    // Event listener untuk setiap feature-item
    featureItems.forEach(item => {
        item.addEventListener('click', function() {
            const title = item.getAttribute('data-title');
            const description = item.getAttribute('data-description');

            // Mengisi konten modal dengan title dan description
            document.getElementById('modalTitle').textContent = title;
            document.getElementById('modalDescription').textContent = description;

            // Menampilkan modal
            modal.style.display = 'block';
        });
    });

    // Menutup modal ketika tombol close diklik
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Menutup modal jika user klik di luar modal
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});



// RUMUS
        // Lingkaran
        function hitungLingkaran() {
            var r = parseFloat(document.getElementById('r_lingkaran').value);
            if (isNaN(r) || r <= 0) {
                alert('Masukkan nilai jari-jari yang valid!');
                return;
            }
            var luas = Math.PI * r * r;
            var keliling = 2 * Math.PI * r;
            document.getElementById('result_lingkaran').innerHTML = `<label>Luas Lingkaran: ${luas.toFixed(2)} m²</label><label>Keliling Lingkaran: ${keliling.toFixed(2)} m²</label>`;
        }

        // Persegi
        function hitungPersegi() {
            var s = parseFloat(document.getElementById('s_persegi').value);
            if (isNaN(s) || s <= 0) {
                alert('Masukkan nilai sisi yang valid!');
                return;
            }
            var luas = s * s;
            var keliling = 4 * s;
            document.getElementById('result_persegi').innerHTML = `<label>Luas Persegi: ${luas} m²</label><label>Keliling Persegi: ${keliling} m²</label>`;
        }

        // Persegi Panjang
        function hitungPersegiPanjang() {
            var p = parseFloat(document.getElementById('p_persegi_panjang').value);
            var l = parseFloat(document.getElementById('l_persegi_panjang').value);
            if (isNaN(p) || isNaN(l) || p <= 0 || l <= 0) {
                alert('Masukkan nilai yang valid!');
                return;
            }
            var luas = p * l;
            var keliling = 2 * (p + l);
            document.getElementById('result_persegi_panjang').innerHTML = `<label>Luas Persegi Panjang: ${luas} m²</label><label>Keliling Persegi Panjang: ${keliling} m²</label>`;
        }

        // Segitiga
        function hitungSegitiga() {
            var a = parseFloat(document.getElementById('a_segitiga').value);
            var t = parseFloat(document.getElementById('t_segitiga').value);
            var sisiMiring = parseFloat(document.getElementById('sisiMiringSegitiga').value);
            if (isNaN(a) || isNaN(t) || a <= 0 || t <= 0) {
                alert('Masukkan nilai yang valid!');
                return;
            }
            var luas = 0.5 * a * t;
            var keliling = a + (sisiMiring*2);
            document.getElementById('result_segitiga').innerHTML = `<label>Luas Segitiga: ${luas} m²</label><label>Keliling Segitiga: ${keliling} m²</label>`;
        }

        // Trapesium
        function hitungTrapesium() {
            var a = parseFloat(document.getElementById('a_trapesium').value);
            var b = parseFloat(document.getElementById('b_trapesium').value);
            var t = parseFloat(document.getElementById('t_trapesium').value);
            var c = parseFloat(document.getElementById('c_trapesium').value);
            if (isNaN(a) || isNaN(b) || isNaN(t) || isNaN(c) || a <= 0 || b <= 0 || t <= 0 || c <= 0 ) {
                alert('Masukkan nilai yang valid!');
                return;
            }
            var luas = 0.5 * (a + b) * t;
            var keliling = a + b + c + t;
            document.getElementById('result_trapesium').innerHTML = `<label>Luas Trapesium: ${luas} m²</label><label>Keliling Trapesium: ${keliling} m²</label>`;
        }

        // Jajar Genjang
        function hitungJajarGenjang() {
            var a = parseFloat(document.getElementById('a_jajar_genjang').value);
            var miring = parseFloat(document.getElementById('miring_jajar_genjang').value);
            var t = parseFloat(document.getElementById('t_jajar_genjang').value);
            if (isNaN(a) || isNaN(t) || isNaN(miring) || a <= 0 || t <= 0 || miring <= 0) {
                alert('Masukkan nilai yang valid!');
                return;
            }
            var luas = a * t;
            var keliling = 2 * (a+miring);
            document.getElementById('result_jajar_genjang').innerHTML = `<label>Luas Jajar Genjang: ${luas} m²</label><label>Keliling Jajar Genjang: ${keliling} m²</label>`;
        }

        // Belah Ketupat
        function hitungBelahKetupat() {
            var s = parseFloat(document.getElementById('s_belah_ketupat').value);

            var d1 = parseFloat(document.getElementById('d1_belah_ketupat').value);
            var d2 = parseFloat(document.getElementById('d2_belah_ketupat').value);
            if (isNaN(d1) || isNaN(d2) || isNaN(s) || s <= 0  || d1 <= 0 || d2 <= 0) {
                alert('Masukkan nilai yang valid!');
                return;
            }
            var luas = 0.5 * d1 * d2;
            var keliling = s*4;
            document.getElementById('result_belah_ketupat').innerHTML = `<label>Luas Belah Ketupat: ${luas} m²</label><label>Keliling Belah Ketupat: ${keliling} m²</label>`;
        }

        // Layang-Layang
        function hitungLayangLayang() {
            var a = parseFloat(document.getElementById('a_layang_layang').value);
            var b = parseFloat(document.getElementById('b_layang_layang').value);
            var d1 = parseFloat(document.getElementById('d1_layang_layang').value);
            var d2 = parseFloat(document.getElementById('d2_layang_layang').value);
            if (isNaN(d1) || isNaN(d2) || d1 <= 0 || d2 <= 0) {
                alert('Masukkan nilai yang valid!');
                return;
            }
            var luas = 0.5 * d1 * d2;
            var keliling = (2*a) + (2*b);
            document.getElementById('result_layang').innerHTML = `<label>Luas Layang-Layang: ${luas} m²</label><label>Keliling Layang-Layang: ${keliling} m²</label>`;
        }

