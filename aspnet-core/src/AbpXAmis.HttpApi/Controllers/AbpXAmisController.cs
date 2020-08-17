using AbpXAmis.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace AbpXAmis.Controllers
{
    /* Inherit your controllers from this class.
     */
    public abstract class AbpXAmisController : AbpController
    {
        protected AbpXAmisController()
        {
            LocalizationResource = typeof(AbpXAmisResource);
        }
    }
}