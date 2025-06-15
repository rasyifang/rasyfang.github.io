/**
 * Fungsi untuk menginisialisasi semua library dan event listener setelah halaman siap.
 * Mencakup AOS (animasi saat gulir), Slick Slider (galeri), modal, dan validasi form.
 */
function initializePage() {
    // Inisialisasi AOS (Animate On Scroll)
    AOS.init({
        duration: 800, // Durasi animasi dalam milidetik
        once: true,    // Apakah animasi hanya berjalan sekali
    });

    // Inisialisasi Slick Slider untuk galeri
    $('.gallery-slider').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            { breakpoint: 992, settings: { slidesToShow: 2, slidesToScroll: 1 } },
            { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } }
        ]
    });
    
    // Logika untuk menampilkan gambar pada modal galeri
    const galleryModal = document.getElementById('galleryModal');
    if(galleryModal) {
        galleryModal.addEventListener('show.bs.modal', function (event) {
            const button = event.relatedTarget;
            const imgSrc = button.getAttribute('data-img');
            const modalImage = galleryModal.querySelector('#modalImage');
            modalImage.setAttribute('src', imgSrc);
            modalImage.setAttribute('alt', button.querySelector('img').getAttribute('alt') || 'Gambar Galeri');
        });
    }

    // Logika untuk validasi form Bootstrap
    const forms = document.querySelectorAll('.needs-validation')
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
        }
        form.classList.add('was-validated')
        }, false)
    })
}

/**
 * Logika untuk Dark Mode (Mode Gelap)
 * Menggunakan IIFE (Immediately Invoked Function Expression) untuk menjaga scope.
 */
(() => {
    'use strict'

    // Fungsi untuk mendapatkan tema dari local storage
    const getStoredTheme = () => localStorage.getItem('theme')
    // Fungsi untuk menyimpan tema ke local storage
    const setStoredTheme = theme => localStorage.setItem('theme', theme)

    // Fungsi untuk menentukan tema yang akan digunakan (prioritas dari local storage)
    const getPreferredTheme = () => {
        const storedTheme = getStoredTheme()
        if (storedTheme) {
            return storedTheme
        }
        // Tema default jika tidak ada di local storage
        return 'light'
    }

    // Fungsi untuk menerapkan tema ke elemen <html>
    const setTheme = theme => {
        document.documentElement.setAttribute('data-bs-theme', theme)
    }

    // Terapkan tema yang dipilih saat halaman pertama kali dimuat
    setTheme(getPreferredTheme())

    // Fungsi untuk menampilkan status aktif pada tombol toggle tema
    const showActiveTheme = (theme) => {
        const togglerDesktop = document.querySelector('#theme-toggle-desktop')
        const togglerMobile = document.querySelector('#theme-toggle-mobile')
        if (!togglerDesktop || !togglerMobile) {
            return
        }
        const isDark = theme === 'dark'
        togglerDesktop.checked = isDark
        togglerMobile.checked = isDark
    }

    // =========================================================================
    // BLOK UTAMA YANG DIPERBAIKI
    // Menggunakan 'DOMContentLoaded' agar script berjalan lebih cepat tanpa
    // menunggu semua gambar dan iframe selesai dimuat.
    // =========================================================================
    window.addEventListener('DOMContentLoaded', () => {
        // Tampilkan status tema pada tombol toggle
        showActiveTheme(getPreferredTheme());

        // Tambahkan event listener untuk setiap tombol toggle tema
        document.querySelectorAll('[role="switch"]').forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                const theme = e.target.checked ? 'dark' : 'light';
                setStoredTheme(theme);
                setTheme(theme);
                showActiveTheme(theme);
            });
        });
        
        // Inisialisasi semua fungsi utama (animasi, slider, dll.)
        initializePage();
    });
})()
