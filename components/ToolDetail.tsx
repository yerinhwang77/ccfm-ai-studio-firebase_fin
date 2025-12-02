
import React, { useState } from 'react';
import { Tool, User } from '../types';
import { Copy, ExternalLink, BookOpen, Shield, ChevronLeft, ChevronRight, Eye, EyeOff, Check, Lock, ArrowLeft, AlertTriangle, MessageSquare, X } from 'lucide-react';

interface ToolDetailProps {
  tool: Tool;
  user: User;
  onBack: () => void;
  onReport: (content: string, type: 'Deletion' | 'Correction') => void;
}

export const ToolDetail: React.FC<ToolDetailProps> = ({ tool, user, onBack, onReport }) => {
  const [activeAccountIndex, setActiveAccountIndex] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  
  // Reporting Modal State
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportType, setReportType] = useState<'Deletion' | 'Correction'>('Deletion');
  const [reportContent, setReportContent] = useState('');

  const hasAccounts = tool.accounts && tool.accounts.length > 0;
  const activeAccount = hasAccounts ? tool.accounts[activeAccountIndex] : null;
  const totalAccounts = hasAccounts ? tool.accounts.length : 0;

  const isManagedRestricted = tool.isManaged && !user.isSystem;

  const nextAccount = () => {
    if (!hasAccounts) return;
    setActiveAccountIndex((prev) => (prev + 1) % totalAccounts);
    setShowPassword(false);
  };

  const prevAccount = () => {
    if (!hasAccounts) return;
    setActiveAccountIndex((prev) => (prev - 1 + totalAccounts) % totalAccounts);
    setShowPassword(false);
  };

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };
  
  const handleSubmitReport = () => {
      onReport(reportContent, reportType);
      setIsReportModalOpen(false);
      setReportContent('');
  };

  const hasManual = tool.manualUrl && tool.manualUrl.trim() !== '';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header / Nav */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-30 px-4 h-16 flex items-center shadow-sm">
        <button 
          onClick={onBack}
          className="flex items-center text-gray-500 hover:text-gray-900 transition-colors text-sm font-medium"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          돌아가기
        </button>
      </div>

      <div className="flex-1 max-w-2xl w-full mx-auto p-6 flex flex-col items-center justify-center min-h-[80vh] relative">
        
        {/* Tool Branding */}
        <div className="text-center mb-10 w-full animate-in slide-in-from-bottom-4 duration-500">
          <div className="mx-auto h-32 w-32 rounded-[2rem] bg-white border border-gray-100 shadow-2xl p-4 mb-8 flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
            {tool.logoUrl && (tool.logoUrl.startsWith('http') || tool.logoUrl.startsWith('data:')) ? (
              <img src={tool.logoUrl} alt={tool.name} className="w-full h-full object-contain" />
            ) : (
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-6xl">
                {tool.name.substring(0, 1)}
              </div>
            )}
          </div>
          
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-3">{tool.name}</h1>
          <p className="text-gray-500 text-lg max-w-lg mx-auto leading-relaxed">{tool.description}</p>
          
          <div className="mt-6 flex justify-center gap-2">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-gray-100 text-gray-600 border border-gray-200">
               {tool.category}
            </span>
            {tool.isManaged && (
               <span className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full text-sm font-bold bg-amber-50 text-amber-600 border border-amber-100">
                  <Shield className="h-4 w-4" /> Managed
               </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
           <a 
             href={tool.linkUrl || '#'} 
             target="_blank" 
             rel="noopener noreferrer"
             className="flex items-center justify-center gap-3 py-4 px-6 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 hover:-translate-y-1"
           >
             <ExternalLink className="h-5 w-5" />
             사이트 바로가기
           </a>
           
           {hasManual ? (
             <a 
               href={tool.manualUrl} 
               target="_blank" 
               rel="noopener noreferrer"
               className="flex items-center justify-center gap-3 py-4 px-6 bg-white text-gray-800 border border-gray-200 rounded-2xl font-bold hover:bg-gray-50 transition-all hover:-translate-y-1 shadow-sm"
             >
               <BookOpen className="h-5 w-5" />
               사용 매뉴얼
             </a>
           ) : (
             <button disabled className="flex items-center justify-center gap-3 py-4 px-6 bg-gray-50 text-gray-400 rounded-2xl font-bold border border-gray-100 cursor-not-allowed">
               <BookOpen className="h-5 w-5" />
               매뉴얼 준비중
             </button>
           )}
        </div>

        {/* Account Info Card - Only Show if accounts exist */}
        {hasAccounts && (
            <div className="w-full max-w-lg mt-12 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="p-6 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                    <div className="w-1 h-4 bg-gray-900 rounded-full"></div>
                    계정 정보
                </h3>
                {totalAccounts > 1 && (
                    <div className="flex items-center gap-3 text-sm font-medium text-gray-500">
                        <button onClick={prevAccount} className="p-1 hover:bg-white rounded-md shadow-sm border border-transparent hover:border-gray-200 transition-all"><ChevronLeft className="h-4 w-4"/></button>
                        <span>{activeAccountIndex + 1} / {totalAccounts}</span>
                        <button onClick={nextAccount} className="p-1 hover:bg-white rounded-md shadow-sm border border-transparent hover:border-gray-200 transition-all"><ChevronRight className="h-4 w-4"/></button>
                    </div>
                )}
            </div>

            <div className="p-6">
                {isManagedRestricted ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                        <div className="bg-amber-100 p-4 rounded-full mb-4">
                            <Lock className="h-8 w-8 text-amber-600" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">접근 제한됨 (Managed Tool)</h3>
                        <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
                            이 툴은 크레딧/비용 관리를 위해<br/>
                            중앙 관리 부서(AIQC/CD실)를 통해서만<br/>
                            계정 정보를 확인할 수 있습니다.
                        </p>
                    </div>
                ) : activeAccount && (
                    <div className="space-y-5">
                    {/* ID Field */}
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 ml-1">ID / Email</label>
                        <div className="flex items-center bg-gray-50 rounded-xl border border-gray-200 p-1 focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-300 transition-all">
                            <input 
                            readOnly 
                            value={activeAccount.accountId}
                            className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-semibold text-gray-700 px-3 py-2"
                            />
                            <button 
                            onClick={() => copyToClipboard(activeAccount.accountId, 'id')}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-white rounded-lg transition-all shadow-sm"
                            >
                            {copiedField === 'id' ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>

                    {/* PW Field */}
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 ml-1">Password</label>
                        <div className="flex items-center bg-gray-50 rounded-xl border border-gray-200 p-1 focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-300 transition-all">
                            <input 
                            type={showPassword ? "text" : "password"}
                            readOnly 
                            value={activeAccount.accountPw}
                            className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-mono font-semibold text-gray-700 px-3 py-2 tracking-wider"
                            />
                            <button 
                            onClick={() => setShowPassword(!showPassword)}
                            className="p-2 text-gray-400 hover:text-gray-700 hover:bg-white rounded-lg transition-all mr-1"
                            >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                            <button 
                            onClick={() => copyToClipboard(activeAccount.accountPw, 'pw')}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-white rounded-lg transition-all shadow-sm"
                            >
                            {copiedField === 'pw' ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>
                    </div>
                )}
            </div>
            </div>
        )}

        {/* Report / Delete Request Button */}
        <div className="mt-8 text-center">
            <button 
                onClick={() => setIsReportModalOpen(true)}
                className="text-xs text-gray-400 underline hover:text-red-500 transition-colors flex items-center gap-1 mx-auto"
            >
                <AlertTriangle className="h-3 w-3" />
                툴 정보가 변경되었거나 사용하지 않는 툴인가요? [삭제/수정 건의]
            </button>
        </div>

        {/* Report Modal */}
        {isReportModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
                <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
                    <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                        <h3 className="font-bold text-gray-800 flex items-center gap-2">
                            <MessageSquare className="h-4 w-4 text-blue-600" />
                            관리자에게 건의하기
                        </h3>
                        <button onClick={() => setIsReportModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                    <div className="p-5 space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-2">건의 유형</label>
                            <div className="flex bg-gray-100 rounded-lg p-1">
                                <button 
                                    onClick={() => setReportType('Deletion')}
                                    className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${reportType === 'Deletion' ? 'bg-white shadow-sm text-red-600' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    삭제 요청
                                </button>
                                <button 
                                    onClick={() => setReportType('Correction')}
                                    className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${reportType === 'Correction' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    정보 수정 요청
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-2">
                                {reportType === 'Deletion' ? '삭제 요청 사유 (선택)' : '수정할 내용'}
                            </label>
                            <textarea 
                                className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px] resize-none"
                                placeholder={reportType === 'Deletion' ? "예: 더 이상 사용하지 않는 툴입니다." : "예: 비밀번호가 변경되었습니다."}
                                value={reportContent}
                                onChange={(e) => setReportContent(e.target.value)}
                            />
                        </div>
                        <button 
                            onClick={handleSubmitReport}
                            className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100"
                        >
                            건의사항 전송
                        </button>
                    </div>
                </div>
            </div>
        )}

      </div>
    </div>
  );
};
