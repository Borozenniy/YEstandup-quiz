const createQuiz = async (quiz) => {
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

const fetchQuizzes = async () => {
  try {
    const response = await fetch(`http://localhost:5000/quiz/get-quizzes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const quizzes = await response.json();
    return quizzes;
    //return quizzes.result;
  } catch (error) {
    throw new Error('Error with fetching quizzes:' + error);
  }
};

export { createQuiz, fetchQuizzes };
