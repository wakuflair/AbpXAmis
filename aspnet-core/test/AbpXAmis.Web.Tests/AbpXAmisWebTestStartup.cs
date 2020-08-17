using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Volo.Abp;

namespace AbpXAmis
{
    public class AbpXAmisWebTestStartup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddApplication<AbpXAmisWebTestModule>();
        }

        public void Configure(IApplicationBuilder app, ILoggerFactory loggerFactory)
        {
            app.InitializeApplication();
        }
    }
}