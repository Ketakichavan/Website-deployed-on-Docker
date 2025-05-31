"""
URL configuration for plant project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from ped import views

from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth import views as auth_views


from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),
    # path('', include('myplants.urls')),


    path('', views.homee, name='homee'),
    path('register/', views.RegisterPage, name='register'),
    path('login/', views.LoginPage, name='login'),
    path('robo/', views.RoboPage, name='robo'),
    path('homereme/', views.homereme, name='homereme'),
    path('indoor/', views.indoor, name='indoor'),
    path('outdoor/', views.outdoor, name='outdoor'),
    path('myplants/', views.myplants, name='myplants'),
    
    path('blogs/', views.blogs, name='blogs'),
    path('createblog/', views.createblog, name='createblog'),
    path('deleteblog/<int:blog_id>/', views.deleteblog, name='deleteblog'),
    path('blogs/comment/<int:blog_id>/', views.add_comment, name='add_comment'),

    
    # path('tropical/', views.tropical, name='tropical'),
    path('tropical/', views.tropical1, name='tropical1'),
    path('rose/', views.rose, name='rose'),
    path('peacelily/', views.peacelily, name='peacelily'),
    path('chineseever/', views.chineseever, name='chineseever'),
    path('strawberry/', views.strawberry, name='strawberry'),
    path('africanviolet/', views.africanviolet, name='africanviolet'),
    path('cherrytomato/', views.cherrytomato, name='cherrytomato'),
    # path('hydrangeas/', views.hydrangeas, name='hydrangeas'),
    path('hydrangeas/', views.hydrangeas, name='hydrangeas'),
    path('periwinkle/', views.periwinkle, name='periwinkle'),


    path('fetchPlants/', views.fetch_plants, name='fetchPlants'),
    path('tropicalout/', views.tropicalout, name='tropicalout'),
    path('banana/', views.banana, name='banana'),
    path('coconut/', views.coconut, name='coconut'),
    path('hibiscus/', views.hibiscus, name='hibiscus'),
    path('papaya/', views.papaya, name='papaya'),
    path('ginger/', views.ginger, name='ginger'),
    path('bougainvillea/', views.bougainvillea, name='bougainvillea'),
    path('plumeria/', views.plumeria, name='plumeria'),
    path('heliconia/', views.heliconia, name='heliconia'),
    path('paradise/', views.paradise, name='paradise'),

    # for bookmark
    path('save-plant/', views.save_plant, name='save_plant'),

    path('logout/', auth_views.LogoutView.as_view(next_page='login'), name='logout'),
    
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

    # path('', views.HomePage, name='homee'),
    # path('register/',views.RegisterPage,name='register'),
    # path('login',views.LoginPage,name='login'),
    # path('robo/',views.RoboPage,name='robo'),

    # # other webpages url
    # path('homereme/', views.HomeRemediesPage, name='homereme'),
    # path('indoor/', views.IndoorPage, name='indoor'),
    # path('outdoor/', views.OutdoorPage, name='outdoor'),
    # path('myplants/', views.MyPlantsPage, name='myplants'),
    # path('blogs/', views.BlogsPage, name='blogs'),



    # path('home/',views.HomePage,name='homee'),
    # path('logout/',lambda request: logout_then_redirect(HomePage), name='logout'),
# ]