from django.urls import path
from employapp import views
from django.conf.urls.static import static
from django.conf import settings


urlpatterns=[
    path('department',views.departmentApi),
    path('department/<int:id>' ,views.departmentApi),

    path('employee',views.employAPI),
    path('employee/<int:id>', views.employAPI),

    path('employee/SaveFile', views.SaveFile)


] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)