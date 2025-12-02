import React, { useState } from 'react';
import { LayoutGrid, X, User } from 'lucide-react';

interface LoginProps {
  onLogin: (email: string, name?: string, picture?: string) => void;
  error: string | null;
}

export const Login: React.FC<LoginProps> = ({ onLogin, error }) => {
  const [showAccountChooser, setShowAccountChooser] = useState(false);

  const handleSimulatedLogin = (email: string, name: string, roleDescription: string) => {
    // Generate a consistent avatar based on name
    const picture = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff`;
    onLogin(email, name, picture);
    setShowAccountChooser(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="mx-auto h-20 w-20 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
          <LayoutGrid className="h-10 w-10 text-white" />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          CCFM AI STUDIO
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          부서별 AI 툴 접속 및 관리를 위한 대시보드
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-4 shadow-xl rounded-xl sm:px-10 border border-gray-100 flex flex-col items-center">
          
          <div className="w-full mb-6 text-center">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              관계자 외 접근 금지
            </h3>
            
            <div className="flex justify-center w-full">
              {/* Simulated Google Button */}
              <button
                onClick={() => setShowAccountChooser(true)}
                className="flex items-center justify-center bg-white border border-gray-300 rounded shadow-sm px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:shadow transition-all w-full max-w-[300px]"
              >
                <img 
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                  alt="Google G" 
                  className="w-5 h-5 mr-3"
                />
                Google 계정으로 로그인
              </button>
            </div>
          </div>

          <div className="text-xs text-gray-400 text-center space-y-1">
             <p>허용된 도메인:</p>
             <p className="font-mono">@samchomaeul.com</p>
             <p className="font-mono">@mkm20201101.com</p>
             <p className="font-mono">@ccfm.co.kr</p>
          </div>

          {error && (
            <div className="mt-6 w-full rounded-md bg-red-50 p-4 border border-red-100">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">접근 거부 (Access Denied)</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Simulated Google Account Chooser Modal */}
      {showAccountChooser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm overflow-hidden animate-fade-in-up">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <div className="flex items-center gap-2">
                 <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5"/>
                 <span className="font-medium text-gray-600">계정 선택</span>
              </div>
              <button onClick={() => setShowAccountChooser(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-2">
              <p className="px-4 py-2 text-xs text-gray-500">CCFM AI STUDIO로 이동</p>
              
              <div className="space-y-1">
                <AccountOption 
                  email="staff@samchomaeul.com" 
                  name="김유통" 
                  desc="유통콘텐츠 사업부"
                  onClick={() => handleSimulatedLogin('staff@samchomaeul.com', '김유통', 'Distribution User')}
                />
                <AccountOption 
                  email="staff@mkm20201101.com" 
                  name="이마케팅" 
                  desc="마케팅/브랜드 사업부"
                  onClick={() => handleSimulatedLogin('staff@mkm20201101.com', '이마케팅', 'Marketing User')}
                />
                <AccountOption 
                  email="staff@ccfm.co.kr" 
                  name="박콘크리트" 
                  desc="콘크리트 파머스"
                  onClick={() => handleSimulatedLogin('staff@ccfm.co.kr', '박콘크리트', 'Concrete User')}
                />
                <div className="my-2 border-t border-gray-100"></div>
                <AccountOption 
                  email="system@mkm20201101.com" 
                  name="시스템 관리자" 
                  desc="전체 관리자 권한"
                  isAdmin
                  onClick={() => handleSimulatedLogin('system@mkm20201101.com', '시스템 관리자', 'Admin')}
                />
                <div className="my-2 border-t border-gray-100"></div>
                <AccountOption 
                  email="intruder@gmail.com" 
                  name="외부인" 
                  desc="접근 권한 없음 테스트"
                  onClick={() => handleSimulatedLogin('intruder@gmail.com', '외부인', 'Unauthorized')}
                />
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 text-center border-t border-gray-100">
                <p className="text-[10px] text-gray-400">
                    개발 목적의 시뮬레이션입니다.
                </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper component for the list items
const AccountOption: React.FC<{ email: string; name: string; desc: string; isAdmin?: boolean; onClick: () => void }> = ({ email, name, desc, isAdmin, onClick }) => (
  <button 
    onClick={onClick}
    className="w-full flex items-center px-4 py-3 hover:bg-gray-50 transition-colors text-left group"
  >
    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs mr-3 ${isAdmin ? 'bg-purple-600' : 'bg-blue-500'}`}>
      {name[0]}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-center">
         <p className="text-sm font-medium text-gray-900 truncate">{name}</p>
         {isAdmin && <span className="text-[10px] bg-purple-100 text-purple-700 px-1.5 rounded">Admin</span>}
      </div>
      <p className="text-xs text-gray-500 truncate">{email}</p>
      <p className="text-[10px] text-gray-400 mt-0.5">{desc}</p>
    </div>
  </button>
);