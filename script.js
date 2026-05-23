// ================================================================
// TAMA RENT CAR AND TRAVEL - JAVASCRIPT UTAMA
// Menggunakan Vanilla JS murni (loop manual + kondisi if-else dasar)
// ================================================================


// ----------------------------------------------------------------
// 1. NAVBAR SCROLL EFFECT
//    Mengubah navbar dari transparan menjadi solid saat di-scroll
// ----------------------------------------------------------------

// Ambil elemen navbar dari DOM
var navbar = document.getElementById('navbar');

// Tambahkan listener untuk event scroll pada window
window.addEventListener('scroll', function() {
    // Cek posisi scroll: jika lebih dari 80px dari atas
    if (window.scrollY > 80) {
        // Tambahkan kelas 'scrolled' → navbar jadi solid (via CSS)
        navbar.classList.add('scrolled');
    } else {
        // Hapus kelas 'scrolled' → navbar kembali transparan
        navbar.classList.remove('scrolled');
    }
});


// ----------------------------------------------------------------
// 2. HAMBURGER MENU (Mobile Navigation)
//    Toggle buka/tutup menu navigasi di layar kecil
// ----------------------------------------------------------------

// Ambil elemen hamburger button dan menu navigasi
var hamburgerBtn = document.getElementById('hamburgerBtn');
var navMenu = document.getElementById('navMenu');

// Tambahkan listener klik pada tombol hamburger
hamburgerBtn.addEventListener('click', function() {
    // Toggle kelas 'active' pada hamburger (animasi ikon → X)
    hamburgerBtn.classList.toggle('active');
    // Toggle kelas 'open' pada nav menu (tampilkan/sembunyikan)
    navMenu.classList.toggle('open');
});

// Tutup menu otomatis saat salah satu link nav diklik
// Ambil semua elemen dengan kelas 'nav-link'
var navLinks = document.querySelectorAll('.nav-link');

// Loop manual untuk setiap link navigasi
for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener('click', function() {
        // Tutup menu dengan menghapus kelas 'open'
        navMenu.classList.remove('open');
        // Kembalikan ikon hamburger ke kondisi normal
        hamburgerBtn.classList.remove('active');
    });
}

// Tutup menu saat klik di luar area menu
document.addEventListener('click', function(event) {
    // Cek apakah klik bukan pada hamburger dan bukan pada navMenu
    var isClickOnHamburger = hamburgerBtn.contains(event.target);
    var isClickOnNav = navMenu.contains(event.target);

    // Jika klik di luar keduanya, dan menu sedang terbuka
    if (!isClickOnHamburger && !isClickOnNav) {
        if (navMenu.classList.contains('open')) {
            navMenu.classList.remove('open');
            hamburgerBtn.classList.remove('active');
        }
    }
});


// ----------------------------------------------------------------
// 3. FUNGSI SEWA MOBIL - WHATSAPP DINAMIS
//    Membuat pesan WhatsApp otomatis berisi nama mobil yang dipilih
// ----------------------------------------------------------------

/**
 * Fungsi sewaMobil(tombol)
 * Dipanggil saat tombol "Sewa Sekarang" diklik.
 * Mengambil data nama & harga dari atribut data-* pada tombol,
 * lalu membuka WhatsApp dengan pesan template yang sudah terisi.
 *
 * @param {HTMLElement} tombol - Elemen tombol yang diklik
 */
function sewaMobil(tombol) {
    // Ambil nama mobil dari atribut data-nama pada tombol
    var namaMobil = tombol.getAttribute('data-nama');

    // Ambil harga dari atribut data-harga pada tombol
    var hargaMobil = tombol.getAttribute('data-harga');

    // Nomor WhatsApp tujuan (format internasional tanpa +)
    var nomorWA = '6281263162487';

    // Template pesan yang akan dikirim ke WhatsApp
    // Menggunakan template literal untuk menyisipkan nama & harga secara dinamis
    var pesanTemplate = 
        'Halo Tama Rent Car And Travel! 👋\n\n' +
        'Saya tertarik untuk menyewa kendaraan berikut:\n\n' +
        '🚗 *Kendaraan:* ' + namaMobil + '\n' +
        '💰 *Harga:* ' + hargaMobil + '\n\n' +
        'Mohon informasi lebih lanjut mengenai:\n' +
        '- Ketersediaan unit\n' +
        '- Tanggal yang tersedia\n' +
        '- Fasilitas yang disertakan\n\n' +
        'Terima kasih! 🙏';

    // Encode pesan agar aman sebagai parameter URL
    // encodeURIComponent mengubah spasi dan karakter khusus menjadi kode URL
    var pesanEncoded = encodeURIComponent(pesanTemplate);

    // Buat URL WhatsApp lengkap dengan nomor dan pesan
    var urlWhatsApp = 'https://wa.me/' + nomorWA + '?text=' + pesanEncoded;

    // Buka URL di tab baru
    window.open(urlWhatsApp, '_blank');
}


// ----------------------------------------------------------------
// 4. FILTER KATALOG ARMADA
//    Menyaring kartu mobil berdasarkan kategori yang dipilih
// ----------------------------------------------------------------

// Ambil semua tombol filter
var filterButtons = document.querySelectorAll('.filter-btn');

// Ambil semua kartu mobil
var carCards = document.querySelectorAll('.car-card');

// Loop untuk setiap tombol filter
for (var j = 0; j < filterButtons.length; j++) {

    // Tambahkan event listener klik pada setiap tombol filter
    filterButtons[j].addEventListener('click', function() {

        // --- Langkah 1: Update visual tombol aktif ---
        // Hapus kelas 'active' dari SEMUA tombol filter dulu
        for (var k = 0; k < filterButtons.length; k++) {
            filterButtons[k].classList.remove('active');
        }
        // Tambahkan kelas 'active' hanya pada tombol yang diklik
        this.classList.add('active');

        // --- Langkah 2: Ambil nilai filter dari atribut data-filter ---
        var nilaiFilter = this.getAttribute('data-filter');

        // --- Langkah 3: Tampilkan/sembunyikan kartu berdasarkan filter ---
        // Loop semua kartu mobil
        for (var l = 0; l < carCards.length; l++) {

            // Ambil kategori kartu dari atribut data-kategori
            var kategoriKartu = carCards[l].getAttribute('data-kategori');

            // Kondisi if-else untuk menentukan kartu mana yang ditampilkan
            if (nilaiFilter === 'semua') {
                // Jika filter "Semua": tampilkan semua kartu
                carCards[l].style.display = 'flex';

                // Tambahkan animasi fade-in saat kartu muncul
                carCards[l].style.opacity = '0';
                carCards[l].style.transform = 'translateY(20px)';

                // Gunakan timeout untuk efek transisi yang mulus
                // Bungkus dalam IIFE (Immediately Invoked Function Expression)
                // agar nilai 'l' tidak berubah di dalam closure
                (function(kartu) {
                    setTimeout(function() {
                        kartu.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                        kartu.style.opacity = '1';
                        kartu.style.transform = 'translateY(0)';
                    }, 50);
                })(carCards[l]);

            } else if (kategoriKartu === nilaiFilter) {
                // Jika kategori kartu cocok dengan filter: tampilkan
                carCards[l].style.display = 'flex';

                // Animasi masuk
                carCards[l].style.opacity = '0';
                carCards[l].style.transform = 'translateY(20px)';

                (function(kartu) {
                    setTimeout(function() {
                        kartu.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                        kartu.style.opacity = '1';
                        kartu.style.transform = 'translateY(0)';
                    }, 50);
                })(carCards[l]);

            } else {
                // Jika tidak cocok: sembunyikan kartu
                carCards[l].style.display = 'none';
            }
        }
    });
}


// ----------------------------------------------------------------
// 5. SCROLL TO TOP BUTTON
//    Tombol yang muncul saat scroll melewati titik tertentu
// ----------------------------------------------------------------

// Ambil elemen tombol scroll-to-top
var scrollTopBtn = document.getElementById('scrollTopBtn');

// Listener scroll untuk menampilkan/menyembunyikan tombol
window.addEventListener('scroll', function() {
    // Cek apakah sudah scroll lebih dari 400px
    if (window.scrollY > 400) {
        // Tampilkan tombol dengan menambahkan kelas 'visible'
        scrollTopBtn.classList.add('visible');
    } else {
        // Sembunyikan tombol
        scrollTopBtn.classList.remove('visible');
    }
});

// Klik tombol → scroll ke bagian paling atas halaman
scrollTopBtn.addEventListener('click', function() {
    // Scroll ke koordinat (0, 0) dengan animasi smooth
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


// ----------------------------------------------------------------
// 6. ANIMASI FADE-IN SAAT ELEMEN TERLIHAT DI VIEWPORT
//    Menggunakan Intersection Observer untuk performa optimal
//    (tetap Vanilla JS, tidak ada framework)
// ----------------------------------------------------------------

// Ambil semua elemen yang perlu dianimasikan saat terlihat
var fadeElements = document.querySelectorAll(
    '.feature-card, .car-card, .section-header, .cta-inner, .footer-col'
);

// Tambahkan kelas base fade-in ke semua elemen target
for (var m = 0; m < fadeElements.length; m++) {
    fadeElements[m].classList.add('fade-in-element');
}

// Buat Intersection Observer
// Observer ini mengamati kapan elemen masuk ke area tampilan layar
var observer = new IntersectionObserver(
    function(entries) {
        // Loop melalui setiap entry yang terdeteksi
        for (var n = 0; n < entries.length; n++) {
            var entry = entries[n];

            // Jika elemen terlihat di viewport (isIntersecting = true)
            if (entry.isIntersecting) {
                // Tambahkan kelas 'visible' → CSS akan menjalankan animasi
                entry.target.classList.add('visible');

                // Berhenti mengamati elemen ini setelah animasi berjalan
                // (agar tidak animasi berulang saat scroll)
                observer.unobserve(entry.target);
            }
        }
    },
    {
        // Konfigurasi Observer:
        threshold: 0.12,    // Elemen terdeteksi saat 12% terlihat
        rootMargin: '0px 0px -40px 0px' // Sedikit offset dari bawah
    }
);

// Daftarkan setiap elemen untuk diamati observer
for (var p = 0; p < fadeElements.length; p++) {
    observer.observe(fadeElements[p]);
}


// ----------------------------------------------------------------
// 7. ACTIVE NAV LINK SAAT SCROLL
//    Menandai link navigasi sesuai seksi yang sedang dilihat
// ----------------------------------------------------------------

// Ambil semua seksi yang ingin dideteksi
var sections = document.querySelectorAll('section[id], footer[id]');

// Listener scroll untuk deteksi seksi aktif
window.addEventListener('scroll', function() {
    // Posisi scroll saat ini (ditambah offset untuk deteksi lebih awal)
    var scrollPos = window.scrollY + 150;

    // Loop setiap seksi
    for (var q = 0; q < sections.length; q++) {
        var seksi = sections[q];
        var seksiTop = seksi.offsetTop;
        var seksiBottom = seksiTop + seksi.offsetHeight;

        // Cek apakah posisi scroll berada di dalam seksi ini
        if (scrollPos >= seksiTop && scrollPos < seksiBottom) {
            var idSeksi = seksi.getAttribute('id');

            // Update semua nav-link
            for (var r = 0; r < navLinks.length; r++) {
                // Hapus kelas aktif dari semua link
                navLinks[r].classList.remove('active-nav');

                // Ambil href link dan cek apakah sesuai dengan seksi aktif
                var hrefLink = navLinks[r].getAttribute('href');

                if (hrefLink === '#' + idSeksi) {
                    // Tambahkan kelas aktif pada link yang sesuai
                    navLinks[r].classList.add('active-nav');
                }
            }
        }
    }
});


// ----------------------------------------------------------------
// 8. SMOOTH LINK BEHAVIOR (Fallback untuk browser lama)
//    Pastikan semua anchor link dengan '#' berjalan dengan smooth
// ----------------------------------------------------------------

// Ambil semua link anchor yang menuju ke ID halaman
var anchorLinks = document.querySelectorAll('a[href^="#"]');

// Loop manual untuk setiap anchor link
for (var s = 0; s < anchorLinks.length; s++) {
    anchorLinks[s].addEventListener('click', function(event) {
        // Ambil nilai href target
        var targetHref = this.getAttribute('href');

        // Abaikan jika href hanya "#" (link kosong)
        if (targetHref === '#') {
            return;
        }

        // Cari elemen target di DOM
        var targetElement = document.querySelector(targetHref);

        // Jika elemen target ditemukan
        if (targetElement) {
            // Hentikan perilaku default browser
            event.preventDefault();

            // Hitung posisi scroll dengan offset untuk navbar
            var offsetTop = targetElement.offsetTop - 80;

            // Scroll ke posisi dengan animasi smooth
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
}


// ----------------------------------------------------------------
// 9. KONSOL SAMBUTAN (Debug Info)
// ----------------------------------------------------------------
console.log('%c🚗 Tama Rent Car And Travel', 'color: #f59e0b; font-size: 18px; font-weight: bold;');
console.log('%cLanding page loaded successfully! | WA: 0812-6316-2487', 'color: #64748b;');
