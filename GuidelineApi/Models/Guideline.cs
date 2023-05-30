namespace GuidelineAPI;

public class Guideline : BaseModel
{
    public Guid Author { get; set; }
    
    public String Text { get; set; }
    
    public List<Guid> ApprovedBy { get; set; }
    public List<Comment> Comments { get; set; }
    
}