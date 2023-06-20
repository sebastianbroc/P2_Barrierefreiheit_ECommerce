using GuidelineAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace GuidelineAPI.Controllers;

[ApiController]
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

    [HttpGet("GetAll",Name = "GetGuidelines")]
    public IEnumerable<Guideline> Get()
    {
        return _service.GetAll();
    }
    
    [HttpGet("GetById",Name = "GetGuideline")]
    public GuidelineDto? GetOne(Guid id)
    {
        return _service.Get(id);
    }
    
    [HttpPost(Name = "CreateGuideline")]
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
    public Guideline Put(Guideline guideline) 
    {
        return _service.Update(guideline);
    }

    [HttpDelete(Name = "DeleteGuideline")]
    public void Delete(Guid id)
    {
        _service.Delete(id);
    }
}