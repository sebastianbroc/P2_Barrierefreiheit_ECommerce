using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace GuidelineAPI.Services;

public class AuthenticationService
{

    private readonly IConfiguration _configuration;
    
    public AuthenticationService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public string GenerateToken(AuthUser user)
    {
        var issuer = _configuration.GetValue<string>("Jwt:Issuer"); 
        var audience = _configuration.GetValue<string>("Jwt:Audience");
        var key = _configuration.GetValue<byte[]>("Jwt:Key");
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim("UserId", user.id.ToString()),
                new Claim(JwtRegisteredClaimNames.Sub, user.Username),
                new Claim(JwtRegisteredClaimNames.Email, user.Username),
                new Claim(JwtRegisteredClaimNames.Jti,
                    Guid.NewGuid().ToString())
            }),
            Expires = DateTime.UtcNow.AddMinutes(5),
            Issuer = issuer,
            Audience = audience,
            SigningCredentials = new SigningCredentials
            (new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha512Signature)
        };
        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);
        var jwtToken = tokenHandler.WriteToken(token);
        var stringToken = tokenHandler.WriteToken(token);
        return stringToken;
    }
    
    
}