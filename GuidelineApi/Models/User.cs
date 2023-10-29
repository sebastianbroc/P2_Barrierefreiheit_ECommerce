namespace GuidelineAPI;

public class User : BaseModel
{
    public string Username { get; set; }
    public string Password { get; set; }
    public string? Name { get; set; }
    
    public string? LastName { get; set; }
    public string? ProfilePicture { get; set; }
    public bool? IsExpert { get; set; }
    public string? Description { get; set; }
    public string? Qualification { get; set; }
}

public class UserDto
{
    public string Username { get; set; }
    public string Name { get; set; }
    public string LastName { get; set; }
    public string ProfilePicture { get; set; }
    public bool IsExpert { get; set; }
    public string Description { get; set; }
    public string Qualification { get; set; }
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
    public static UserDto ToUserDto(this User user)
    {
        return new UserDto()
        {
            Username = user.Username,
            Name = user.Name,
            LastName = user.LastName,
            ProfilePicture = user.ProfilePicture,
            IsExpert = user.IsExpert ?? false,
            Description = user.Description,
            Qualification = user.Qualification
        };
    }
    
    public static GuidelineUserDto ToGuidelineUserDto(this User user)
    {
        return new GuidelineUserDto()
        {
            Username = user.Username,
            ProfilePicture = user.ProfilePicture,
            IsExpert = user.IsExpert ?? false
        };
    }
    
    public static CommentUserDto ToCommentUserDto(this User user)
    {
        return new CommentUserDto()
        {
            Username = user.Username,
            ProfilePicture = user.ProfilePicture,
            IsExpert = user.IsExpert ?? false
        };
    }
}