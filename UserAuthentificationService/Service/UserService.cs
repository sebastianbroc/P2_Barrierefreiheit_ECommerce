using UserAuthentificationService.Models;

namespace UserAuthentificationService.Service;

public class UserService : BaseService<User>, IUserService
{
    public UserService(DBContext context) : base(context)
    {
    }

    public User? GetUser(string username)
    {
        return _context.Users.FirstOrDefault(u => u.Username == username);
    }
}