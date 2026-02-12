import React from 'react';
import { LayoutGrid } from 'lucide-react';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

interface LoginProps {
  onLogin: (email: string, name?: string, picture?: string, credential?: string) => void;
  error: string | null;
}

interface JwtPayload {
  email: string;
  name: string;
  picture: string;
  sub: string;
}

export const Login: React.FC<LoginProps> = ({ onLogin, error }) => {

  const handleGoogleSuccess = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      try {
        const decoded = jwtDecode<JwtPayload>(credentialResponse.credential);
        onLogin(decoded.email, decoded.name, decoded.picture, credentialResponse.credential);
      } catch (e) {
        console.error("Login Failed: JWT decode error", e);
      }
    }
  };

  const handleGoogleError = () => {
    console.error('Google Login Failed');
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
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                useOneTap
                theme="outline"
                size="large"
                shape="rectangular"
                width="300"
              />
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
    </div>
  );
};