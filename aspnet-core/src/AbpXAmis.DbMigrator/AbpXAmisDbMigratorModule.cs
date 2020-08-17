using AbpXAmis.EntityFrameworkCore;
using Volo.Abp.Autofac;
using Volo.Abp.BackgroundJobs;
using Volo.Abp.Modularity;

namespace AbpXAmis.DbMigrator
{
    [DependsOn(
        typeof(AbpAutofacModule),
        typeof(AbpXAmisEntityFrameworkCoreDbMigrationsModule),
        typeof(AbpXAmisApplicationContractsModule)
        )]
    public class AbpXAmisDbMigratorModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Configure<AbpBackgroundJobOptions>(options => options.IsJobExecutionEnabled = false);
        }
    }
}
