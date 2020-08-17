using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using AbpXAmis.Data;
using Volo.Abp.DependencyInjection;

namespace AbpXAmis.EntityFrameworkCore
{
    public class EntityFrameworkCoreAbpXAmisDbSchemaMigrator
        : IAbpXAmisDbSchemaMigrator, ITransientDependency
    {
        private readonly IServiceProvider _serviceProvider;

        public EntityFrameworkCoreAbpXAmisDbSchemaMigrator(
            IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public async Task MigrateAsync()
        {
            /* We intentionally resolving the AbpXAmisMigrationsDbContext
             * from IServiceProvider (instead of directly injecting it)
             * to properly get the connection string of the current tenant in the
             * current scope.
             */

            await _serviceProvider
                .GetRequiredService<AbpXAmisMigrationsDbContext>()
                .Database
                .MigrateAsync();
        }
    }
}