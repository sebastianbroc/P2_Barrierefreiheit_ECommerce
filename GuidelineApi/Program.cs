using System.Reflection;
using System.Text;
using System.Text.Json.Serialization;
using GuidelineAPI;
using GuidelineAPI.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Server.HttpSys;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);
bool isDevelopment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development";

builder.Configuration.AddUserSecrets(Assembly.GetCallingAssembly());


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<ICommentService, CommentService>();
builder.Services.AddScoped<IGuidelineService, GuidelineService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IAuthUserService, AuthUserService>();
builder.Services.AddSingleton<AuthenticationService>();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(o =>
{
    o.TokenValidationParameters = new TokenValidationParameters
    {
        ValidIssuer = builder.Configuration["Jwt_Issuer"],
        ValidAudience = builder.Configuration["Jwt_Audience"],
        IssuerSigningKey = new SymmetricSecurityKey
            (Encoding.UTF8.GetBytes(builder.Configuration["Jwt_Key"] ?? throw new InvalidOperationException())),
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = false,
        ValidateIssuerSigningKey = false,
    };
    //o.Authority = builder.Configuration["Jwt_Issuer"];
    o.Audience = builder.Configuration["Jwt_Audience"];
    o.RequireHttpsMetadata = false;
    
});


if (isDevelopment)
{
    builder.Services.AddDbContext<DBContext>(options => options.UseInMemoryDatabase("GuidelineAPI"));
}
else
{
    builder.Services.AddDbContext<DBContext>(options =>
        options.UseNpgsql(builder.Configuration.GetConnectionString("DB_CONN") ?? builder.Configuration["DB_CONN"]));
}

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "cors_policy",
        policy  =>
        {
            policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
        });
});


builder.Services.AddControllers().AddJsonOptions(x =>
    x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("cors_policy");

app.UseHttpsRedirection();

app.UseAuthentication();  
app.UseAuthorization();  

app.MapControllers();

app.Run();