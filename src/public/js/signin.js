$(document).ready(() => {
    $(".form__submit").prop("disabled", true);

    let password = $(".form__password").val();
    let email = $(".form__email").val();

    if (email.length <= 0 || password.length <= 0) {
        $(".form__submit").prop("disabled", true);
    } else $(".form__submit").prop("disabled", false);

    $("body").on("keyup", () => {
        password = $(".form__password").val();
        email = $(".form__email").val();
        if (email.length <= 0 || password.length <= 0) {
            $(".form__submit").prop("disabled", true);
        } else $(".form__submit").prop("disabled", false);
    });
});
