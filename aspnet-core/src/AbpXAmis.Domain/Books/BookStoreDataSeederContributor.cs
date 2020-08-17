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
                for (int i = 0; i < 100; i++)
                {
                    await _bookRepository.InsertAsync(
                        new Book
                        (
                            _guidGenerator.Create(),
                            $"Book{i + 1}",
                            (BookType) (i % Enum.GetValues(typeof(BookType)).Length),
                            new DateTime(1949, 1, 1).AddDays(i),
                            100 + i                            
                        ),
                        autoSave: true
                    );
                }
            }
        }
    }
}