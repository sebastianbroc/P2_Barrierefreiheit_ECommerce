namespace GuidelineAPI;

public class Comment : BaseModel
{
    public User WrittenBy { get; set; }
    public string Text { get; set; }
    public int UpVotes { get; set; }
    public int DownVotes { get; set; }
}

public class GuidelineCommentDto
{
    public CommentUserDto WrittenBy { get; set; }
    public string Text { get; set; }
    public int UpVotes { get; set; }
    public int DownVotes { get; set; }
}

public static class CommentDtoExtensions{
    public static GuidelineCommentDto ToGuidelineCommentDto(this Comment comment)
    {
        return new GuidelineCommentDto()
        {
            WrittenBy = comment.WrittenBy.ToCommentUserDto(),
            Text = comment.Text,
            UpVotes = comment.UpVotes,
            DownVotes = comment.DownVotes
        };
    }
}