import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-purple-700 text-white p-4">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-100">
          MBTI爱情配对评估
        </h1>
        <p className="text-xl md:text-2xl mb-10 text-purple-100">
          探索你的MBTI人格类型，了解你在恋爱中的特点和最佳匹配
        </p>
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-4">为什么做MBTI爱情配对测试？</h2>
          <ul className="space-y-3 text-left">
            <li className="flex items-start">
              <span className="bg-white/20 rounded-full p-1 mr-3 mt-1">✓</span>
              <span>了解自己的恋爱风格和偏好</span>
            </li>
            <li className="flex items-start">
              <span className="bg-white/20 rounded-full p-1 mr-3 mt-1">✓</span>
              <span>发现与你最匹配的MBTI人格类型</span>
            </li>
            <li className="flex items-start">
              <span className="bg-white/20 rounded-full p-1 mr-3 mt-1">✓</span>
              <span>获得改善人际关系的建议</span>
            </li>
            <li className="flex items-start">
              <span className="bg-white/20 rounded-full p-1 mr-3 mt-1">✓</span>
              <span>深入理解自己和伴侣的差异</span>
            </li>
          </ul>
        </div>
        <Link
          to="/test"
          className="inline-block bg-white text-purple-700 font-bold py-4 px-8 rounded-full text-lg md:text-xl hover:bg-purple-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          开始测试
        </Link>
        <p className="mt-8 text-sm text-purple-200">
          测试时间约5分钟 | 无需注册 | 完全免费
        </p>
      </div>
    </div>
  );
};

export default Home;