using UserAccessService.Models;

namespace UserAccessService.Service;

public interface IUserAccessService : IBaseService<UserAccess>
{
    public List<UserAccess> GetAll(string userId);
    public bool CreateOrUpdate(UserAccess access, string assigningUser);
    public UserAccess? FindDocument(string userId, string documentId);
}