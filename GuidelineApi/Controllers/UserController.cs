using GuidelineAPI.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GuidelineAPI.Controllers;

[ApiController]
[Authorize]
[Route("[controller]")]
public class UserController: ControllerBase
{
    private readonly IUserService _service;
    private readonly ILogger<UserController> _logger;

    public UserController(ILogger<UserController> logger, IUserService service)
    {
        _logger = logger;
        _service = service;
    }
    
    [AllowAnonymous]
    [HttpGet(Name = "GetUser")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<UserDto>))]
    public IEnumerable<UserDto> Get()
    {
        return _service.GetAll();
    }
    
    [HttpPut(Name = "UpdateUser")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(User))]
    public ActionResult<User> Put(User user) 
    {
        var userId = HttpContext.User.Claims.First(i => i.Type == "UserId").Value;
        if (user.id.Equals(Guid.Parse(userId)))
        {
            return Ok(_service.Update(user));
        }

        return BadRequest("");
    }

    [HttpDelete(Name = "DeleteUser")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(void))]
    public ActionResult Delete(Guid id)
    {
        var userId = User.Claims.First(i => i.Type == "UserId").Value;
        if (id.Equals(Guid.Parse(userId)))
        {
            return _service.Delete(id) ? Ok() : UnprocessableEntity();
        }

        return BadRequest("");
    }
}