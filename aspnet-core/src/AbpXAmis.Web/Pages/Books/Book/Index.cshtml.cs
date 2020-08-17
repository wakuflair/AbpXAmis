using System.Threading.Tasks;

namespace AbpXAmis.Web.Pages.Books.Book
{
    public class IndexModel : AbpXAmisPageModel
    {
        public virtual async Task OnGetAsync()
        {
            await Task.CompletedTask;
        }
    }
}
