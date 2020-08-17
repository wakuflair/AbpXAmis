using System.Threading.Tasks;

namespace AbpXAmis.Data
{
    public interface IAbpXAmisDbSchemaMigrator
    {
        Task MigrateAsync();
    }
}
