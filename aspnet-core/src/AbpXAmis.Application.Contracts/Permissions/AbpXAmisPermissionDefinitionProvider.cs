using AbpXAmis.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;

namespace AbpXAmis.Permissions
{
    public class AbpXAmisPermissionDefinitionProvider : PermissionDefinitionProvider
    {
        public override void Define(IPermissionDefinitionContext context)
        {
            var myGroup = context.AddGroup(AbpXAmisPermissions.GroupName);

            //Define your own permissions here. Example:
            //myGroup.AddPermission(AbpXAmisPermissions.MyPermission1, L("Permission:MyPermission1"));

            var bookPermission = myGroup.AddPermission(AbpXAmisPermissions.Book.Default, L("Permission:Book"));
            bookPermission.AddChild(AbpXAmisPermissions.Book.Create, L("Permission:Create"));
            bookPermission.AddChild(AbpXAmisPermissions.Book.Update, L("Permission:Update"));
            bookPermission.AddChild(AbpXAmisPermissions.Book.Delete, L("Permission:Delete"));
        }

        private static LocalizableString L(string name)
        {
            return LocalizableString.Create<AbpXAmisResource>(name);
        }
    }
}
