using Microsoft.EntityFrameworkCore;
using UserAccessService.Models;

namespace UserAccessService;

public class DBContext : DbContext
{

    public DBContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<UserAccess> UserAccesses { get; set; }
}
