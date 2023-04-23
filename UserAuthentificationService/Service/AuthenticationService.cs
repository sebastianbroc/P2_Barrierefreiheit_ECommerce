using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using UserAuthentificationService.Models;

namespace UserAuthentificationService.Service;

public class AuthenticationService
{

    private readonly IConfiguration _configuration;
    
    public AuthenticationService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public string GenerateToken(User user)
    {
        var issuer = _configuration.GetValue<string>("Jwt:Issuer"); 
        var audience = _configuration.GetValue<string>("Jwt:Audience");
        var key = Encoding.ASCII.GetBytes(_configuration.GetValue<string>("Jwt:Key")!);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim("UserId", user.Id.ToString()),
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