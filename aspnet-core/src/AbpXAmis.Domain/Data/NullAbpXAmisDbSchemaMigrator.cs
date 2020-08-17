using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace AbpXAmis.Data
{
    /* This is used if database provider does't define
     * IAbpXAmisDbSchemaMigrator implementation.
     */
    public class NullAbpXAmisDbSchemaMigrator : IAbpXAmisDbSchemaMigrator, ITransientDependency
    {
        public Task MigrateAsync()
        {
            return Task.CompletedTask;
        }
    }
}