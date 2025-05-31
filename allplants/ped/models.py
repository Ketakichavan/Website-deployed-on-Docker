from django.db import models
from django.contrib.auth.models import User
from django.urls import reverse

class Blog(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    image = models.ImageField(upload_to='blog_images/', null=True, blank=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title 
    # + '|' + str(self.author)

class Comment(models.Model):
    blog = models.ForeignKey(Blog, related_name='comments', on_delete=models.CASCADE)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f'Comment by {self.author.username} on {self.blog.title}'
    
    def get_absolute_url(self):
        return reverse('create_blog', args=(str(self.id)))
    

class Outdoor(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='images/', blank=True, null=True)

    def __str__(self):
        return self.title


# for bookmark
class SavedPlant(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    plant_name = models.CharField(max_length=100)
    plant_page = models.CharField(max_length=255)
    saved_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} saved {self.plant_name}"
