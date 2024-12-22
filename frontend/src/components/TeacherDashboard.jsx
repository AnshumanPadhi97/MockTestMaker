import React from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
} from "@mui/material";
import {
  Assessment as AssessmentIcon,
  People as PeopleIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";
const TeacherDashboard = () => {
  // Sample data - would come from your backend
  const testStats = {
    totalTests: 15,
    activeTests: 8,
    completedTests: 7,
    totalStudents: 120,
    totalAttempts: 450,
    averageScore: 76,
    passRate: 82,
  };

  const recentTests = [
    {
      id: 1,
      name: "Mathematics Final Exam",
      totalStudents: 40,
      attempted: 35,
      passed: 30,
      averageScore: 78,
      deadline: "2024-12-25",
    },
    {
      id: 2,
      name: "Physics Quiz",
      totalStudents: 38,
      attempted: 38,
      passed: 32,
      averageScore: 82,
      deadline: "2024-12-28",
    },
    {
      id: 3,
      name: "Chemistry Test",
      totalStudents: 42,
      attempted: 40,
      passed: 35,
      averageScore: 75,
      deadline: "2024-12-30",
    },
  ];

  const studentPerformance = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      testsAttempted: 5,
      averageScore: 85,
      testsPassed: 4,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      testsAttempted: 5,
      averageScore: 92,
      testsPassed: 5,
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      testsAttempted: 4,
      averageScore: 68,
      testsPassed: 3,
    },
  ];

  const pieData = [
    { name: "Passed", value: testStats.passRate },
    { name: "Failed", value: 100 - testStats.passRate },
  ];
  const COLORS = ["#4caf50", "#f44336"];

  const navigate = useNavigate();
  const handleCreateTest = () => {
    navigate("/teacher/create-test");
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <AssessmentIcon
              sx={{ fontSize: 40, mr: 2, color: "primary.main" }}
            />
            <Typography variant="h4">Teacher Dashboard</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper
            elevation={3}
            sx={{ p: 2, display: "flex", alignItems: "center" }}
          >
            <Box>
              <Typography color="textSecondary" variant="body2">
                Total Tests
              </Typography>
              <Typography variant="h4">{testStats.totalTests}</Typography>
              <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                <Chip
                  label={`${testStats.activeTests} Active`}
                  size="small"
                  color="primary"
                />
                <Chip
                  label={`${testStats.completedTests} Completed`}
                  size="small"
                  color="success"
                />
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper
            elevation={3}
            sx={{ p: 2, display: "flex", alignItems: "center" }}
          >
            <Box>
              <Typography color="textSecondary" variant="body2">
                Students
              </Typography>
              <Typography variant="h4">{testStats.totalStudents}</Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                {testStats.totalAttempts} Total Attempts
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper
            elevation={3}
            sx={{ p: 2, display: "flex", alignItems: "center" }}
          >
            <Box>
              <Typography color="textSecondary" variant="body2">
                Average Score
              </Typography>
              <Typography variant="h4">{testStats.averageScore}%</Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Across all tests
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper elevation={3} sx={{ p: 2, height: "100%" }}>
            <Typography color="textSecondary" variant="body2">
              Pass Rate
            </Typography>
            <Box sx={{ height: 100, mt: -2 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={25}
                    outerRadius={40}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Box>
            <Typography variant="h4" textAlign="center" mt={-2}>
              {testStats.passRate}%
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography variant="h6">Recent Tests</Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleCreateTest}
              >
                Create New Test
              </Button>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Test Name</TableCell>
                    <TableCell align="center">Students</TableCell>
                    <TableCell align="center">Attempted</TableCell>
                    <TableCell align="center">Passed</TableCell>
                    <TableCell align="center">Avg. Score</TableCell>
                    <TableCell align="center">Deadline</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentTests.map((test) => (
                    <TableRow key={test.id}>
                      <TableCell>{test.name}</TableCell>
                      <TableCell align="center">{test.totalStudents}</TableCell>
                      <TableCell align="center">{test.attempted}</TableCell>
                      <TableCell align="center">
                        <Chip
                          label={`${test.passed}/${test.attempted}`}
                          color={
                            test.passed > test.attempted / 2
                              ? "success"
                              : "error"
                          }
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="center">{test.averageScore}%</TableCell>
                      <TableCell align="center">
                        {new Date(test.deadline).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              <PeopleIcon sx={{ mr: 1, verticalAlign: "middle" }} />
              Student Performance
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Student Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell align="center">Tests Attempted</TableCell>
                    <TableCell align="center">Tests Passed</TableCell>
                    <TableCell align="center">Average Score</TableCell>
                    <TableCell align="center">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {studentPerformance.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell align="center">
                        {student.testsAttempted}
                      </TableCell>
                      <TableCell align="center">
                        {student.testsPassed}
                      </TableCell>
                      <TableCell align="center">
                        {student.averageScore}%
                      </TableCell>
                      <TableCell align="center">
                        {student.averageScore >= 70 ? (
                          <Chip
                            icon={<CheckCircleIcon />}
                            label="Good Standing"
                            color="success"
                            size="small"
                          />
                        ) : (
                          <Chip
                            icon={<CancelIcon />}
                            label="Needs Improvement"
                            color="error"
                            size="small"
                          />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TeacherDashboard;
