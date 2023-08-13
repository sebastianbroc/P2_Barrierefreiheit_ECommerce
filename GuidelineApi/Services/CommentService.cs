namespace GuidelineAPI.Services;

public class CommentService : BaseService<Comment>, ICommentService
{
    public CommentService(DBContext context) : base(context)
    {
    }
    
} 