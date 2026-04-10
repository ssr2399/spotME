export const getAIAdvice = async (density: number): Promise<string> => {
  // Simulating network delay for realistic feel
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (density < 40) {
    return "Crowds are low. It's a great time to explore or grab food.";
  } else if (density < 70) {
    return "Sections are getting busy. Take your time navigating.";
  } else {
    return "High density detected. Consider using the Quiet Room if overwhelmed.";
  }
}
