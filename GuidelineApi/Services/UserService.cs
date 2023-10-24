using Microsoft.EntityFrameworkCore;

namespace GuidelineAPI.Services;

public class UserService: BaseService<User>, IUserService
{
    public UserService(DBContext context) : base(context)
    {
        
    }

    public List<UserDto> GetAll()
    {
        return _context.Set<User>().Select(user=>user.ToUserDto()).ToList(); //.Include(u => u.Guidelines ).ToList();
    }
}