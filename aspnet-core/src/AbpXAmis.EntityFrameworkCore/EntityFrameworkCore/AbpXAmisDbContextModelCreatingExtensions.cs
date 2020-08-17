using Microsoft.EntityFrameworkCore;
using Volo.Abp;

namespace AbpXAmis.EntityFrameworkCore
{
    public static class AbpXAmisDbContextModelCreatingExtensions
    {
        public static void ConfigureAbpXAmis(this ModelBuilder builder)
        {
            Check.NotNull(builder, nameof(builder));

            /* Configure your own tables/entities inside here */

            //builder.Entity<YourEntity>(b =>
            //{
            //    b.ToTable(AbpXAmisConsts.DbTablePrefix + "YourEntities", AbpXAmisConsts.DbSchema);
            //    b.ConfigureByConvention(); //auto configure for the base class props
            //    //...
            //});
        }
    }
}