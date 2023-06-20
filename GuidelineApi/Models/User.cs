namespace GuidelineAPI;

public class User : BaseModel
{
    public string Username { get; set; }
    public string Name { get; set; }
    public string LastName { get; set; }
    public string ProfilePicture { get; set; }
    public bool IsExpert { get; set; }
    public string Description { get; set; }
    public string Qualification { get; set; }
    public List<Guideline> Guidelines { get; set; }

}

public class GuidelineUserDto
{
    public string Username { get; set; }
    public string ProfilePicture { get; set; }
    public bool IsExpert { get; set; }
}

public class CommentUserDto
{
    public string Username { get; set; }
    public string ProfilePicture { get; set; }
    public bool IsExpert { get; set; }
}

public static class UserDtoExtensions
{
    public static GuidelineUserDto ToGuidelineUserDto(this User user)
    {
        return new GuidelineUserDto()
        {
            Username = user.Username,
            ProfilePicture = user.ProfilePicture,
            IsExpert = user.IsExpert
        };
    }
    
    public static CommentUserDto ToCommentUserDto(this User user)
    {
        return new CommentUserDto()
        {
            Username = user.Username,
            ProfilePicture = user.ProfilePicture,
            IsExpert = user.IsExpert
        };
    }
}