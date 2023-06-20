using GuidelineAPI;

namespace UserAccessService.Service;

public class BaseService<T> : IBaseService<T> where T : BaseModel
{

    public DBContext _context;
    
    public BaseService(DBContext context)
    {
        _context = context;
    }

    public T? Get(Guid obj)
    {
        return _context.Set<T>().Find(obj);
    }

    public List<T> GetAll()
    {
        return _context.Set<T>().ToList();
    }
    
    public T Create(T obj)
    {
        _context.Set<T>().Add(obj);
        _context.SaveChanges();
        return obj;
    }

    public T Update(T obj)
    {
        _context.Set<T>().Update(obj);
        _context.SaveChanges();
        return obj;
    }

    public bool Delete(Guid id)
    {
        var toDelete = _context.Set<T>().FirstOrDefault(t => t.id == id);
        if (toDelete == null)
        {
            return false;
        }
        _context.Set<T>().Remove(toDelete);
        _context.SaveChanges();
        return true;
    }

    public IServiceProvider ServiceProvider { get; }
}