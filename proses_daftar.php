<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Ambil data dari form
    $name = $_POST['name'];
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Cek apakah username sudah ada di file JSON
    $jsonFile = 'akun/pengguna.json';
    $existingData = [];

    if (file_exists($jsonFile)) {
        $existingData = json_decode(file_get_contents($jsonFile), true);
    }

    foreach ($existingData as $user) {
        if ($user['username'] == $username) {
            // Tampilkan alert dan redirect kembali ke halaman daftar
            echo "<script>alert('Username sudah terdaftar. Silakan pilih username lain.'); window.location.href = 'daftar.html';</script>";
            exit; // Hentikan eksekusi setelah menampilkan alert
        }
    }

    // Validasi file foto
    if (isset($_FILES['photo']) && $_FILES['photo']['error'] == 0) {
        // Tentukan lokasi dan nama file dengan skema folder akun/foto/
        $uploadDir = 'akun/foto/';
        if (!file_exists($uploadDir)) {
            // Jika folder 'akun/foto/' belum ada, buat foldernya
            mkdir($uploadDir, 0777, true); // Opsi 'true' untuk membuat folder induk jika belum ada
        }

        $fileExtension = pathinfo($_FILES['photo']['name'], PATHINFO_EXTENSION);  // Mendapatkan ekstensi file (jpg, png, dll)

        // Membuat ID unik menggunakan timestamp atau UUID
        $uniqueFileName = uniqid('user_', true) . '.' . $fileExtension; // Menambahkan prefix 'user_' dan ID unik
        $uploadFile = str_replace('\/', '/', $uploadDir . $uniqueFileName);
        // $uploadFile = str_replace('\\', '/', $uploadFile);


        // Periksa apakah file adalah gambar yang valid
        $fileType = mime_content_type($_FILES['photo']['tmp_name']);
        if (strpos($fileType, 'image') === false) {
            echo "File yang diunggah bukan gambar.";
            exit;
        }

        // Pindahkan file ke folder 'akun/foto/'
        if (!move_uploaded_file($_FILES['photo']['tmp_name'], $uploadFile)) {
            echo "Gagal mengunggah foto.";
            exit;
        }
    } else {
        echo "Tidak ada foto yang diunggah.";
        exit;
    }

    // Simpan data dalam format JSON
    $userData = [
        "name" => $name,
        "username" => $username,
        "password" => $password,
        "photo" => $uniqueFileName  // Menyimpan path foto
    ];

    // Periksa apakah file JSON sudah ada
    if (file_exists($jsonFile)) {
        // Jika file JSON sudah ada, baca dan tambahkan data baru
        $existingData[] = $userData;
    } else {
        // Jika file JSON belum ada, buat array baru dan masukkan data pertama
        $existingData = [$userData];
    }

    // Simpan data ke dalam file JSON
    if (file_put_contents($jsonFile, json_encode($existingData, JSON_PRETTY_PRINT))) {
        // echo "Pendaftaran berhasil! Data telah disimpan.";
        echo "<script>alert('Pendaftaran berhasil, silahkan login.'); window.location.href = 'login.html';</script>";
    } else {
        echo "Gagal menyimpan data.";
        header("Location: daftar.html");
    }
} else {
    echo "Metode permintaan tidak valid.";
}
?>
