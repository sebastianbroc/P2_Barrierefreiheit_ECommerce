using GuidelineAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace GuidelineAPI.Controllers;

[ApiController]
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

    [HttpGet(Name = "GetUser")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<User>))]
    public IEnumerable<User> Get()
    {
        return _service.GetAll();
    }
    
    [HttpPost(Name = "CreateUser")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(User))]
    public User Post(User user)
    {
        return _service.Create(user);
    }
    
    [HttpPut(Name = "UpdateUser")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(User))]
    public User Put(User user) 
    {
        return _service.Update(user);
    }

    [HttpDelete(Name = "DeleteUser")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(void))]
    public void Delete(Guid id)
    {
        _service.Delete(id);
    }
}