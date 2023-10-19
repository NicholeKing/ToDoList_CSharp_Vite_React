#pragma warning disable CS8618
using System.ComponentModel.DataAnnotations;
namespace Server.Models
{
    public class TodoItem
    {
        [Key]
        public long Id { get; set; }
        [Required]
        public string Name { get; set; }
        // Default to false because we wouldn't add something to our list that's already done
        public bool IsComplete { get; set; } = false;
    }
}

