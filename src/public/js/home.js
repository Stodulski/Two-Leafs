$(document).ready(() => {
    // Configuracion observador
    let configMutation = {
        attributes: true,
        childList: true,
        characterData: true,
    };

    let configIntersection = {
        rootMargin: "50%",
        threshold: 1,
    };

    // Peticion de publicaciones y SCROLL infinito.
    $.ajax({
        url: "/get/post",
        type: "POST",
        dataType: "json",
    }).done((data) => {
        let getPosts = data.post;
        let numberPosts = 3;
        let addPosts = "";
        for (let i = 0; i < numberPosts; i++) {
            if (typeof getPosts[i] != "undefined") {
                if (getPosts[i].imgOwner == data.username)
                    var postOwner = `<img src="/public/img/delete.svg" alt="Foto de ${getPosts[i].imgOwner}" class="post__delete" data-delete="${getPosts[i]._id}">`;
                else var postOwner = " ";

                if (getPosts[i].likedBy.indexOf(data.userId) >= 0)
                    var isLiked = true;
                else var isLiked = false;
                addPosts += `
                        <div class="post">
                            <div class="post__header">
                                <img src="/public/uploads/${getPosts[i].imgName}" alt="Foto de ${getPosts[i].imgOwner}" class="profile__img">
                                <span class="profile__title"><a href="${getPosts[i].imgOwner}">${getPosts[i].imgOwner}</a></span>
                                ${postOwner}
                            </div>
                            <img src="/public/uploads/${getPosts[i].imgPost}" alt="Publicacion de ${getPosts[i].imgOwner}" class="post__img">
                            <div class="post__footer">
                                <img src="/public/img/unlike.svg" class="like__button" data-id="${getPosts[i]._id}" data-liked="${isLiked}">
                                <span class="like__number"><bdi class="number" data-id="${getPosts[i]._id}like">${getPosts[i].like}</bdi> Me gusta</span>
                            </div>
                        </div>
                        `;
            }
        }

        // Cuando el ultimo post aparezca en el ViewPort, agregar mas.
        let observarUltimoPost = new IntersectionObserver(
            (entradas, observador) => {
                entradas.forEach((entradas) => {
                    if (entradas.isIntersecting) {
                        for (let i = numberPosts; i < numberPosts + 3; i++) {
                            if (typeof getPosts[i] != "undefined") {
                                if (getPosts[i].imgOwner == data.username)
                                    var postOwner = `<img src="/public/img/delete.svg" alt="Foto de ${getPosts[i].imgOwner}" class="post__delete" data-delete="${getPosts[i]._id}">`;
                                else var postOwner = " ";

                                if (
                                    getPosts[i].likedBy.indexOf(data.userId) >=
                                    0
                                )
                                    var isLiked = true;
                                else var isLiked = false;

                                addPosts = `
                                    <div class="post">
                                        <div class="post__header">
                                            <img src="/public/uploads/${getPosts[i].imgName}" alt="Foto de ${getPosts[i].imgOwner}" class="profile__img">
                                            <span class="profile__title"><a href="${getPosts[i].imgOwner}">${getPosts[i].imgOwner}</a></span>
                                            ${postOwner}
                                        </div>
                                        <img src="/public/uploads/${getPosts[i].imgPost}" alt="Publicacion de ${getPosts[i].imgOwner}" class="post__img">
                                        <div class="post__footer">
                                            <img src="/public/img/unlike.svg" class="like__button" data-id="${getPosts[i]._id}" data-liked="${isLiked}">
                                            <span class="like__number"><bdi class="number" data-id="${getPosts[i]._id}like">${getPosts[i].like}</bdi> Me gusta</span>
                                        </div>
                                    </div>
                                    `;
                                $(".posts__container").append(addPosts);
                            }
                        }
                        numberPosts += 3;
                        observarUltimoPost.unobserve(lastPost);
                        lastPost = $(".post")[$(".post").length - 1];
                        observarUltimoPost.observe(lastPost);
                    }
                });
            }
        );

        $(".posts__container").html(addPosts);
        let lastPost = $(".post")[$(".post").length - 1];
        if (typeof getPosts[0] != "undefined")
            observarUltimoPost.observe(lastPost, configIntersection);
    });

    // Observar cambios en el contenedor de las publicaciones
    let observarPosts = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.addedNodes && mutation.addedNodes.length > 0) {
                $(".post__delete").click((e) => {
                    let deleteId = e.currentTarget.getAttribute("data-delete");
                    $(`[data-delete="${deleteId}"]`).css(
                        "pointer-events",
                        "none"
                    );
                    $.ajax({
                        url: "/delete/post",
                        data: {
                            deleteId,
                        },
                        type: "DELETE",
                        dataType: "json",
                    }).done((data) => {
                        $(`[data-delete="${deleteId}"]`)
                            .parent()
                            .parent()
                            .remove();
                    });
                });

                // Verificar si un post tiene LIKE
                $(`[data-liked="true"]`).attr("src", "/public/img/like.svg");
                $(`[data-liked="false"]`).attr("src", "/public/img/unlike.svg");

                // Sistema de LIKES
                $(".like__button").click((e) => {
                    // Al apretar el boton, deshhabilitar hasta que termine la peticion.

                    let postId = e.currentTarget.getAttribute("data-id");
                    let liked = e.currentTarget.getAttribute("data-liked");
                    $(`[data-id="${postId}"]`).css("pointer-events", "none");

                    // Si la publicacion tiene LIKE, sacar LIKE
                    if (liked == "true") {
                        $(`[data-id="${postId}"]`).attr("data-liked", false);
                        $.ajax({
                            url: "/unlike/post",
                            data: {
                                postId,
                            },
                            type: "PUT",
                            dataType: "json",
                        }).done((data) => {
                            // Sacar like y restar 1 a los LIKES
                            $(`[data-id="${postId}"]`).attr(
                                "src",
                                "/public/img/unlike.svg"
                            );
                            let likes = $(`*[data-id="${data.id}like"]`).html();
                            $(`[data-id="${data.id}like"]`).html(
                                parseInt(likes) - 1
                            );
                            // Habilitar boton de LIKES
                            $(`[data-id="${postId}"]`).css(
                                "pointer-events",
                                "unset"
                            );
                        });
                    }

                    // Si la publicacion no tiene LIKE, dar LIKE
                    if (liked == "false") {
                        $(`[data-id="${postId}"]`).attr("data-liked", true);
                        $.ajax({
                            url: "/like/post",
                            data: {
                                postId,
                            },
                            type: "PUT",
                            dataType: "json",
                        }).done((data) => {
                            // Dar like y sumar 1 a los LIKES
                            $(`[data-id="${postId}"]`).attr(
                                "src",
                                "/public/img/like.svg"
                            );
                            let likes = $(`*[data-id="${data.id}like"]`).html();
                            $(`[data-id="${data.id}like"]`).html(
                                parseInt(likes) + 1
                            );
                            // Habilitar boton de LIKES
                            $(`[data-id="${postId}"]`).css(
                                "pointer-events",
                                "unset"
                            );
                        });
                    }
                });
            }
        });
    });

    let container = $(".posts__container");
    observarPosts.observe(container[0], configMutation);

    // Hasta que no haya una imagen seleccionada no habilitar el boton de enviar.
    $(".form__submit").prop("disabled", true);
    $(".file").change(() => {
        $(".file__help").html("Imagen seleccionada");
        $(".form__submit").prop("disabled", false).css("cursor", "pointer");
    });
    $(".form__submit").click(() => {
        $("*").css("cursor", "wait");
        $(".form__submit").css("pointer-events", "none");
    });

    // buscador
    $(".search__input").keyup(() => {
        let search = $(".search__input").val();
        $.ajax({
            url: "/search/user",
            data: {
                search,
            },
            type: "POST",
            dataType: "json",
        }).done((data) => {
            var searched = "";
            if (Array.isArray(data.sendUsers)) {
                for (let i = 0; i < data.sendUsers.length; i++)
                    searched += `<a href="${data.sendUsers[i][0].username}" class="find__item"><span>${data.sendUsers[i][0].name}</span></a>`;
            } else
                searched += `<a href="#" class="find__item"><span>${data.sendUsers}</span></a>`;

            $(".search__find").html(searched);
            $(".search__find").css("display", "flex");
            if (search[0] == " " || search.length == 0)
                $(".search__find").html(" ");
        });
    });
});
