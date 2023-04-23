using UserAccessService.Models;

namespace UserAccessService.Service;

public class BaseService<T> : IBaseService<T> where T : BaseModel
{

    public DBContext _context;
    
    public BaseService(DBContext context)
    {
        _context = context;
    }

    public T? Get(T obj)
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

    public void Delete(T obj)
    {
        _context.Set<T>().Remove(obj);
        _context.SaveChanges();
    }

    public IServiceProvider ServiceProvider { get; }
}