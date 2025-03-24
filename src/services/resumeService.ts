import axios from 'axios';

const API_URL = 'http://localhost:8000/api/resume/';

/**
 * Interface for resume analysis results
 */
export interface ResumeAnalysisResult {
  keywordsToAdd: string[];
  keywordsToRemove: string[];
  formatSuggestions?: string[];
  contentSuggestions: string[];
  matchScore: number;
  technicalSkillsMatch?: {
    inJob: string[];
    inResume: string[];
    missing: string[];
  };
  softSkillsMatch?: {
    inJob: string[];
    inResume: string[];
    missing: string[];
  };
  sentimentAnalysis?: {
    sentiment: 'positive' | 'neutral' | 'negative';
  };
}

/**
 * Uploads resume and job description files to the API for analysis
 */
export const analyzeResume = async (
  resumeFile: File, 
  jobDescFile: File
): Promise<ResumeAnalysisResult> => {
  const formData = new FormData();
  formData.append('resume_file', resumeFile);
  formData.append('job_desc_file', jobDescFile);

  try {
    const response = await axios.post<ResumeAnalysisResult>(
      `${API_URL}analyze/`, 
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    
    // Add debug logging
    console.log("Full API response:", response.data);
    console.log("Sentiment Analysis in response:", response.data.sentimentAnalysis);
    
    return response.data;
  } catch (error) {
    console.error('Error analyzing resume:', error);
    throw error;
  }
};

/**
 * Get all resumes for the authenticated user
 */
export const getUserResumes = async () => {
  try {
    const response = await axios.get(`${API_URL}resumes/`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user resumes:', error);
    throw error;
  }
};

/**
 * Get all job descriptions for the authenticated user
 */
export const getUserJobDescriptions = async () => {
  try {
    const response = await axios.get(`${API_URL}job-descriptions/`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching job descriptions:', error);
    throw error;
  }
};

/**
 * Get all resume analyses for the authenticated user
 */
export const getUserAnalyses = async () => {
  try {
    const response = await axios.get(`${API_URL}analyses/`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching resume analyses:', error);
    throw error;
  }
}; 