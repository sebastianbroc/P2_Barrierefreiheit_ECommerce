namespace GuidelineAPI;

public class Comment : BaseModel
{
    public User WrittenBy { get; set; }
    public string Text { get; set; }
    public int UpVotes { get; set; }
    public int DownVotes { get; set; }
}