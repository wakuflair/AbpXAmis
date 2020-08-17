using Volo.Abp.Modularity;

namespace AbpXAmis
{
    [DependsOn(
        typeof(AbpXAmisApplicationModule),
        typeof(AbpXAmisDomainTestModule)
        )]
    public class AbpXAmisApplicationTestModule : AbpModule
    {

    }
}