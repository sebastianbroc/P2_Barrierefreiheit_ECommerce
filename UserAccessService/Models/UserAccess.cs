namespace UserAccessService.Models;

public enum AccessRights
{
    Author,Read,Write,Delete
}

public class UserAccess : BaseModel
{

    public UserAccess(Guid id, string userId, string documentId, AccessRights[] rights) : base(id)
    {
        UserId = userId;
        DocumentId = documentId;
        Rights = rights;
    }

    public string UserId { get; set; }
    public string DocumentId { get; set; }
    public AccessRights[] Rights { get; set; }
}