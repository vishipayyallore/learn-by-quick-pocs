namespace recaptchav3.API.Entities;

public class ApplicationSettingsOptions
{
    public const string SectionName = "ApplicationSettings";

    public string? ReCaptchaSecretKey { get; set; }
}
