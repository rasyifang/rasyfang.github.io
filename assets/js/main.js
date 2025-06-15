        function initializePage() {
            // Initialize AOS
            AOS.init({
                duration: 800,
                once: true, 
            });

            // Initialize Slick Slider
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
            
            // Gallery Modal
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

            // Form validation
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
        
        // Dark Mode Toggle Logic
        (() => {
            'use strict'

            const getStoredTheme = () => localStorage.getItem('theme')
            const setStoredTheme = theme => localStorage.setItem('theme', theme)

            const getPreferredTheme = () => {
                const storedTheme = getStoredTheme()
                if (storedTheme) {
                    return storedTheme
                }
                return 'light'
            }

            const setTheme = theme => {
                document.documentElement.setAttribute('data-bs-theme', theme)
            }

            setTheme(getPreferredTheme())

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

            window.addEventListener('DOMContentLoaded', () => {
                showActiveTheme(getPreferredTheme())

                document.querySelectorAll('[role="switch"]').forEach(toggle => {
                    toggle.addEventListener('click', (e) => {
                        const theme = e.target.checked ? 'dark' : 'light'
                        setStoredTheme(theme)
                        setTheme(theme)
                        showActiveTheme(theme)
                    })
                })
                
                if (document.readyState === 'complete') {
                    initializePage();
                } else {
                    window.addEventListener('load', initializePage);
                }
            })
        })()
