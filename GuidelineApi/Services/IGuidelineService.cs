using UserAccessService.Service;

namespace GuidelineAPI.Services;

public interface IGuidelineService : IBaseService<Guideline>
{

    public GuidelineDto? Get(Guid id);
    public List<GuidelineDto> GetAll();
}