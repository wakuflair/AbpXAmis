using AbpXAmis.EntityFrameworkCore;
using Volo.Abp.Modularity;

namespace AbpXAmis
{
    [DependsOn(
        typeof(AbpXAmisEntityFrameworkCoreTestModule)
        )]
    public class AbpXAmisDomainTestModule : AbpModule
    {

    }
}