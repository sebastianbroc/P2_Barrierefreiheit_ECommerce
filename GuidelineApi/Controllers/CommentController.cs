using GuidelineAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace GuidelineAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class CommentController : ControllerBase
{
    private readonly ICommentService _service;
    private readonly ILogger<CommentController> _logger;

    public CommentController(ILogger<CommentController> logger, ICommentService service)
    {
        _logger = logger;
        _service = service;
    }

    [HttpGet(Name = "GetComment")]
    public IEnumerable<Comment> Get()
    {
        return _service.GetAll();
    }
    
    [HttpPost(Name = "CreateComment")]
    public Comment Post(Comment comment) //TODO Make comment DTO
    {
        return _service.Create(comment);
    }
    
    [HttpPut(Name = "UpdateComment")]
    public Comment Put(Comment comment) //TODO Make comment DTO
    {
        return _service.Update(comment);
    }

    [HttpDelete(Name = "DeleteComment")]
    public void Delete(Guid id) //TODO Make response of type http result
    {
        _service.Delete(id);
    }
}