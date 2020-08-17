using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AbpXAmis.Books;
using AbpXAmis.Books.Dtos;
using AbpXAmis.Web.Pages.Books.Book.ViewModels;

namespace AbpXAmis.Web.Pages.Books.Book
{
    public class CreateModalModel : AbpXAmisPageModel
    {
        [BindProperty]
        public CreateEditBookViewModel ViewModel { get; set; }

        private readonly IBookAppService _service;

        public CreateModalModel(IBookAppService service)
        {
            _service = service;
        }

        public virtual async Task<IActionResult> OnPostAsync()
        {
            var dto = ObjectMapper.Map<CreateEditBookViewModel, CreateUpdateBookDto>(ViewModel);
            await _service.CreateAsync(dto);
            return NoContent();
        }
    }
}