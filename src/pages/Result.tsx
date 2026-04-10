import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mbtiTypes } from '../store/testStore';

const Result = () => {
  const navigate = useNavigate();
  const [mbtiType, setMbtiType] = useState<string>('');
  const [mbtiData, setMbtiData] = useState<any>(null);
  
  useEffect(() => {
    const storedType = localStorage.getItem('mbtiType');
    if (storedType) {
      setMbtiType(storedType);
      const data = mbtiTypes[storedType as keyof typeof mbtiTypes];
      setMbtiData(data);
    } else {
      navigate('/');
    }
  }, [navigate]);
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `我的MBTI爱情配对分析`,
        text: `我是${mbtiData?.name}(${mbtiType})，快来测试你的MBTI爱情配对吧！`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('链接已复制到剪贴板');
    }
  };
  
  const handleRetake = () => {
    localStorage.removeItem('mbtiType');
    navigate('/test');
  };
  
  if (!mbtiData) {
    return <div className="min-h-screen flex items-center justify-center">加载中...</div>;
  }
  
  // 按匹配度排序其他MBTI类型
  const sortedCompatibility = Object.entries(mbtiData.compatibility)
    .map(([type, score]) => ({ type, score: Number(score) }))
    .sort((a, b) => b.score - a.score);
  
  // 获取匹配度对应的颜色
  const getCompatibilityColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 80) return 'bg-green-400';
    if (score >= 70) return 'bg-yellow-400';
    if (score >= 60) return 'bg-yellow-300';
    return 'bg-red-300';
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* 结果卡片 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mt-8 mb-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              你的MBTI类型是
            </h1>
            <div className="mb-4">
              <img 
                src={mbtiData.image} 
                alt={`${mbtiType} - ${mbtiData.name}`} 
                className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-white shadow-lg"
              />
            </div>
            <div className="inline-block bg-gradient-to-r from-purple-600 to-pink-500 text-white text-3xl font-bold py-2 px-6 rounded-full">
              {mbtiType} - {mbtiData.name}
            </div>
          </div>
          
          {/* 个人分析 */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">个人分析</h2>
            <div className="bg-purple-50 rounded-xl p-6">
              <p className="text-gray-700 mb-4">{mbtiData.description}</p>
              <div className="mb-4">
                <h3 className="font-semibold text-purple-700 mb-2">恋爱风格</h3>
                <p className="text-gray-700">{mbtiData.loveStyle}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-green-600 mb-2">恋爱中的优势</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    {mbtiData.strengths.map((strength: string, index: number) => (
                      <li key={index}>{strength}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-red-600 mb-2">恋爱中的不足</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    {mbtiData.weaknesses.map((weakness: string, index: number) => (
                      <li key={index}>{weakness}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* 配对分析 */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">爱情配对分析</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {sortedCompatibility.map(({ type, score }) => {
                const typeData = mbtiTypes[type as keyof typeof mbtiTypes];
                return (
                  <div 
                    key={type} 
                    className="bg-white border rounded-xl p-3 text-center hover:shadow-md transition-shadow"
                  >
                    <div className="font-bold text-gray-800 mb-1">{type}</div>
                    <div className="text-sm text-gray-600 mb-2">{typeData?.name}</div>
                    <div className="flex items-center justify-center">
                      <div 
                        className={`h-2 rounded-full flex-1 ${getCompatibilityColor(score)}`}
                        title={`匹配度: ${score}%`}
                      ></div>
                      <span className="ml-2 text-sm font-medium text-gray-700">{score.toString()}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* 测试说明 */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">关于测试</h2>
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-700 mb-2">每个提问只有两个选项是否合理？</h3>
              <p className="text-gray-600 mb-4">MBTI测试的每个维度都是二元对立的（如外倾/内倾、感觉/直觉、思考/情感、判断/感知）。这种二分法是MBTI测试的基本设计原则，虽然现实中人们可能处于两个极端之间的某个位置，但简化为二选一有助于快速评估个体的偏好倾向。</p>
              
              <h3 className="font-semibold text-gray-700 mb-2">测试结果是否有科学依据？</h3>
              <p className="text-gray-600">MBTI测试在商业和个人发展领域广泛使用，但在学术心理学中并未被广泛接受为科学有效的评估工具。测试结果可以作为了解自己的参考，但不应被视为绝对的人格定义。人类性格是复杂多变的，受到多种因素影响，因此测试结果应保持开放和参考的态度看待。</p>
            </div>
          </div>
          
          {/* 操作按钮 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button
              onClick={handleShare}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-full hover:shadow-lg transition-all duration-300"
            >
              分享结果
            </button>
            <button
              onClick={handleRetake}
              className="px-6 py-3 bg-gray-200 text-gray-700 font-bold rounded-full hover:bg-gray-300 transition-all duration-300"
            >
              重新测试
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;