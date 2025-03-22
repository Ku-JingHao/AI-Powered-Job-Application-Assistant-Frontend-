import React from 'react';
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Button,
  Chip,
  Stack,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  FormatSize as FormatSizeIcon,
  FormatAlignLeft as FormatAlignLeftIcon,
  ExpandMore as ExpandMoreIcon,
  CheckCircle as CheckCircleIcon,
  Download as DownloadIcon,
  Star as StarIcon,
} from '@mui/icons-material';

// Mock data - in a real app, this would come from an API
const mockSuggestions = {
  keywordsToAdd: [
    'machine learning',
    'React.js',
    'TypeScript',
    'agile development',
    'cloud infrastructure',
  ],
  keywordsToRemove: [
    'jQuery',
    'manual testing',
  ],
  formatSuggestions: [
    'Use bullet points for work experience to improve readability',
    'Make your name and contact information more prominent',
    'Consider using a one-column layout for better ATS parsing',
  ],
  contentSuggestions: [
    'Quantify your achievements with numbers and percentages',
    'Add specific technical skills mentioned in the job description',
    'Include a brief professional summary at the top',
    'Tailor your work experience to highlight relevant projects',
  ],
  matchScore: 72,
};

interface SuggestionsPanelProps {
  resumeFile: File | null;
  jobDescFile: File | null;
}

const SuggestionsPanel: React.FC<SuggestionsPanelProps> = ({ resumeFile, jobDescFile }) => {
  if (!resumeFile || !jobDescFile) {
    return (
      <Paper elevation={2} sx={{ p: 3, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ textAlign: 'center', maxWidth: 400, mx: 'auto' }}>
          <Typography variant="h6" color="text.secondary" paragraph>
            Upload your resume and job description to get tailored suggestions.
          </Typography>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" component="h2" gutterBottom sx={{ mb: 0 }}>
          Tailored Suggestions
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
            Match Score:
          </Typography>
          <Chip 
            label={`${mockSuggestions.matchScore}%`} 
            color={mockSuggestions.matchScore > 70 ? "success" : "warning"}
            size="small"
          />
        </Box>
      </Box>
      
      <Alert severity="info" sx={{ mb: 3 }}>
        These suggestions are tailored based on the job description you provided.
      </Alert>

      <Stack spacing={2}>
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="keywords-content"
            id="keywords-header"
          >
            <Typography variant="subtitle1" fontWeight="bold">
              Keywords
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Consider adding these keywords from the job description:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {mockSuggestions.keywordsToAdd.map((keyword, index) => (
                  <Chip
                    key={index}
                    label={keyword}
                    icon={<AddIcon />}
                    color="primary"
                    variant="outlined"
                    size="small"
                  />
                ))}
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Consider removing these keywords that may be outdated:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {mockSuggestions.keywordsToRemove.map((keyword, index) => (
                  <Chip
                    key={index}
                    label={keyword}
                    icon={<RemoveIcon />}
                    color="error"
                    variant="outlined"
                    size="small"
                  />
                ))}
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="format-content"
            id="format-header"
          >
            <Typography variant="subtitle1" fontWeight="bold">
              Format Improvements
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List dense>
              {mockSuggestions.formatSuggestions.map((suggestion, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <FormatAlignLeftIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={suggestion} />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="content-suggestions"
            id="content-header"
          >
            <Typography variant="subtitle1" fontWeight="bold">
              Content Suggestions
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List dense>
              {mockSuggestions.contentSuggestions.map((suggestion, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <StarIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={suggestion} />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      </Stack>

      <Divider sx={{ my: 3 }} />

      <Box textAlign="center">
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<DownloadIcon />}
        >
          Download Updated Resume
        </Button>
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          Available in PDF and DOCX formats
        </Typography>
      </Box>
    </Paper>
  );
};

export default SuggestionsPanel; 