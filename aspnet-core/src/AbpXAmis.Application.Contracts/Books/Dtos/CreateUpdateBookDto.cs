using System;
using System.ComponentModel;
namespace AbpXAmis.Books.Dtos
{
    [Serializable]
    public class CreateUpdateBookDto
    {
        public string Name { get; set; }

        public BookType Type { get; set; }

        public DateTime PublishDate { get; set; }

        public float Price { get; set; }
    }
}