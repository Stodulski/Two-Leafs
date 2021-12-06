$(document).ready(() => {
    $(".header__menu").click(() => {
        let menuToggled = $(".menu").css("display");
        if (menuToggled == "flex") {
            $(".menu").css("display", "none");
        } else {
            $(".menu").css("display", "flex");
        }
    });
});
