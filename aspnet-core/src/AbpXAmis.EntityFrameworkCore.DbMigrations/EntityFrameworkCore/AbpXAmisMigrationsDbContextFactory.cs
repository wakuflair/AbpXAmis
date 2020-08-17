using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace AbpXAmis.EntityFrameworkCore
{
    /* This class is needed for EF Core console commands
     * (like Add-Migration and Update-Database commands) */
    public class AbpXAmisMigrationsDbContextFactory : IDesignTimeDbContextFactory<AbpXAmisMigrationsDbContext>
    {
        public AbpXAmisMigrationsDbContext CreateDbContext(string[] args)
        {
            AbpXAmisEfCoreEntityExtensionMappings.Configure();

            var configuration = BuildConfiguration();

            var builder = new DbContextOptionsBuilder<AbpXAmisMigrationsDbContext>()
                .UseSqlServer(configuration.GetConnectionString("Default"));

            return new AbpXAmisMigrationsDbContext(builder.Options);
        }

        private static IConfigurationRoot BuildConfiguration()
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: false);

            return builder.Build();
        }
    }
}
