export const createQuiz = async (quiz) => {
  const response = await fetch('http://localhost:5000/quizzes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
    body: JSON.stringify(quiz),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
