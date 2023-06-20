using Microsoft.EntityFrameworkCore;
using UserAccessService.Service;

namespace GuidelineAPI.Services;

public class GuidelineService : BaseService<Guideline>, IGuidelineService
{
    public GuidelineService(DBContext context) : base(context)
    {
    }
    
    public GuidelineDto? Get(Guid id)
    {
        return _context.Set<Guideline>()
            .Include(g => g.Comments)
            .Include(g => g.Author)
            .FirstOrDefault( g=> g.id == id).toGuidelineDto();
    }

    public List<Guideline> GetAll()
    {
        return _context.Set<Guideline>().Include(g => g.Comments).ToList();
    }
} 