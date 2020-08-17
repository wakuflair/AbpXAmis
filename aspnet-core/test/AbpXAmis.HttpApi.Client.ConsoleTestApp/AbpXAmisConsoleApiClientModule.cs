using Volo.Abp.Http.Client.IdentityModel;
using Volo.Abp.Modularity;

namespace AbpXAmis.HttpApi.Client.ConsoleTestApp
{
    [DependsOn(
        typeof(AbpXAmisHttpApiClientModule),
        typeof(AbpHttpClientIdentityModelModule)
        )]
    public class AbpXAmisConsoleApiClientModule : AbpModule
    {
        
    }
}
