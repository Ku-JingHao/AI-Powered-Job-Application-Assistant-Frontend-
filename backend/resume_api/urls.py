from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

# Create a router and register our viewsets with it
router = DefaultRouter()
router.register(r'resumes', views.ResumeViewSet, basename='resume')
router.register(r'job-descriptions', views.JobDescriptionViewSet, basename='jobdescription')
router.register(r'analyses', views.ResumeAnalysisViewSet, basename='resumeanalysis')

# The API URLs are determined automatically by the router
urlpatterns = [
    path('', include(router.urls)),
    path('analyze/', views.analyze_resume, name='analyze-resume'),
    path('test-sentiment/', views.test_sentiment_analysis, name='test_sentiment_analysis'),
] 