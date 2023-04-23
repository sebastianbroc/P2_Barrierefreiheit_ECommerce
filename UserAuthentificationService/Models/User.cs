namespace UserAuthentificationService.Models;

public class User : BaseModel
{
    public User(Guid id, string username, string password) : base(id)
    {
        Username = username;
        Password = password;
    }

    public string Username { get; set; }
    public string Password { get; set; }
}

