using AbpXAmis.Books;
using AbpXAmis.Books.Dtos;
using AutoMapper;

namespace AbpXAmis
{
    public class AbpXAmisApplicationAutoMapperProfile : Profile
    {
        public AbpXAmisApplicationAutoMapperProfile()
        {
            /* You can configure your AutoMapper mapping configuration here.
             * Alternatively, you can split your mapping configurations
             * into multiple profile classes for a better organization. */
            CreateMap<Book, BookDto>();
            CreateMap<CreateUpdateBookDto, Book>(MemberList.Source);
        }
    }
}
