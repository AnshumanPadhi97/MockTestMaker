import React from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  LinearProgress,
  Button,
  Chip,
} from "@mui/material";
import {
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  PlayArrow as PlayArrowIcon,
  Timeline as TimelineIcon,
  TrendingUp as TrendingUpIcon,
  Assessment as AssessmentIcon,
  Warning as WarningIcon,
} from "@mui/icons-material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  // Sample data - in a real app, this would come from your backend
  const upcomingTests = [
    {
      id: 1,
      name: "Mathematics Final",
      duration: 60,
      deadline: "2024-12-25",
      totalQuestions: 30,
    },
    {
      id: 2,
      name: "Physics Quiz",
      duration: 45,
      deadline: "2024-12-28",
      totalQuestions: 20,
    },
    {
      id: 3,
      name: "Chemistry Test",
      duration: 30,
      deadline: "2024-12-30",
      totalQuestions: 25,
    },
  ];

  const completedTests = [
    {
      id: 4,
      name: "Biology Mid-term",
      score: 85,
      totalQuestions: 40,
      correctAnswers: 34,
      date: "2024-12-15",
    },
    {
      id: 5,
      name: "English Quiz",
      score: 92,
      totalQuestions: 25,
      correctAnswers: 23,
      date: "2024-12-10",
    },
    {
      id: 6,
      name: "History Test",
      score: 78,
      totalQuestions: 30,
      correctAnswers: 23,
      date: "2024-12-05",
    },
  ];

  const performanceData = [
    { name: "Week 1", score: 75 },
    { name: "Week 2", score: 82 },
    { name: "Week 3", score: 88 },
    { name: "Week 4", score: 85 },
    { name: "Week 5", score: 92 },
  ];

  const stats = {
    averageScore: 85,
    testsCompleted: completedTests.length,
    upcomingTests: upcomingTests.length,
    bestSubject: "English",
  };

  const navigate = useNavigate();

  const handleStartTest = (testId) => {
    navigate(`/test/${testId}`);
  };
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={3}>
          <Paper
            elevation={3}
            sx={{ p: 2, display: "flex", alignItems: "center" }}
          >
            <AssessmentIcon
              sx={{ fontSize: 40, color: "primary.main", mr: 2 }}
            />
            <Box>
              <Typography color="textSecondary" variant="body2">
                Average Score
              </Typography>
              <Typography variant="h4">{stats.averageScore}%</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper
            elevation={3}
            sx={{ p: 2, display: "flex", alignItems: "center" }}
          >
            <CheckCircleIcon
              sx={{ fontSize: 40, color: "success.main", mr: 2 }}
            />
            <Box>
              <Typography color="textSecondary" variant="body2">
                Tests Completed
              </Typography>
              <Typography variant="h4">{stats.testsCompleted}</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper
            elevation={3}
            sx={{ p: 2, display: "flex", alignItems: "center" }}
          >
            <ScheduleIcon sx={{ fontSize: 40, color: "warning.main", mr: 2 }} />
            <Box>
              <Typography color="textSecondary" variant="body2">
                Upcoming Tests
              </Typography>
              <Typography variant="h4">{stats.upcomingTests}</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper
            elevation={3}
            sx={{ p: 2, display: "flex", alignItems: "center" }}
          >
            <TrendingUpIcon sx={{ fontSize: 40, color: "info.main", mr: 2 }} />
            <Box>
              <Typography color="textSecondary" variant="body2">
                Best Subject
              </Typography>
              <Typography variant="h4">{stats.bestSubject}</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography
              variant="h6"
              sx={{ display: "flex", alignItems: "center", mb: 2 }}
            >
              <ScheduleIcon sx={{ mr: 1 }} /> Upcoming Tests
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {upcomingTests.map((test) => (
                <Card key={test.id} variant="outlined">
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <Typography variant="subtitle1" fontWeight="bold">
                        {test.name}
                      </Typography>
                      <Chip
                        icon={<WarningIcon />}
                        label={`Due: ${new Date(
                          test.deadline
                        ).toLocaleDateString()}`}
                        color="warning"
                        size="small"
                      />
                    </Box>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ mb: 2 }}
                    >
                      Duration: {test.duration} minutes • {test.totalQuestions}{" "}
                      questions
                    </Typography>
                    <Button
                      variant="contained"
                      startIcon={<PlayArrowIcon />}
                      size="small"
                      onClick={() => handleStartTest(test.id)}
                    >
                      Start Test
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography
              variant="h6"
              sx={{ display: "flex", alignItems: "center", mb: 2 }}
            >
              <TimelineIcon sx={{ mr: 1 }} /> Performance Trend
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#1976d2"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography
              variant="h6"
              sx={{ display: "flex", alignItems: "center", mb: 3 }}
            >
              <CheckCircleIcon sx={{ mr: 1 }} /> Completed Tests
            </Typography>
            <Grid container spacing={3}>
              {completedTests.map((test) => (
                <Grid item xs={12} md={4} key={test.id}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {test.name}
                      </Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 1 }}
                      >
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          sx={{ mr: 1 }}
                        >
                          Score:
                        </Typography>
                        <Typography variant="h5" color="primary">
                          {test.score}%
                        </Typography>
                      </Box>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        gutterBottom
                      >
                        Correct Answers: {test.correctAnswers}/
                        {test.totalQuestions}
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={test.score}
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                      <Typography
                        variant="caption"
                        color="textSecondary"
                        sx={{ mt: 1, display: "block" }}
                      >
                        Completed on {new Date(test.date).toLocaleDateString()}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default StudentDashboard;
