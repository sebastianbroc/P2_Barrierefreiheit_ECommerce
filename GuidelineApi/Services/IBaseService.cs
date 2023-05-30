using GuidelineAPI;

namespace UserAccessService.Service;

public interface IBaseService<T> where T : BaseModel
{
    public List<T> GetAll();

    public T? Get(T obj);

    public T Create(T obj);
    
    public T Update(T obj);

    public bool Delete(Guid id);
}