using GuidelineAPI.Services;
using Microsoft.EntityFrameworkCore;
using System.Net;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.Configuration;

namespace GuidelineAPI
{
  public class Startup
  {

  public void Configure(IApplicationBuilder app, IConfiguration Configuration, ILoggerFactory loggerFactory)
      {
        loggerFactory.AddConsole(Configuration.GetSection("Logging"));
        loggerFactory.AddDebug();

        app.UseExceptionHandler();
        app.UseIdentity();

        // secretKey contains a secret passphrase only your server knows
        var secretKey = Configuration.GetSection("JWTSettings:SecretKey").Value;
        var issuer = Configuration.GetSection("JWTSettings:Issuer").Value;
        var audience = Configuration.GetSection("JWTSettings:Audience").Value;
        var signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secretKey));
        var tokenValidationParameters = new TokenValidationParameters
        {
          ValidateIssuerSigningKey = true,
          IssuerSigningKey = signingKey,

          // Validate the JWT Issuer (iss) claim
          ValidateIssuer = true,
          ValidIssuer = issuer,

          // Validate the JWT Audience (aud) claim
          ValidateAudience = true,
          ValidAudience = audience
        };
        app.UseJwtBearerAuthentication(new JwtBearerOptions
        {
          TokenValidationParameters = tokenValidationParameters
        });

        app.UseCookieAuthentication(new CookieAuthenticationOptions
        {
          AutomaticAuthenticate = false,
          AutomaticChallenge = false
        });
    }

    public void ConfigureServices(IServiceCollection services)
    {
      services.Configure<JWTSettings>(Configuration.GetSection("JWTSettings"));
      services.AddMvc();

      services.Configure<IdentityOptions>(options =>
      {
          // avoid redirecting REST clients on 401
          options.Cookies.ApplicationCookie.Events = new CookieAuthenticationEvents
          {
              OnRedirectToLogin = ctx =>
              {
                  ctx.Response.StatusCode = (int) HttpStatusCode.Unauthorized;
                  return Task.FromResult(0);
              }
          };
      });
    }
  }
}
