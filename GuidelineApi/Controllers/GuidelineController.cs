using Microsoft.AspNetCore.Mvc;

namespace GuidelineAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class GuidelineController : ControllerBase
{
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    private readonly ILogger<GuidelineController> _logger;

    public GuidelineController(ILogger<GuidelineController> logger)
    {
        _logger = logger;
    }

    [HttpGet(Name = "GetGuideline")]
    public IEnumerable<Guideline> Get()
    {
        return Enumerable.Range(1, 5).Select(index => new Guideline
            {
                Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
    }
}