using recaptchav3.API.Common;
using recaptchav3.API.Entities;

namespace recaptchav3.API.Extensions;

public static class ApplicationServicesExtension
{

    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
    {
        _ = services.Configure<ApplicationSettingsOptions>(configuration.GetSection(ApplicationSettingsOptions.SectionName));

        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        _ = services.AddEndpointsApiExplorer();

        _ = services.AddSwaggerGen();

        _ = services.AddCors(options =>
        {
            options.AddPolicy(Constants.CORSPolicy.Name, policy => policy.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod());
        });

        return services;
    }

}
