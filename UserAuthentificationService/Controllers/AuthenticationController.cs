using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UserAuthentificationService.Service;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using UserAuthentificationService.Models;
using IConfiguration = Microsoft.Extensions.Configuration.IConfiguration;

namespace UserAuthentificationService.Controllers;

[Authorize]
[ApiController]
[Route("auth")]
public class AuthentificationController : ControllerBase
{

    private readonly ILogger<AuthentificationController> _logger;
    private readonly IUserService _service;
    private readonly IConfiguration _configuration;
    private readonly AuthenticationService _authenticationService;

    public AuthentificationController(
        ILogger<AuthentificationController> logger, 
        IUserService service, 
        IConfiguration configuration, 
        AuthenticationService authenticationService
        )
    {
        _logger = logger;
        _service = service;
        _configuration = configuration;
        _authenticationService = authenticationService;
    }

    [AllowAnonymous]
    [HttpPost( "register")]
    public User? Register(string username, string password)
    {
        
        var hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
            password: password,
            salt: _configuration.GetValue<byte[]>("SALT") ?? throw new InvalidOperationException(),
            prf: KeyDerivationPrf.HMACSHA256,
            iterationCount: 100000,
            numBytesRequested: 256 / 8));

        return _service.GetUser(username) != null ? null : _service.Create(new User(Guid.NewGuid(), username, hashed));
    }
    
    [AllowAnonymous]
    [HttpPost( "login")]
    public IActionResult Login(string username, string password)
    {
        var hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
            password: password,
            salt: _configuration.GetValue<byte[]>("SALT") ?? throw new InvalidOperationException(),
            prf: KeyDerivationPrf.HMACSHA256,
            iterationCount: 100000,
            numBytesRequested: 256 / 8));
        
        var user = _service.GetUser(username);
        if (user != null && user.Password == hashed)
        {
            return Ok(_authenticationService.GenerateToken(user));
        }

        return BadRequest();
    }

    [HttpGet("isLoggedIn")]
    public bool IsLoggedIn()
    {
        return true;
    }
    
    [HttpDelete("delete")]
    public IActionResult Delete(User request)
    {
        var hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
            password: request.Password,
            salt: _configuration.GetValue<byte[]>("SALT") ?? throw new InvalidOperationException(),
            prf: KeyDerivationPrf.HMACSHA256,
            iterationCount: 100000,
            numBytesRequested: 256 / 8));
        
        var user = _service.GetUser(request.Username);
        if (user == null || user.Password != hashed) return BadRequest();
        
        _service.Delete(user);
        return Ok();

    }
    
}