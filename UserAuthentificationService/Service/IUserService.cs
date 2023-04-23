using UserAuthentificationService.Models;
namespace UserAuthentificationService.Service;

public interface IUserService : IBaseService<User>
{
    public User? GetUser(string username);
}