import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  IconButton, 
  Breadcrumbs, 
  Link,
  Paper,
  TextField,
  Button,
  List,
  ListItem,
  Avatar,
  Chip,
  Divider,
  Grid,
  Tooltip,
} from '@mui/material';
import { 
  ArrowBack as ArrowBackIcon, 
  Home as HomeIcon,
  Send as SendIcon,
  SmartToy as BotIcon,
  Person as PersonIcon,
  SupportAgent as SupportAgentIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

// Common FAQ questions for quick replies
const faqQuestions = [
  "How do I answer 'Tell me about yourself'?",
  "What are my greatest strengths?",
  "How to explain employment gaps?",
  "Tips for salary negotiation",
  "How to handle behavioral questions?",
  "Questions to ask the interviewer",
];

// Sample responses for the chatbot
const mockResponses: Record<string, string> = {
  "How do I answer 'Tell me about yourself'?": 
    "When answering 'Tell me about yourself', follow this structure: 1) Start with your current role and experience, 2) Mention relevant past experiences or skills, 3) Explain why you're interested in this position, and 4) Keep it concise (1-2 minutes). Focus on professional information relevant to the job rather than personal details.",
  
  "What are my greatest strengths?": 
    "When discussing your strengths, be specific and relevant to the position. Choose 2-3 key strengths backed by concrete examples. For technical roles, highlight technical skills and problem-solving abilities. For management positions, emphasize leadership and communication. Always relate your strengths to how they benefit the employer.",
  
  "How to explain employment gaps?": 
    "To explain employment gaps: 1) Be honest but concise, 2) Focus on what you learned or accomplished during the gap (e.g., freelance work, courses, volunteering), 3) Emphasize your enthusiasm to return to work, and 4) Redirect the conversation to your qualifications for the role. Avoid apologizing—gaps are common in careers.",
  
  "Tips for salary negotiation": 
    "For successful salary negotiation: 1) Research industry standards for your role and location, 2) Emphasize the value you bring before discussing numbers, 3) Let the employer make the first offer, 4) Consider the entire compensation package, not just salary, and 5) Practice your negotiation conversation beforehand. Always be professional and collaborative in your approach.",
  
  "How to handle behavioral questions?": 
    "Use the STAR method for behavioral questions: Situation (describe the context), Task (explain your responsibility), Action (describe what you did), and Result (share the outcome). Prepare examples of leadership, teamwork, conflict resolution, and problem-solving from your experience. Be specific and quantify results when possible.",
  
  "Questions to ask the interviewer": 
    "Good questions to ask interviewers include: 1) 'What does success look like in this role?', 2) 'How would you describe the team culture?', 3) 'What are the biggest challenges facing the team right now?', 4) 'What opportunities for professional development do you offer?', and 5) 'What are the next steps in the hiring process?' Avoid questions about basic information available on their website.",
  
  "default": "I don't have specific information on that topic yet. Would you like me to connect you with a career coach for more personalized advice?"
};

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const InterviewChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! I'm your Interview Preparation Assistant. How can I help you prepare for your interviews today?",
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = (text: string = inputValue) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate bot typing
    setIsTyping(true);
    
    // Generate response after a delay
    setTimeout(() => {
      const botResponse = mockResponses[text] || mockResponses.default;
      
      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleFAQClick = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <Box sx={{ flexGrow: 1, py: 4, px: { xs: 2, md: 4 } }}>
      <Container maxWidth="xl">
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
          <IconButton 
            component={RouterLink} 
            to="/dashboard" 
            color="primary" 
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
          
          <Box>
            <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }}>
              <Link 
                component={RouterLink} 
                to="/"
                color="inherit"
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                Home
              </Link>
              <Link
                component={RouterLink}
                to="/dashboard"
                color="inherit"
              >
                Dashboard
              </Link>
              <Typography color="text.primary">Interview Preparation Chatbot</Typography>
            </Breadcrumbs>
            
            <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
              Interview Preparation Chatbot
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Get answers to common interview questions and personalized advice
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            {/* Chat interface */}
            <Paper 
              elevation={3} 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                height: '70vh',
                borderRadius: 2,
              }}
            >
              {/* Chat messages area */}
              <Box 
                sx={{ 
                  flexGrow: 1, 
                  overflowY: 'auto', 
                  p: 2,
                  backgroundColor: 'grey.50',
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                }}
              >
                <List>
                  {messages.map((message) => (
                    <ListItem 
                      key={message.id} 
                      sx={{ 
                        display: 'flex', 
                        justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                        mb: 2,
                      }}
                    >
                      <Box sx={{ display: 'flex', maxWidth: '80%', alignItems: 'flex-start' }}>
                        {message.sender === 'bot' && (
                          <Avatar 
                            sx={{ 
                              bgcolor: 'primary.main', 
                              mr: 1,
                              width: 36, 
                              height: 36,
                              mt: 0.5
                            }}
                          >
                            <BotIcon fontSize="small" />
                          </Avatar>
                        )}
                        
                        <Paper 
                          variant="outlined" 
                          sx={{ 
                            p: 2, 
                            borderRadius: 2, 
                            backgroundColor: message.sender === 'user' ? 'primary.light' : 'white',
                            color: message.sender === 'user' ? 'white' : 'text.primary',
                            ml: message.sender === 'user' ? 1 : 0,
                            mr: message.sender === 'bot' ? 1 : 0,
                          }}
                        >
                          <Typography variant="body1">{message.text}</Typography>
                          <Typography variant="caption" color={message.sender === 'user' ? 'rgba(255,255,255,0.7)' : 'text.secondary'} sx={{ display: 'block', mt: 1, textAlign: 'right' }}>
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </Typography>
                        </Paper>
                        
                        {message.sender === 'user' && (
                          <Avatar 
                            sx={{ 
                              bgcolor: 'secondary.main', 
                              ml: 1,
                              width: 36, 
                              height: 36,
                              mt: 0.5
                            }}
                          >
                            <PersonIcon fontSize="small" />
                          </Avatar>
                        )}
                      </Box>
                    </ListItem>
                  ))}
                  
                  {isTyping && (
                    <ListItem sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
                      <Box sx={{ display: 'flex', maxWidth: '80%', alignItems: 'flex-start' }}>
                        <Avatar 
                          sx={{ 
                            bgcolor: 'primary.main', 
                            mr: 1,
                            width: 36, 
                            height: 36,
                            mt: 0.5
                          }}
                        >
                          <BotIcon fontSize="small" />
                        </Avatar>
                        <Paper 
                          variant="outlined" 
                          sx={{ 
                            p: 2, 
                            borderRadius: 2, 
                            backgroundColor: 'white',
                          }}
                        >
                          <Typography variant="body2">Typing<span className="typing-animation">...</span></Typography>
                        </Paper>
                      </Box>
                    </ListItem>
                  )}
                  
                  <div ref={messagesEndRef} />
                </List>
              </Box>
              
              {/* Input area */}
              <Box 
                sx={{ 
                  p: 2, 
                  borderTop: '1px solid', 
                  borderColor: 'divider',
                  backgroundColor: 'white',
                  borderBottomLeftRadius: 8,
                  borderBottomRightRadius: 8,
                }}
              >
                <Box sx={{ display: 'flex' }}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Type your question here..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage();
                      }
                    }}
                    sx={{ mr: 1 }}
                    size="small"
                  />
                  <Button 
                    variant="contained" 
                    color="primary" 
                    endIcon={<SendIcon />}
                    onClick={() => handleSendMessage()}
                    disabled={!inputValue.trim()}
                  >
                    Send
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Box>
              {/* FAQ Section */}
              <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                <Typography variant="h6" component="h2" gutterBottom>
                  Common Questions
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Click on any question to get an instant answer:
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {faqQuestions.map((question, index) => (
                    <Button 
                      key={index} 
                      variant="outlined"
                      color="primary"
                      size="medium"
                      onClick={() => handleFAQClick(question)}
                      sx={{ 
                        justifyContent: 'flex-start', 
                        textAlign: 'left',
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                      }}
                    >
                      {question}
                    </Button>
                  ))}
                </Box>
              </Paper>
              
              {/* Talk to a Coach Section */}
              <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <SupportAgentIcon color="secondary" sx={{ fontSize: 40, mr: 2 }} />
                  <Typography variant="h6" component="h2">
                    Need More Help?
                  </Typography>
                </Box>
                
                <Typography variant="body2" paragraph>
                  Our AI is still learning. For personalized advice, connect with a human career coach.
                </Typography>
                
                <Button 
                  variant="contained" 
                  color="secondary" 
                  fullWidth
                  startIcon={<SupportAgentIcon />}
                  sx={{ mt: 1 }}
                >
                  Talk to a Career Coach
                </Button>
                
                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                  <InfoIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                  <Typography variant="caption" color="text.secondary">
                    Premium service, first consultation is free
                  </Typography>
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default InterviewChatbot; 