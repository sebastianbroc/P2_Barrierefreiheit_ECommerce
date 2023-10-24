namespace GuidelineAPI.Services;

public interface IUserService: IBaseService<User>
{
    public List<UserDto> GetAll();
}