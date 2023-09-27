namespace GuidelineAPI.Services;

public class AuthUserService: BaseService<AuthUser>, IAuthUserService {
    public AuthUserService(DBContext context) : base(context)
    {
            
    }
        
    public AuthUser? GetUser(string username)
    {
        return _context.Set<AuthUser>().FirstOrDefault( u=> u.Username == username);
    }
        
}