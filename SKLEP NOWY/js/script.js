document.addEventListener('DOMContentLoaded', () => {
    const userMenu = document.querySelector('.user-menu');
    const userMenuContent = document.querySelector('.user-menu-content');
    const loginModal = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');

    // Pokazywanie menu po najechaniu
    userMenu.addEventListener('mouseover', () => {
        userMenuContent.classList.add('show');
    });

    // Ukrywanie menu po zjechaniu
    userMenu.addEventListener('mouseleave', () => {
        userMenuContent.classList.remove('show');
    });

    // Event listenery dla przycisków Logowanie i Rejestracja w menu
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');

    //dodajemy event listenery dla buttonów w menu
    if (loginBtn) {
        loginBtn.addEventListener('click', (event) => {
            event.preventDefault();
            loginModal.classList.add('show');
        });
    }

    if (registerBtn) {
        registerBtn.addEventListener('click', (event) => {
            event.preventDefault();
            registerModal.classList.add('show');
        });
    }

    // Funkcja do inicjalizacji obsługi modali - wywoływana po każdej zmianie zakładki
    function initializeModalHandlers() {
        const closeLogin = loginModal.querySelector('#close-login');
        const closeRegister = registerModal.querySelector('#close-register');

        // Zamykanie modali
        if (closeLogin) {
            closeLogin.addEventListener('click', () => {
                loginModal.classList.remove('show');
            });
        }
        if (closeRegister) {
            closeRegister.addEventListener('click', () => {
                registerModal.classList.remove('show');
            });
        }
    }

    // Funkcja do przełączania zakładek i ładowania treści
    const loadedTabs = {}; // Obiekt do śledzenia, które zakładki zostały już załadowane

    function showTab(tabId) {
        // Ukryj wszystkie zakładki
        document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));

        // Dezaktywuj wszystkie przyciski
        document.querySelectorAll('.tab-button').forEach(button => button.classList.remove('active'));

        // Pokaż wybraną zakładkę
        const selectedTab = document.getElementById(tabId);
        if (selectedTab) {
            selectedTab.classList.add('active');
        }

        // Aktywuj przycisk wybranej zakładki
        const activeButton = document.querySelector(`.tab-button#${tabId}-tab`);
        if (activeButton) {
            activeButton.classList.add('active');
        }

        // Załaduj treść dla wybranych zakładek, jeśli jeszcze nie została załadowana
        if (!loadedTabs[tabId]) {
            if (tabId === 'reset-password') {
                fetch('przypomnij_haslo.html')
                    .then(response => response.text())
                    .then(html => {
                        document.getElementById('reset-password').innerHTML = html;
                        loadedTabs[tabId] = true; // Oznacz zakładkę jako załadowaną
                    });
            } else if (tabId === 'terms') {
                fetch('regulamin.html')
                    .then(response => response.text())
                    .then(html => {
                        document.getElementById('terms').innerHTML = html;
                        loadedTabs[tabId] = true; // Oznacz zakładkę jako załadowaną
                    });
            }
        }

        initializeModalHandlers();
    }

    // Przypisanie event listenerów do przycisków nawigacji
    document.getElementById('home-tab').addEventListener('click', () => showTab('home'));
    document.getElementById('reset-password-tab').addEventListener('click', () => showTab('reset-password'));
    document.getElementById('terms-tab').addEventListener('click', () => showTab('terms'));

    // Zainicjalizuj obsługę modali przy starcie strony
    initializeModalHandlers();

    // Pokaż pierwszą zakładkę domyślnie
    showTab('home');
});