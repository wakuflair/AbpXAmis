using System.Threading.Tasks;
using AbpXAmis.Permissions;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Localization;
using AbpXAmis.Localization;
using AbpXAmis.MultiTenancy;
using Volo.Abp.TenantManagement.Web.Navigation;
using Volo.Abp.UI.Navigation;

namespace AbpXAmis.Web.Menus
{
    public class AbpXAmisMenuContributor : IMenuContributor
    {
        public async Task ConfigureMenuAsync(MenuConfigurationContext context)
        {
            if (context.Menu.Name == StandardMenus.Main)
            {
                await ConfigureMainMenuAsync(context);
            }
        }

        private async Task ConfigureMainMenuAsync(MenuConfigurationContext context)
        {
            if (!MultiTenancyConsts.IsEnabled)
            {
                var administration = context.Menu.GetAdministration();
                administration.TryRemoveMenuItem(TenantManagementMenuNames.GroupName);
            }

            var l = context.GetLocalizer<AbpXAmisResource>();

            context.Menu.Items.Insert(0, new ApplicationMenuItem("AbpXAmis.Home", l["Menu:Home"], "~/"));
            if (await context.IsGrantedAsync(AbpXAmisPermissions.Book.Default))
            {
                context.Menu.AddItem(
                    new ApplicationMenuItem(AbpXAmisMenus.Book, l["Menu:Book"], "/Books/Book")
                );
            }
        }
    }
}
