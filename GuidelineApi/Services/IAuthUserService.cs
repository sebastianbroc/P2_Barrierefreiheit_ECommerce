namespace GuidelineAPI.Services;

public interface IAuthUserService : IBaseService<User>
{
    public User? GetUser(string username);
}