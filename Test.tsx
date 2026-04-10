import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTestStore, questions } from '../store/testStore';

const Test = () => {
  const navigate = useNavigate();
  const { 
    answers, 
    currentQuestion, 
    totalQuestions, 
    addAnswer, 
    nextQuestion, 
    getMBTIType 
  } = useTestStore();
  
  const [selectedOption, setSelectedOption] = useState<string>('');
  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;
  
  useEffect(() => {
    if (answers[question.id]) {
      setSelectedOption(answers[question.id]);
    } else {
      setSelectedOption('');
    }
  }, [question.id, answers]);
  
  const handleOptionSelect = (value: string) => {
    setSelectedOption(value);
  };
  
  const handleSubmit = () => {
    if (selectedOption) {
      addAnswer(question.id, selectedOption);
      
      if (currentQuestion < totalQuestions - 1) {
        nextQuestion();
      } else {
        const mbtiType = getMBTIType();
        localStorage.setItem('mbtiType', mbtiType);
        navigate('/result');
      }
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* 进度条 */}
        <div className="mt-8 mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>问题 {currentQuestion + 1}/{totalQuestions}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-gradient-to-r from-purple-600 to-pink-500 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        
        {/* 题目卡片 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {question.text}
          </h2>
          <div className="space-y-4">
            {question.options.map((option) => (
              <div key={option.value}>
                <label className={`flex items-center p-4 rounded-xl cursor-pointer transition-all duration-200 ${selectedOption === option.value ? 'bg-purple-100 border-2 border-purple-500' : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'}`}>
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={option.value}
                    checked={selectedOption === option.value}
                    onChange={() => handleOptionSelect(option.value)}
                    className="w-5 h-5 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="ml-3 text-gray-700">{option.text}</span>
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* 提交按钮 */}
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={!selectedOption}
            className={`px-8 py-3 rounded-full font-bold transition-all duration-300 ${selectedOption ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:shadow-lg transform hover:scale-105' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
          >
            {currentQuestion < totalQuestions - 1 ? '下一题' : '提交测试'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Test;