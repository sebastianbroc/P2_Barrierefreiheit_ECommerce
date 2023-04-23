using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UserAccessService.Models;
using UserAccessService.Service;

namespace UserAccessService.Controllers;


[Authorize]
[ApiController]
[Route("[controller]")]
public class UserAccessController : ControllerBase
{
    private readonly ILogger<UserAccessController> _logger;
    private readonly IUserAccessService _service;

    public UserAccessController(ILogger<UserAccessController> logger, IUserAccessService service)
    {
        _logger = logger;
        _service = service;
    }

    [HttpGet]
    public IActionResult GetAccessList()
    {
        var accesses = _service.GetAll(User.Claims.First(i => i.Type == "UserId").Value);
        return Ok(accesses);
    }

    [HttpPost("document")]
    public IActionResult CreateDocument()
    {
        var documentId = Guid.NewGuid().ToString();

        _service.Create(new UserAccess(
            Guid.NewGuid(),
            User.Claims.First(i => i.Type == "UserId").Value,
            documentId,
            new []
            {
                AccessRights.Read,
                AccessRights.Write,
                AccessRights.Delete,
                AccessRights.Author,
            }
        ));

        return Ok(documentId);
    }
    
    [HttpPost("rights")]
    public IActionResult CreateOrUpdateAccessRight(string userId, string documentId, AccessRights[] rights)
    {
        var result = _service.CreateOrUpdate(
            new UserAccess(
                Guid.NewGuid(),
                userId, 
                documentId, 
                rights
                ),
            User.Claims.First(i => i.Type == "UserId").Value
            );
        
        return result ? Ok() : BadRequest();
    }
    
    [HttpDelete("document")]
    public IActionResult DeleteDocument(string documentId)
    {
        var document = _service.FindDocument(
            User.Claims.First(i => i.Type == "UserId").Value,
            documentId);
        if (document == null) { return BadRequest(); }
        
        _service.Delete(document);
        return Ok();
    }
    
    [HttpDelete]
    public IActionResult RemoveAccesses(string userId, string documentId)
    {
        var document = _service.FindDocument(
            User.Claims.First(i => i.Type == "UserId").Value, 
            documentId
            );
        if (document == null || !document.Rights.Contains(AccessRights.Author))
        {
            return BadRequest("You are not the author of this document");
        }
        
        var toRevokeAccess = _service.FindDocument(userId, documentId);
        if (toRevokeAccess != null)
        {
            _service.Delete(document);
        }
        
        return Ok("access revoked");
    }
    
}