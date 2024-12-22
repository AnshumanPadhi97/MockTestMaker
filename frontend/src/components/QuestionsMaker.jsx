import React, { useState } from "react";
import {
  Button,
  TextField,
  Card,
  CardContent,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Container,
  Box,
  IconButton,
  Alert,
  Paper,
  Tooltip,
  InputAdornment,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  Help as HelpIcon,
  Edit as EditIcon,
  Check as CheckIcon,
  ArrowBack as ArrowBackIcon,
  School as SchoolIcon,
  Info as InfoIcon,
  Timer as TimerIcon,
} from "@mui/icons-material";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const QuestionsMaker = () => {
  const navigate = useNavigate();
  const [testName, setTestName] = useState("");
  const [questions, setQuestions] = useState([]);
  const [passingCount, setPassingCount] = useState("");
  const [showFinalForm, setShowFinalForm] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
  });
  const [duration, setDuration] = useState("");

  const handleOptionChange = (index, value) => {
    const newOptions = [...currentQuestion.options];
    newOptions[index] = value;
    setCurrentQuestion({ ...currentQuestion, options: newOptions });
  };

  const handleAddQuestion = () => {
    if (
      currentQuestion.question &&
      currentQuestion.options.every((opt) => opt)
    ) {
      setQuestions([...questions, currentQuestion]);
      setCurrentQuestion({
        question: "",
        options: ["", "", "", ""],
        correctAnswer: 0,
      });
      toast.success("Question saved");
    }
  };

  const handleDeleteQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
    toast.success("Question deleted");
  };

  const handleSubmit = () => {
    if (questions.length > 0 && testName && passingCount) {
      const testData = {
        testName,
        questions,
        passingCriteria: parseInt(passingCount),
        duration: parseInt(duration),
      };
      toast.success("Test Created Successfully");
      navigate("/teacher/dashboard");
    }
  };

  const isQuestionValid =
    currentQuestion.question &&
    currentQuestion.options.every((opt) => opt.trim() !== "");

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f5f5",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        {!showFinalForm ? (
          <Paper elevation={3} sx={{ p: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
              <SchoolIcon sx={{ fontSize: 40, mr: 2, color: "primary.main" }} />
              <Typography variant="h4" component="h1">
                Create Mock Test
              </Typography>
            </Box>
            <TextField
              fullWidth
              label="Test Name"
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
              sx={{ mb: 4 }}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Test Duration"
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              sx={{ mb: 4 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <TimerIcon sx={{ mr: 1 }} />
                    minutes
                  </InputAdornment>
                ),
                inputProps: { min: 1 },
              }}
              variant="outlined"
            />
            <Card sx={{ mb: 4, bgcolor: "#fafafa" }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <EditIcon sx={{ mr: 1, color: "primary.main" }} />
                  <Typography variant="h6">Add New Question</Typography>
                </Box>
                <TextField
                  fullWidth
                  label="Question Text"
                  value={currentQuestion.question}
                  onChange={(e) =>
                    setCurrentQuestion({
                      ...currentQuestion,
                      question: e.target.value,
                    })
                  }
                  sx={{ mb: 3 }}
                  multiline
                  rows={2}
                />
                <FormControl component="fieldset" sx={{ width: "100%" }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      Options
                    </Typography>
                    <Tooltip title="Select the correct answer using the radio button">
                      <IconButton size="small" sx={{ ml: 1 }}>
                        <HelpIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <RadioGroup
                    value={currentQuestion.correctAnswer}
                    onChange={(e) =>
                      setCurrentQuestion({
                        ...currentQuestion,
                        correctAnswer: parseInt(e.target.value),
                      })
                    }
                  >
                    {currentQuestion.options.map((option, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mb: 2,
                          p: 2,
                          bgcolor:
                            currentQuestion.correctAnswer === index
                              ? "#e3f2fd"
                              : "white",
                          borderRadius: 1,
                          transition: "background-color 0.2s",
                          "&:hover": {
                            bgcolor:
                              currentQuestion.correctAnswer === index
                                ? "#e3f2fd"
                                : "#f5f5f5",
                          },
                        }}
                      >
                        <FormControlLabel
                          value={index}
                          control={
                            <Radio
                              color="primary"
                              icon={
                                <RadioButtonIcon
                                  index={index + 1}
                                  selected={false}
                                />
                              }
                              checkedIcon={
                                <RadioButtonIcon
                                  index={index + 1}
                                  selected={true}
                                />
                              }
                            />
                          }
                          label={`Option ${index + 1}`}
                        />
                        <TextField
                          value={option}
                          onChange={(e) =>
                            handleOptionChange(index, e.target.value)
                          }
                          sx={{ flexGrow: 1, ml: 2 }}
                          placeholder={`Enter option ${index + 1}`}
                          variant="outlined"
                          size="small"
                        />
                      </Box>
                    ))}
                  </RadioGroup>
                </FormControl>
                <Button
                  variant="contained"
                  onClick={handleAddQuestion}
                  startIcon={<AddIcon />}
                  disabled={!isQuestionValid}
                  sx={{ mt: 3 }}
                >
                  Save Question
                </Button>
              </CardContent>
            </Card>
            {questions.length > 0 && (
              <Paper sx={{ p: 3, mb: 4 }}>
                <Typography
                  variant="h6"
                  sx={{ mb: 2, display: "flex", alignItems: "center" }}
                >
                  <CheckIcon sx={{ mr: 1 }} />
                  Added Questions ({questions.length})
                </Typography>
                {questions.map((q, index) => (
                  <Card key={index} sx={{ mb: 2, bgcolor: "#fff" }}>
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                        }}
                      >
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: "bold", mb: 1 }}
                          >
                            Question {index + 1}: {q.question}
                          </Typography>
                          <Box sx={{ pl: 2 }}>
                            {q.options.map((opt, optIndex) => (
                              <Typography
                                key={optIndex}
                                sx={{
                                  color:
                                    q.correctAnswer === optIndex
                                      ? "success.main"
                                      : "text.primary",
                                  fontWeight:
                                    q.correctAnswer === optIndex
                                      ? "bold"
                                      : "normal",
                                  mb: 0.5,
                                }}
                              >
                                {optIndex + 1}. {opt}
                                {q.correctAnswer === optIndex && " ✓"}
                              </Typography>
                            ))}
                          </Box>
                        </Box>
                        <IconButton
                          onClick={() => handleDeleteQuestion(index)}
                          color="error"
                          sx={{ ml: 2 }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Paper>
            )}
            {questions.length > 0 && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => setShowFinalForm(true)}
                size="large"
                sx={{ mt: 2 }}
              >
                Next: Set Passing Criteria
              </Button>
            )}
          </Paper>
        ) : (
          <Paper elevation={3} sx={{ p: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
              <SchoolIcon sx={{ fontSize: 40, mr: 2, color: "primary.main" }} />
              <Typography variant="h5">Set Passing Criteria</Typography>
            </Box>
            <Alert severity="info" sx={{ mb: 4 }} icon={<InfoIcon />}>
              Total questions in test: {questions.length}
            </Alert>
            <TextField
              type="number"
              label="Minimum correct answers to pass"
              value={passingCount}
              onChange={(e) => setPassingCount(e.target.value)}
              inputProps={{ min: 1, max: questions.length }}
              sx={{ mb: 4 }}
              fullWidth
            />
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="outlined"
                onClick={() => setShowFinalForm(false)}
                startIcon={<ArrowBackIcon />}
              >
                Back to Questions
              </Button>
              <Button
                variant="contained"
                onClick={handleSubmit}
                startIcon={<CheckIcon />}
                disabled={
                  !passingCount ||
                  passingCount < 1 ||
                  passingCount > questions.length
                }
              >
                Create Test
              </Button>
            </Box>
          </Paper>
        )}
      </Container>
    </Box>
  );
};

const RadioButtonIcon = ({ index, selected }) => (
  <Box
    sx={{
      width: 30,
      height: 30,
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      bgcolor: selected ? "primary.main" : "transparent",
      border: "2px solid",
      borderColor: selected ? "primary.main" : "grey.400",
      color: selected ? "white" : "grey.700",
      transition: "all 0.2s",
    }}
  >
    {index}
  </Box>
);

export default QuestionsMaker;
