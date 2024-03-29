using System.ComponentModel.DataAnnotations.Schema;

namespace GuidelineAPI;

public class Guideline : BaseModel
{
    public virtual User Author { get; set; }
    public String Text { get; set; }
    
    public String Teaser { get; set; }
    
    public virtual List<User> ApprovedBy { get; set; } 
    public virtual List<Comment> Comments { get; set; }
}

public class GuidelineDto : BaseModel
{
    public virtual GuidelineUserDto Author { get; set; }
    public String Text { get; set; }
    public virtual List<User> ApprovedBy { get; set; }
    public virtual List<GuidelineCommentDto> Comments { get; set; }
}

public class CreateGuidelineDto
{
    public Guid Author { get; set; }
    public String Text { get; set; }
}

public static class GuidelineDtoExtensions
{
    public static Guideline toGuideline(this CreateGuidelineDto guideline, User author)
    {
        return new Guideline()
        {
            Author = author,
            Text = guideline.Text,
            Comments = new(),
            id = Guid.NewGuid()
        };
    }
    
    public static GuidelineDto toGuidelineDto(this Guideline? guideline)
    {
        return new GuidelineDto()
        {
            ApprovedBy = guideline.ApprovedBy,
            Author = guideline.Author.ToGuidelineUserDto(),
            Text = guideline.Text,
            Comments = guideline.Comments.Select(c=>c.ToGuidelineCommentDto()).ToList(),
            id = guideline.id
        };
    }
}