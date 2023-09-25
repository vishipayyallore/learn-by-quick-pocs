namespace recaptchav3.API.Dtos;

public record UserRegistrationDto(
    string Email,
    string Password,
    string ConfirmPassword,
    string Fullname,
    string RecaptchaToken);
