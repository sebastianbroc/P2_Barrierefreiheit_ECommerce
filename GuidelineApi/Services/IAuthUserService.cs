namespace GuidelineAPI.Services;

public interface IAuthUserService : IBaseService<AuthUser>
{
    public AuthUser? GetUser(string username);
}