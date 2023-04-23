using UserAuthentificationService.Models;

namespace UserAuthentificationService.Service;

public class BaseService<T> : IBaseService<T> where T : BaseModel
{
    protected readonly DBContext _context;
    
    public BaseService(DBContext context)
    {
        _context = context;
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
}