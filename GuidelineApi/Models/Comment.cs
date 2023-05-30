namespace GuidelineAPI;

public class Comment : BaseModel
{
    public Guid UserId { get; set; }
    public string Text { get; set; }
    public int UpVotes { get; set; }
    public int DownVotes { get; set; }
}