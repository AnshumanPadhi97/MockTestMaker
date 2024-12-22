import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Timer as TimerIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";

const TestTaker = () => {
  const { testId } = useParams();
  const navigate = useNavigate();

  // Move sample data out of component to avoid rerenders
  const sampleTestData = {
    testName: "JavaScript Fundamentals Quiz",
    duration: 30,
    passingCriteria: 3,
    questions: [
      {
        question: "What is the output of console.log(typeof [])?",
        options: ["array", "object", "undefined", "Array"],
        correctAnswer: 1,
      },
      {
        question:
          "Which method is used to add elements to the end of an array?",
        options: ["push()", "append()", "add()", "insert()"],
        correctAnswer: 0,
      },
      {
        question: "What does the '===' operator do in JavaScript?",
        options: [
          "Assigns a value to a variable",
          "Compares values only",
          "Compares both value and type",
          "Concatenates strings",
        ],
        correctAnswer: 2,
      },
      {
        question:
          "Which of these is a valid way to declare a variable in JavaScript?",
        options: ["variable x = 5;", "var x = 5;", "x := 5;", "x => 5;"],
        correctAnswer: 1,
      },
      {
        question: "What is the result of 5 + '5' in JavaScript?",
        options: ["10", "55", "Error", "undefined"],
        correctAnswer: 1,
      },
    ],
  };

  const [test, setTest] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [isTimeUpDialogOpen, setIsTimeUpDialogOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [testResults, setTestResults] = useState(null);

  useEffect(() => {
    setTest(sampleTestData);
    setTimeLeft(sampleTestData.duration * 60);
    setAnswers(new Array(sampleTestData.questions.length).fill(null));
  }, [testId]);

  useEffect(() => {
    if (!test || timeLeft <= 0 || submitted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsTimeUpDialogOpen(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, submitted, test]);

  const calculateResults = useCallback(() => {
    if (!test) return null;

    const correctAnswers = answers.reduce((count, answer, index) => {
      return count + (answer === test.questions[index].correctAnswer ? 1 : 0);
    }, 0);
    const unansweredCount = answers.filter((a) => a === null).length;
    const isPassed = correctAnswers >= test.passingCriteria;
    const percentage = Math.round(
      (correctAnswers / test.questions.length) * 100
    );

    return {
      correctAnswers,
      totalQuestions: test.questions.length,
      unansweredCount,
      isPassed,
      percentage,
      detailedAnswers: test.questions.map((q, index) => ({
        question: q.question,
        userAnswer:
          answers[index] !== null ? q.options[answers[index]] : "Not answered",
        correctAnswer: q.options[q.correctAnswer],
        isCorrect: answers[index] === q.correctAnswer,
      })),
    };
  }, [answers, test]);

  const formatTime = useCallback((seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }, []);

  const handleAnswerChange = (value) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = parseInt(value);
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    const results = calculateResults();
    setTestResults(results);
    setSubmitted(true);
    setIsSubmitDialogOpen(false);
    setShowResults(true);
  };

  const handleTimeUp = () => {
    const results = calculateResults();
    setTestResults(results);
    setSubmitted(true);
    setIsTimeUpDialogOpen(false);
    setShowResults(true);
  };

  if (!test) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5", py: 4 }}>
      <Container maxWidth="lg">
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
            <Typography variant="h4">{test.testName}</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <TimerIcon color={timeLeft < 300 ? "error" : "primary"} />
              <Typography
                variant="h5"
                color={timeLeft < 300 ? "error" : "primary"}
                sx={{ fontFamily: "monospace" }}
              >
                {formatTime(timeLeft)}
              </Typography>
            </Box>
          </Box>
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {test.questions.map((_, index) => (
              <Grid item key={index}>
                <Button
                  variant={currentQuestion === index ? "contained" : "outlined"}
                  onClick={() => setCurrentQuestion(index)}
                  sx={{
                    minWidth: "40px",
                    bgcolor: answers[index] !== null ? "#e3f2fd" : undefined,
                  }}
                >
                  {index + 1}
                </Button>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Question {currentQuestion + 1} of {test.questions.length}
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              {test.questions[currentQuestion].question}
            </Typography>
            <RadioGroup
              value={answers[currentQuestion] ?? ""}
              onChange={(e) => handleAnswerChange(e.target.value)}
            >
              {test.questions[currentQuestion].options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={index}
                  control={<Radio />}
                  label={option}
                  sx={{
                    mb: 1,
                    p: 1,
                    borderRadius: 1,
                    "&:hover": { bgcolor: "#f5f5f5" },
                  }}
                />
              ))}
            </RadioGroup>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="outlined"
              disabled={currentQuestion === 0}
              onClick={() => setCurrentQuestion((prev) => prev - 1)}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsSubmitDialogOpen(true)}
            >
              Submit Test
            </Button>
            <Button
              variant="outlined"
              disabled={currentQuestion === test.questions.length - 1}
              onClick={() => setCurrentQuestion((prev) => prev + 1)}
            >
              Next
            </Button>
          </Box>
        </Paper>
      </Container>
      <Dialog
        open={isSubmitDialogOpen}
        onClose={() => setIsSubmitDialogOpen(false)}
      >
        <DialogTitle>Confirm Submission</DialogTitle>
        <DialogContent>
          <Typography>
            {answers.filter((a) => a === null).length} questions are unanswered.
            Are you sure you want to submit?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsSubmitDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isTimeUpDialogOpen} onClose={handleTimeUp}>
        <DialogTitle>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <WarningIcon color="error" />
            Time's Up!
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography>
            Your time is up! The test will be automatically submitted.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleTimeUp} variant="contained" color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={showResults}
        maxWidth="md"
        fullWidth
        onClose={() => setShowResults(false)}
      >
        <DialogTitle>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {testResults?.isPassed ? (
              <CheckCircleIcon color="success" fontSize="large" />
            ) : (
              <CancelIcon color="error" fontSize="large" />
            )}
            Test Results
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 3 }}>
            <Alert
              severity={testResults?.isPassed ? "success" : "error"}
              sx={{ mb: 2 }}
            >
              {testResults?.isPassed
                ? "Congratulations! You passed the test!"
                : "Unfortunately, you did not pass the test."}
            </Alert>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Summary:
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary={`Score: ${testResults?.percentage}%`}
                  secondary={`${testResults?.correctAnswers} out of ${testResults?.totalQuestions} questions correct`}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`Passing Criteria: ${test.passingCriteria} correct answers`}
                  secondary={`Unanswered Questions: ${testResults?.unansweredCount}`}
                />
              </ListItem>
            </List>
            <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
              Detailed Results:
            </Typography>
            <List>
              {testResults?.detailedAnswers.map((result, index) => (
                <ListItem
                  key={index}
                  sx={{
                    bgcolor: result.isCorrect ? "success.light" : "error.light",
                    mb: 1,
                    borderRadius: 1,
                  }}
                >
                  <ListItemIcon>
                    {result.isCorrect ? (
                      <CheckCircleIcon color="success" />
                    ) : (
                      <CancelIcon color="error" />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={`Question ${index + 1}: ${result.question}`}
                    secondary={
                      <>
                        <Typography component="span" display="block">
                          Your Answer: {result.userAnswer}
                        </Typography>
                        {!result.isCorrect && (
                          <Typography component="span" display="block">
                            Correct Answer: {result.correctAnswer}
                          </Typography>
                        )}
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowResults(false);
              navigate("/student/dashboard");
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TestTaker;
