from rest_framework import serializers
from .models import Resume, JobDescription, ResumeAnalysis

class ResumeSerializer(serializers.ModelSerializer):
    """Serializer for Resume model"""
    class Meta:
        model = Resume
        fields = ['id', 'title', 'file_name', 'file_type', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']

class JobDescriptionSerializer(serializers.ModelSerializer):
    """Serializer for JobDescription model"""
    class Meta:
        model = JobDescription
        fields = ['id', 'title', 'company', 'file_name', 'file_type', 'created_at']
        read_only_fields = ['created_at']

class ResumeAnalysisSerializer(serializers.ModelSerializer):
    """Serializer for ResumeAnalysis model"""
    class Meta:
        model = ResumeAnalysis
        fields = [
            'id', 'resume', 'job_description', 'keywords_to_add', 
            'keywords_to_remove', 'format_suggestions', 
            'content_suggestions', 'match_score', 'created_at'
        ]
        read_only_fields = ['created_at']

class ResumeAnalysisResultSerializer(serializers.Serializer):
    """Serializer for resume analysis results"""
    keywordsToAdd = serializers.ListField(child=serializers.CharField())
    keywordsToRemove = serializers.ListField(child=serializers.CharField())
    formatSuggestions = serializers.ListField(child=serializers.CharField())
    contentSuggestions = serializers.ListField(child=serializers.CharField())
    matchScore = serializers.IntegerField()
    technicalSkillsMatch = serializers.DictField(required=False)
    softSkillsMatch = serializers.DictField(required=False) 