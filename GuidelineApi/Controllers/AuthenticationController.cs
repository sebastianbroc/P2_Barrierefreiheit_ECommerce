using System.Text;
using GuidelineAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using IConfiguration = Microsoft.Extensions.Configuration.IConfiguration;

namespace GuidelineAPI.Controllers;

[Authorize]
[ApiController]
[Route("auth")]
public class AuthentificationController : ControllerBase
{

    private readonly ILogger<AuthentificationController> _logger;
    private readonly IAuthUserService _service;
    private readonly IConfiguration _configuration;
    private readonly AuthenticationService _authenticationService;

    public AuthentificationController(
        ILogger<AuthentificationController> logger, 
        IAuthUserService service, 
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
    public IActionResult Register(UserRegisterDto user)
    {
        
        var hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
            password: user.Password,
            salt: _configuration.GetValue<byte[]>("SALT") ?? throw new InvalidOperationException(),
            prf: KeyDerivationPrf.HMACSHA256,
            iterationCount: 100000,
            numBytesRequested: 256 / 8));

        return _service.GetUser(user.Username) != null ? BadRequest(null) : Ok(_service.Create(new User()
        {
            id = Guid.NewGuid(),
            Username = user.Username,
            Password = hashed
        }).ToUserDto());
    }
    
    [AllowAnonymous]
    [HttpPost( "login")]
    public IActionResult Login(UserLoginDto userLogin)
    {
        var hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
            password: userLogin.Password,
            salt: _configuration.GetValue<byte[]>("SALT") ?? throw new InvalidOperationException(),
            prf: KeyDerivationPrf.HMACSHA256,
            iterationCount: 100000,
            numBytesRequested: 256 / 8));
        
        var user = _service.GetUser(userLogin.Username);
        if (user != null && user.Password == hashed)
        {
            return Ok( new UserLoginResponseDto()
            {
                Token = _authenticationService.GenerateToken(user),
                User = user
            });
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
        
        _service.Delete(user.id);
        return Ok();

    }
    
}