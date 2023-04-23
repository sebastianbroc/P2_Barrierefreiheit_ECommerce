using Microsoft.EntityFrameworkCore;
using UserAuthentificationService.Models;

namespace UserAuthentificationService;

public class DBContext : DbContext
{

    public DBContext(DbContextOptions options) : base(options)
    {
        
    }

    public DbSet<User> Users { get; set; }
}
