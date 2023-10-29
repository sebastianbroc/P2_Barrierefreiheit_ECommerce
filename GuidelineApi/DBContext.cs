using Microsoft.EntityFrameworkCore;
using GuidelineAPI;

namespace GuidelineAPI;

public class DBContext : DbContext
{

    public DBContext(DbContextOptions options, ILogger<DBContext> logger) : base(options)
    {
        if (!Database.IsInMemory())
        {
            logger.LogDebug("Migrate");
            Database.Migrate();
        }
    }

    public DbSet<Comment> Comments { get; set; }
    public DbSet<Guideline> Guidelines { get; set; }
    public DbSet<User> Users { get; set; }
}
