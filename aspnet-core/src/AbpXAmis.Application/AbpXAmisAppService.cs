using System;
using System.Collections.Generic;
using System.Text;
using AbpXAmis.Localization;
using Volo.Abp.Application.Services;

namespace AbpXAmis
{
    /* Inherit your application services from this class.
     */
    public abstract class AbpXAmisAppService : ApplicationService
    {
        protected AbpXAmisAppService()
        {
            LocalizationResource = typeof(AbpXAmisResource);
        }
    }
}
