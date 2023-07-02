document.addEventListener('DOMContentLoaded', () => {
    const deleteButtons = document.querySelectorAll('.delete-button');
  
    deleteButtons.forEach(button => {
      button.addEventListener('click', (event) => {
        const blogId = event.target.dataset.blogid;
  
        if (confirm('Bu blogu silmek istediğinize emin misiniz?')) {
          fetch(`/blogs/${blogId}`, {
            method: 'DELETE'
          })
            .then(response => {
              if (response.ok) {
                window.location.reload();
              } else {
                console.error('Blog silinemedi.');
              }
            })
            .catch(error => {
              console.error('Bir hata oluştu:', error);
            });
        }
      });
    });
  });
