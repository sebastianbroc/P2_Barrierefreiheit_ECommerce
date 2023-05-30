using GuidelineAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace GuidelineAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class GuidelineController : ControllerBase
{
    private readonly IGuidelineService _service;
    private readonly ILogger<CommentController> _logger;

    public GuidelineController(ILogger<CommentController> logger, IGuidelineService service)
    {
        _logger = logger;
        _service = service;
    }

    [HttpGet(Name = "GetGuideline")]
    public IEnumerable<Guideline> Get()
    {
        return _service.GetAll();
    }
    
    [HttpPost(Name = "CreateGuideline")]
    public Guideline Post(Guideline guideline)
    {
        return _service.Create(guideline);
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