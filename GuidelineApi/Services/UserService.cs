using Microsoft.EntityFrameworkCore;

namespace GuidelineAPI.Services;

public class UserService: BaseService<User>, IUserService
{
    public UserService(DBContext context) : base(context)
    {
        
    }

    public List<User> GetAll()
    {
        return _context.Set<User>().Include(u => u.Guidelines ).ToList();
    }
}