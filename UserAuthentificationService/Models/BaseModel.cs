namespace UserAuthentificationService.Models;

public class BaseModel {
    public BaseModel(Guid id)
    {
        this.Id = id;
    }

    public Guid Id { get; set; }
}