using Microsoft.EntityFrameworkCore;
using UserAccessService.Service;

namespace GuidelineAPI.Services;

public class UserService: BaseService<User>, IUserService
{
    public UserService(DBContext context) : base(context)
    {
        
    }
    
    public User? Get(Guid id)
    {
        return _context.Set<User>().Include(u => u.Guidelines).FirstOrDefault( u=> u.id == id);
    }

    
    public List<User> GetAll()
    {
        return _context.Set<User>().Include(u => u.Guidelines ).ToList();
    }
}