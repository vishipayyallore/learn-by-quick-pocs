using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using recaptchav3.API.Common;
using recaptchav3.API.Dtos;
using recaptchav3.API.Entities;

namespace recaptchav3.API.Endpoints;

public static class UserEndpoints
{
    public static void MapUserEndpoints(this IEndpointRouteBuilder routes)
    {

        _ = routes.MapPost(Constants.UserEndpoints.SignUp, async ([FromBody] UserRegistrationDto userRegistrationDto, [FromServices] IOptions<ApplicationSettingsOptions> configuration) =>
        {
            string secretKey = configuration?.Value?.ReCaptchaSecretKey!;
            string responseToken = userRegistrationDto.RecaptchaToken;

            using var httpClient = new HttpClient();
            var content = new FormUrlEncodedContent(new[]
            {
                    new KeyValuePair<string, string>("secret", secretKey),
                    new KeyValuePair<string, string>("response", responseToken),
            });

            var response = await httpClient.PostAsync("https://www.google.com/recaptcha/api/siteverify", content);
            var captchaResponse = response.Content.ReadAsStringAsync().Result;

            return ApiResponseDto<dynamic>.Create(captchaResponse);
        }).WithTags("Users")
          .WithName("Sign Up")
          .WithOpenApi();
    }

}
