namespace recaptchav3.API.Common;

public static class Constants
{
    public static class UserEndpoints
    {
        public static string SignUp { get; } = "/signup";
    }

    public static class CORSPolicy
    {
        public static string Name { get; } = "AllowAll";
    }
}
