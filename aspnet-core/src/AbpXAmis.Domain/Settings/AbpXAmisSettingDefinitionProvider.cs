using Volo.Abp.Settings;

namespace AbpXAmis.Settings
{
    public class AbpXAmisSettingDefinitionProvider : SettingDefinitionProvider
    {
        public override void Define(ISettingDefinitionContext context)
        {
            //Define your own settings here. Example:
            //context.Add(new SettingDefinition(AbpXAmisSettings.MySetting1));
        }
    }
}
