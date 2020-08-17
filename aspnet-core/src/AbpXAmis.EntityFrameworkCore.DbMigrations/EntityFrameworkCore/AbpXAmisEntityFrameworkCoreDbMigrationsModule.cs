using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.Modularity;

namespace AbpXAmis.EntityFrameworkCore
{
    [DependsOn(
        typeof(AbpXAmisEntityFrameworkCoreModule)
        )]
    public class AbpXAmisEntityFrameworkCoreDbMigrationsModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            context.Services.AddAbpDbContext<AbpXAmisMigrationsDbContext>();
        }
    }
}
