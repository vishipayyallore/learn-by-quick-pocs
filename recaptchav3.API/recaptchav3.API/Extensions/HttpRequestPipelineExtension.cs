using recaptchav3.API.Common;
using recaptchav3.API.Endpoints;

namespace recaptchav3.API.Extensions;

public static class HttpRequestPipelineExtension
{
    public static WebApplication ConfigureHttpRequestPipeline(this WebApplication app)
    {
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        app.MapUserEndpoints();

        app.UseCors(Constants.CORSPolicy.Name);

        return app;
    }
}
