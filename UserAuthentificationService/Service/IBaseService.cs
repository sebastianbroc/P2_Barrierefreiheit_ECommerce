using UserAuthentificationService.Models;

namespace UserAuthentificationService.Service;

public interface IBaseService<T> where T : BaseModel
{
    public List<T> GetAll();

    public T Create(T obj);

    public void Delete(T obj);
}