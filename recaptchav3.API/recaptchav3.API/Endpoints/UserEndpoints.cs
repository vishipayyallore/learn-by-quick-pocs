using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace recaptchav3.API.Endpoints;

public static class UserEndpoints
{
    public static void MapUserEndpoints(this IEndpointRouteBuilder routes)
    {

        _ = routes.MapPost("/signup", async ([FromBody] UserRegistrationDto userRegistrationDto) =>
        {

            string secretKey = "Your_Secret_Key";
            string responseToken = userRegistrationDto.RecaptchaToken;

            using var httpClient = new HttpClient();
            var content = new FormUrlEncodedContent(new[]
            {
                    new KeyValuePair<string, string>("secret", secretKey),
                    new KeyValuePair<string, string>("response", responseToken),
            });

            var response = await httpClient.PostAsync("https://www.google.com/recaptcha/api/siteverify", content);
            var captchaResponse = response.Content.ReadAsStringAsync().Result;

            // var captchaResponse = JsonSerializer.Deserialize<CaptchaResponse>(result);

            return ApiResponseDto<dynamic>.Create(captchaResponse);
        }).WithTags("Users")
          .WithName("Sign Up")
          .WithOpenApi();
    }

}


public record UserRegistrationDto(
    string Email,
    string Password,
    string ConfirmPassword,
    string Fullname,
    string RecaptchaToken);


// Define a class to deserialize the reCAPTCHA response
public class CaptchaResponse
{
    public bool Success { get; set; }
}

public record ApiResponseDto<T>
{
    public bool Success { get; set; }

    public string? Message { get; set; }

    public T? Data { get; set; }

    public static ApiResponseDto<T> Create(T? data = default, string message = "Success", bool success = true)
    {
        return new()
        {
            Success = success,
            Message = message,
            Data = data
        };
    }
}