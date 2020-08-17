using System;
using System.Threading.Tasks;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Guids;

namespace AbpXAmis.Books
{
    public class BookStoreDataSeederContributor
        : IDataSeedContributor, ITransientDependency
    {
        private readonly IRepository<Book, Guid> _bookRepository;
        private readonly IGuidGenerator _guidGenerator;

        public BookStoreDataSeederContributor(IRepository<Book, Guid> bookRepository, IGuidGenerator guidGenerator)
        {
            _bookRepository = bookRepository;
            _guidGenerator = guidGenerator;
        }

        public async Task SeedAsync(DataSeedContext context)
        {
            if (await _bookRepository.GetCountAsync() <= 0)
            {
                await _bookRepository.InsertAsync(
                    new Book
                    (
                        _guidGenerator.Create(),
                        "1984",
                        BookType.Dystopia,
                        new DateTime(1949, 6, 8),
                        19.84f
                    ),
                    autoSave: true
                );

                await _bookRepository.InsertAsync(
                    new Book
                    (
                        _guidGenerator.Create(),
                        "The Hitchhiker's Guide to the Galaxy",
                        BookType.ScienceFiction,
                        new DateTime(1995, 9, 27),
                        42.0f
                    ),
                    autoSave: true
                );
            }
        }
    }
}