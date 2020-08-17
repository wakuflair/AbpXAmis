using AbpXAmis.Localization;
using Volo.Abp.AspNetCore.Mvc.UI.RazorPages;

namespace AbpXAmis.Web.Pages
{
    /* Inherit your PageModel classes from this class.
     */
    public abstract class AbpXAmisPageModel : AbpPageModel
    {
        protected AbpXAmisPageModel()
        {
            LocalizationResourceType = typeof(AbpXAmisResource);
        }
    }
}