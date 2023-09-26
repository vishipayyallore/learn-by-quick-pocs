using recaptchav3.API.Endpoints;

var builder = WebApplication.CreateBuilder(args);

const string CORSPolicy = "AllowAll";

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

_ = builder.Services.AddCors(options =>
{
    options.AddPolicy(CORSPolicy, policy => policy.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapUserEndpoints();

app.UseCors(CORSPolicy);

app.Run();
