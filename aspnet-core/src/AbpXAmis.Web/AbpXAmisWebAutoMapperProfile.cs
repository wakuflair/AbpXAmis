using AbpXAmis.Books.Dtos;
using AbpXAmis.Web.Pages.Books.Book.ViewModels;
using AutoMapper;

namespace AbpXAmis.Web
{
    public class AbpXAmisWebAutoMapperProfile : Profile
    {
        public AbpXAmisWebAutoMapperProfile()
        {
            //Define your AutoMapper configuration here for the Web project.
            CreateMap<BookDto, CreateEditBookViewModel>();
            CreateMap<CreateEditBookViewModel, CreateUpdateBookDto>();
        }
    }
}
