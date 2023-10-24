namespace GuidelineAPI.Services;

public class AuthUserService: BaseService<User>, IAuthUserService {
    public AuthUserService(DBContext context) : base(context)
    {
            
    }
        
    public User? GetUser(string username)
    {
        return _context.Set<User>().FirstOrDefault( u=> u.Username == username);
    }
        
}