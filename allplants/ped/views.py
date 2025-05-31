# from django.http import HttpResponse
from django.shortcuts import render,redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login  #imported this to authenticate data while loging in 
from django.shortcuts import render
from django.contrib import messages
from django.views.generic import DetailView,CreateView
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from .models import Blog, Comment
from django.shortcuts import get_object_or_404
from django.http import HttpResponseForbidden

from .models import Outdoor  # <-- match the actual class name
from django.http import JsonResponse

# from .models import Plant

# for bookmark
from .models import SavedPlant
from django.views.decorators.csrf import csrf_exempt
# Create your views here.


# ------------------REGISTER PAGE
def RegisterPage(request):
    if request.method=='POST':
        username=request.POST.get('username')
        name=request.POST.get('name')
        email=request.POST.get('email')
        password=request.POST.get('password')

        my_user = User.objects.create_user(username=username, email=email, password=password, first_name=name)
        # my_user=User.objects.create_user(username,name,email,password)   #using this query user data will be stored i my_user
        my_user.save()                                                        #user will be saved
        # return HttpResponse("Userhas been created successfully")                    #message displayed -> done for testing only
        return redirect('robo')

        # print(username,name,email,password)     ->used just for trial
    return render(request,'register.html')

# --------------------  LOGIN PAGE 
# from django.contrib import messages

def LoginPage(request):
    error = None  # Default: no error

    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['pass']
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect('homee')  # redirect to your home/dashboard page
        else:
            error = "Username or password incorrect. Please try again."

    return render(request, 'login.html', {'error': error})


# def LoginPage(request):
#     if request.method=='POST':
#         username=request.POST.get('username')
#         password=request.POST.get('pass')
#         user=authenticate(request,username=username,password=password)
#         if user is not None:
#             login(request,user)
#             messages.success(request, 'Login successful!')  # Add popup message
#             return redirect('homee') 
#         else:
#             messages.error(request, 'Username or Password is incorrect!')
#             return redirect('login')

#         # once print and check if password is coming or not
#         # print(username,pwd)
#     return render(request,'login.html') 

# ----------- 2nd stage authentication
def RoboPage(request):
    if request.method == 'POST':
        return redirect('login')
    return render(request, 'robo.html')


# --------------other webpages when requested will open



def homee(request):
    return render(request, 'HOMEE.html')

def indoor(request):
    return render(request, 'INDOOR.html')

def outdoor(request):
    return render(request, 'OUTDOOR.html')

def homereme(request):
    return render(request, 'HOMEREME.html')

def myplants(request):
    return render(request, 'MYPLANT.html')

def blogs(request):
    return render(request, 'blog/mainblog.html')

# def login_view(request):
#     return render(request, 'login.html')



# -------------------- Blogs page   -----------------------------

# PUblic page where everyone can see posted blogs 
# Display all blog posts
def blogs(request):
    all_blogs = Blog.objects.all().order_by('-created_at')
    return render(request, 'blog/mainblog.html', {'blogs': all_blogs})

# Allow logged-in users to create a blog post
@login_required(login_url='login')
def createblog(request):
    if request.method == 'POST':
        title = request.POST.get('title')
        content = request.POST.get('content')
        image = request.FILES.get('image')

        Blog.objects.create(
            title=title,
            content=content,
            image=image,
            author=request.user
        )
        return redirect('blogs')

    return render(request, 'blog/createblog.html')

# ------------------ delete blogs feature 
@login_required(login_url='login')
def deleteblog(request, blog_id):
    blog = get_object_or_404(Blog, id=blog_id)

    if blog.author == request.user:
        blog.delete()
        return redirect('blogs')
    else:
        return HttpResponseForbidden("You're not allowed to delete this blog.")
    

# ------------------------- comments in blog
@login_required
def add_comment(request, blog_id):
    blog = get_object_or_404(Blog, id=blog_id)
    if request.method == 'POST':
        content = request.POST.get('comment')
        if content:
            Comment.objects.create(blog=blog, author=request.user, content=content)
    return redirect('blogs')



def fetch_plants(request):
    # Example serializer — adjust based on your model fields
    plants = Outdoor.objects.all()     # changed here
    data = []
    for plant in plants:
        data.append({
            "id": plant.id,
            "title": plant.title,
            "description": plant.description,
            # "images": [image.image.url for image in plant.images.all()]  # update as needed
            'images': [plant.image.url] if plant.image else []
        })
    return JsonResponse(data, safe=False)


# for bookmark
@login_required
def myplants(request):
    # Get all saved plants for the current user
    saved_plants = SavedPlant.objects.filter(user=request.user)
    return render(request, 'myplants.html', {'saved_plants': saved_plants})

@csrf_exempt
@login_required
def save_plant(request):
    if request.method == "POST":
        # Get the plant name and page URL from the POST data
        plant_name = request.POST.get("plant_name")
        plant_page = request.POST.get("plant_page")

        # Ensure we're saving the plant for the correct logged-in user
        user = request.user

        # Check if the plant is already saved for this user
        if not SavedPlant.objects.filter(user=request.user, plant_name=plant_name).exists():
            SavedPlant.objects.create(user=request.user, plant_name=plant_name, plant_page=plant_page)
            messages.success(request, f"'{plant_name}' has been saved to your collection!")
        else:
            messages.warning(request, f"'{plant_name}' is already in your collection.")

        # Return a success response
        return JsonResponse({"status": "success"})

    return JsonResponse({"status": "error"}, status=400)


# def myplants(request):
#     saved_plants = []
#     if request.user.is_authenticated:
#         saved_plants = SavedPlant.objects.filter(user=request.user)

#     context = {
#         'saved_plants': saved_plants,
#     }
#     return render(request, 'myplants.html', context)


def myplants(request):
    saved_plants = []
    if request.user.is_authenticated:
        saved_plants = SavedPlant.objects.filter(user=request.user)

    context = {
        'saved_plants': saved_plants,
        'user_is_authenticated': request.user.is_authenticated,
    }
    return render(request, 'myplants.html', context)



# ------------------------- Indoor plants -> tropical 


def tropical1(request):
    return render(request, 'tropical1.html')

def rose(request):
    return render(request, 'trial/rose.html')

def peacelily(request):
    return render(request, 'trial/peacelily.html')

def chineseever(request):
    return render(request, 'trial/chineseever.html')

def strawberry(request):
    return render(request, 'trial/strawberry.html')

def africanviolet(request):
    return render(request, 'trial/africanviolet.html')

def cherrytomato(request):
    return render(request, 'trial/cherrytomato.html')

def hydrangeas(request):
    return render(request, 'trial/hydrangeas.html')

def periwinkle(request):
    return render(request, 'trial/periwinkle.html')



# Outdoor plants

def tropicalout(request):
    return render(request, 'tropicalout.html')

def banana(request):
    return render(request, 'banana.html')

def coconut(request):
    return render(request, 'coconut.html')

def hibiscus(request):
    return render(request, 'hibiscus.html')

def papaya(request):
    return render(request, 'papaya.html')

def ginger(request):
    return render(request, 'ginger.html')

def bougainvillea(request):
    return render(request, 'bougainvillea.html')

def plumeria(request):
    return render(request, 'plumeria.html')

def heliconia(request):
    return render(request, 'heliconia.html')

def paradise(request):
    return render(request, 'paradise.html')

def banana(request):
    return render(request, 'trial2/banana.html')

def coconut(request):
    return render(request, 'trial2/coconut.html')

def hibiscus(request):
    return render(request, 'trial2/hibiscus.html')

def papaya(request):
    return render(request, 'trial2/papaya.html')

def ginger(request):
    return render(request, 'trial2/ginger.html')

def bougainvillea(request):
    return render(request, 'trial2/bougainvillea.html')