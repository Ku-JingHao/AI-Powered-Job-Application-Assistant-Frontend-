from django.shortcuts import render
from rest_framework import status, viewsets
from rest_framework.decorators import api_view, parser_classes
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from django.conf import settings
from django.contrib.auth.models import User

from .models import Resume, JobDescription, ResumeAnalysis
from .serializers import (
    ResumeSerializer, 
    JobDescriptionSerializer, 
    ResumeAnalysisSerializer,
    ResumeAnalysisResultSerializer
)
from .resume_analyzer import ResumeAnalyzer
from . import azure_language_client
import json

# Initialize the resume analyzer
resume_analyzer = ResumeAnalyzer()

@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def analyze_resume(request):
    """
    Analyze a resume against a job description and provide tailoring suggestions.
    """
    resume_file = request.FILES.get('resume_file')
    job_desc_file = request.FILES.get('job_desc_file')
    
    if not resume_file or not job_desc_file:
        return Response({
            'error': 'Both resume and job description files are required.'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    analyzer = ResumeAnalyzer()
    
    # Extract text from files
    resume_text = analyzer.extract_text_from_file(
        resume_file.read(), 
        resume_file.name.split('.')[-1]
    )
    
    job_desc_text = analyzer.extract_text_from_file(
        job_desc_file.read(), 
        job_desc_file.name.split('.')[-1]
    )
    
    # Analyze the resume against the job description
    analysis_result = analyzer.analyze_resume_and_job_description(
        resume_text, 
        job_desc_text
    )
    
    # Log the complete results for debugging
    print("Complete analysis result:", json.dumps(analysis_result, default=str, indent=2))
    
    # Specifically check the sentiment analysis part
    sentiment_data = analysis_result.get('sentimentAnalysis', {})
    print("Sentiment Analysis data:", json.dumps(sentiment_data, default=str, indent=2))
    
    return Response(analysis_result, status=status.HTTP_200_OK)

@api_view(['POST'])
def test_sentiment_analysis(request):
    """
    Debug endpoint to test sentiment analysis functionality.
    """
    text = request.data.get('text', 'This is a test text with a neutral sentiment.')
    result = azure_language_client.analyze_sentiment(text)
    
    # Log the raw result
    print("Raw sentiment analysis result:", result)
    
    # Return the full result
    return Response(result, status=status.HTTP_200_OK)

class ResumeViewSet(viewsets.ModelViewSet):
    """ViewSet for viewing and editing Resume instances"""
    serializer_class = ResumeSerializer
    
    def get_queryset(self):
        """Return resumes for the current authenticated user only"""
        user = self.request.user
        if user.is_authenticated:
            return Resume.objects.filter(user=user).order_by('-created_at')
        return Resume.objects.none()
    
    def perform_create(self, serializer):
        """Set the user when creating a new resume"""
        serializer.save(user=self.request.user)

class JobDescriptionViewSet(viewsets.ModelViewSet):
    """ViewSet for viewing and editing JobDescription instances"""
    serializer_class = JobDescriptionSerializer
    
    def get_queryset(self):
        """Return job descriptions for the current authenticated user only"""
        user = self.request.user
        if user.is_authenticated:
            return JobDescription.objects.filter(user=user).order_by('-created_at')
        return JobDescription.objects.none()
    
    def perform_create(self, serializer):
        """Set the user when creating a new job description"""
        serializer.save(user=self.request.user)

class ResumeAnalysisViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for viewing ResumeAnalysis instances"""
    serializer_class = ResumeAnalysisSerializer
    
    def get_queryset(self):
        """Return analyses for the current authenticated user only"""
        user = self.request.user
        if user.is_authenticated:
            return ResumeAnalysis.objects.filter(user=user).order_by('-created_at')
        return ResumeAnalysis.objects.none()
