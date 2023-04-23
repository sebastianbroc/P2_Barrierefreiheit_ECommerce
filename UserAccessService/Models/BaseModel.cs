namespace UserAccessService.Models;

public class BaseModel
{
    public BaseModel(Guid id)
    {
        Id = id;
    }
    public Guid Id { get; set; }
}