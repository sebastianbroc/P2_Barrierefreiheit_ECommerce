using GuidelineAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GuidelineAPI.Controllers;

[ApiController]
[Authorize]
[Route("[controller]")]
public class GuidelineController : ControllerBase
{
    private readonly IGuidelineService _service;
    private readonly IUserService _userService;
    private readonly ILogger<CommentController> _logger;

    public GuidelineController(ILogger<CommentController> logger, IGuidelineService service, IUserService userService)
    {
        _logger = logger;
        _service = service;
        _userService = userService;
    }

    [AllowAnonymous]
    [HttpGet("GetAll",Name = "GetGuidelines")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<GuidelineDto>))]
    public IEnumerable<GuidelineDto> Get()
    {
        return _service.GetAll();
    }
    
    [AllowAnonymous]
    [HttpGet("GetById",Name = "GetGuideline")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(GuidelineDto))]
    public GuidelineDto? GetOne(Guid id)
    {
        return _service.Get(id);
    }
    
    [HttpPost(Name = "CreateGuideline")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Guideline))]
    public Guideline Post(CreateGuidelineDto guideline)
    {
        var user = _userService.Get(guideline.Author);
        if (user == null)
        {
            return null; //TODO add status codes here
        }
        return _service.Create(guideline.toGuideline(user));
    }
    
    [HttpPut(Name = "UpdateGuideline")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(GuidelineDto))]
    public Guideline Put(Guideline guideline) 
    {
        return _service.Update(guideline);
    }

    [HttpDelete(Name = "DeleteGuideline")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(void))]
    public void Delete(Guid id)
    {
        _service.Delete(id);
    }
}