using Microsoft.EntityFrameworkCore;
using GuidelineAPI;

namespace GuidelineAPI;

public class DBContext : DbContext
{

    public DBContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Comment> Comments { get; set; }
    public DbSet<Guideline> Guidelines { get; set; }
    public DbSet<AuthUser> AuthUsers { get; set; }
    public DbSet<User> Users { get; set; }
}
