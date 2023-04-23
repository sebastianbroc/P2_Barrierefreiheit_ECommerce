using UserAccessService.Models;

namespace UserAccessService.Service;

public class UserAccessService : BaseService<UserAccess>, IUserAccessService
{
    public UserAccessService(DBContext context) : base(context)
    {
        
    }

    public List<UserAccess> GetAll(string userId)
    {
        return _context.UserAccesses.Where(ua => ua.UserId.Equals(userId)).ToList();
    }

    public bool CreateOrUpdate(UserAccess access, string assigningUser)
    {
        var assigningUserAccess = _context.UserAccesses.FirstOrDefault(ua =>
            ua.UserId.Equals(assigningUser) && ua.DocumentId.Equals(access.DocumentId)
        );

        if (assigningUserAccess == null || !assigningUserAccess.Rights.Contains(AccessRights.Author))
        {
            return false; 
        }
        
        var newUserAccess = _context.UserAccesses.FirstOrDefault(ua =>
            ua.UserId.Equals(access.UserId) && ua.DocumentId.Equals(access.DocumentId)
        );
        if (newUserAccess != null)
        {
            
            newUserAccess.Rights = access.Rights;
            _context.SaveChanges();
        }
        else
        {
            _context.UserAccesses.Add(access);
            _context.SaveChanges();
        }

        return true;
    }

    public UserAccess? FindDocument(string userId, string documentId)
    {
        return _context.UserAccesses.FirstOrDefault(ua =>
            ua.UserId.Equals(userId) && ua.DocumentId.Equals(documentId)
        );
    }
    
}