$(document).ready(function () {
    $("#search-input").on("input", function () {
        let query = $(this).val().trim();
        if (query.length > 2) {
            $.ajax({
                url: `https://api.deezer.com/search?q=${query}&output=jsonp`,
                dataType: "jsonp",
                success: function (response) {
                    renderSongList(response);
                },
                error: function () {
                    console.error("Error al obtener datos de Deezer");
                }
            });
            $("#song-list").show();
        }
    });

    function renderSongList(response) {
        let songs = response.data;
        let songList = $("#song-list");
        songList.empty();
        songs.forEach(track => {
            let listItem = $(`<li class='list-group-item list-group-item-action'>${track.artist.name} - ${track.title}</li>`);
            listItem.on("click", function () {
                playSong(track);
                songList.hide();
                $("#search-input").val("");
            });
            songList.append(listItem);
        });
    }

    function playSong(track) {
        $("#song-title").text(`${track.artist.name} - ${track.title}`);
        $("#song-cover").attr("src", track.album.cover_medium);
        $("#audio-source").attr("src", track.preview);
        $("#audio-player")[0].load();
        $("#audio-player")[0].play();
    }
});




//footer scroll

document.addEventListener("DOMContentLoaded", () => {
    let lastScrollTop = 0;
    const footer = document.querySelector(".footer");

    window.addEventListener("scroll", () => {
        let scrollTop = window.scrollY || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            // Scroll hacia abajo -> Oculta el footer
            footer.classList.add("hidden-footer");
        } else {
            // Scroll hacia arriba o se detiene -> Muestra el footer
            footer.classList.remove("hidden-footer");
        }

        lastScrollTop = scrollTop;
    });
});





document.addEventListener("DOMContentLoaded", () => {
    const auth = firebase.auth();
    const loginBtn = document.getElementById("login-btn");
    const loginModal = document.getElementById("login-modal");
    const closeModal = document.querySelector(".close");
    const loginUser = document.getElementById("login-user");
    const googleLogin = document.getElementById("google-login");

    // Mostrar el modal de login
    loginBtn.addEventListener("click", () => {
        loginModal.style.display = "block";
    });

    // Cerrar el modal
    closeModal.addEventListener("click", () => {
        loginModal.style.display = "none";
    });

    // Autenticación con Email/Contraseña
    loginUser.addEventListener("click", () => {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        auth.signInWithEmailAndPassword(email, password)
            .then(userCredential => {
                alert("Inicio de sesión exitoso");
                loginModal.style.display = "none";
            })
            .catch(error => {
                alert("Error: " + error.message);
            });
    });

    // Autenticación con Google
    googleLogin.addEventListener("click", () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider)
            .then(result => {
                alert("Inicio de sesión con Google exitoso");
                loginModal.style.display = "none";
            })
            .catch(error => {
                alert("Error: " + error.message);
            });
    });
});
