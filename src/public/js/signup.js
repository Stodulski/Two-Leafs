$(document).ready(() => {
    $(".form__submit").prop("disabled", true);

    let name = $(".form__name").val();
    let surname = $(".form__surname").val();
    let password = $(".form__password").val();
    let email = $(".form__email").val();
    if (
        email.length <= 5 ||
        password.length <= 5 ||
        name.length <= 0 ||
        surname.length <= 0
    ) {
        $(".form__submit").prop("disabled", true);
    } else $(".form__submit").prop("disabled", false);

    $("body").on("keyup", () => {
        name = $(".form__name").val();
        surname = $(".form__surname").val();
        password = $(".form__password").val();
        email = $(".form__email").val();
        if (
            email.length <= 5 ||
            password.length <= 5 ||
            name.length <= 0 ||
            surname.length <= 0
        ) {
            $(".form__submit").prop("disabled", true);
        } else $(".form__submit").prop("disabled", false);
    });
});
