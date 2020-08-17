using System;
using AbpXAmis.Permissions;
using AbpXAmis.Books.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace AbpXAmis.Books
{
    public class BookAppService : CrudAppService<Book, BookDto, Guid, PagedAndSortedResultRequestDto, CreateUpdateBookDto, CreateUpdateBookDto>,
        IBookAppService
    {
        protected override string GetPolicyName { get; set; } = AbpXAmisPermissions.Book.Default;
        protected override string GetListPolicyName { get; set; } = AbpXAmisPermissions.Book.Default;
        protected override string CreatePolicyName { get; set; } = AbpXAmisPermissions.Book.Create;
        protected override string UpdatePolicyName { get; set; } = AbpXAmisPermissions.Book.Update;
        protected override string DeletePolicyName { get; set; } = AbpXAmisPermissions.Book.Delete;

        public BookAppService(IRepository<Book, Guid> repository) : base(repository)
        {
        }
    }
}
