using System.Threading.Tasks;
using Shouldly;
using Xunit;

namespace AbpXAmis.Pages
{
    public class Index_Tests : AbpXAmisWebTestBase
    {
        [Fact]
        public async Task Welcome_Page()
        {
            var response = await GetResponseAsStringAsync("/");
            response.ShouldNotBeNull();
        }
    }
}
