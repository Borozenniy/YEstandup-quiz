const createGameSession = async (quizId) => {
  const response = await fetch('http://localhost:5000/session/create-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ quizId: quizId }),
  });

  const data = await response.json();
  return data;
};

export { createGameSession };
