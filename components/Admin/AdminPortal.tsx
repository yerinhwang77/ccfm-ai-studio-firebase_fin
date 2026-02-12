import React, { useState } from 'react';
import { Tool, Inquiry, Department } from '../../types';
import { ToolManager } from './ToolManager';
import { ArrowLeft, LayoutGrid, Database, MessageSquare, Clock, User, X, CheckCircle } from 'lucide-react';

interface AdminPortalProps {
  tools: Tool[];
  onSaveTool: (tool: Tool) => void;
  onDeleteTool: (id: string) => void;
  onReorderTools: (tools: Tool[]) => void;

  categoryOrders: Record<string, string[]>;
  onUpdateCategoryOrders: (orders: Record<string, string[]>) => void;

  onBack: () => void;
  inquiries: Inquiry[];
  onResolveInquiry: (id: string) => void;
  onMigrateData?: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  tools,
  onSaveTool,
  onDeleteTool,
  onReorderTools,
  categoryOrders,
  onUpdateCategoryOrders,
  onBack,
  inquiries,
  onResolveInquiry,
  onMigrateData
}) => {
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const pendingInquiries = inquiries.filter(i => i.status === 'Pending');
  const pendingCount = pendingInquiries.length;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="text-gray-500 hover:text-gray-700 transition-colors">
              <ArrowLeft className="h-6 w-6" />
            </button>
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <LayoutGrid className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">관리자 포털</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {pendingCount > 0 && (
              <button
                onClick={() => setShowInquiryModal(true)}
                className="bg-red-50 text-red-600 px-3 py-1.5 rounded-full text-xs font-bold border border-red-100 flex items-center gap-1.5 animate-pulse hover:bg-red-100 transition-colors shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                미처리 건의사항 {pendingCount}건 (클릭 시 확인)
              </button>
            )}

            {onMigrateData && (
              <button onClick={onMigrateData} className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 text-white text-xs font-bold rounded hover:bg-gray-700">
                <Database className="h-3 w-3" /> 초기 데이터 업로드(DB)
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ToolManager
          tools={tools}
          onSaveTool={onSaveTool}
          onDeleteTool={onDeleteTool}
          onReorderTools={onReorderTools}
          categoryOrders={categoryOrders}
          onUpdateCategoryOrders={onUpdateCategoryOrders}
          inquiries={inquiries}
          onResolveInquiry={onResolveInquiry}
        />
      </main>

      {/* Global Inquiry Modal */}
      {showInquiryModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div className="flex items-center gap-3">
                <div className="bg-red-100 p-2 rounded-xl text-red-600">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">전체 미처리 건의사항</h2>
                  <p className="text-xs text-gray-500 mt-0.5">답변이 필요한 요청들입니다.</p>
                </div>
              </div>
              <button
                onClick={() => setShowInquiryModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {pendingInquiries.length === 0 ? (
                <div className="text-center py-20">
                  <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">모든 건의사항 완료!</h3>
                  <p className="text-gray-500 text-sm mt-1">확인할 미처리 요청이 없습니다.</p>
                </div>
              ) : (
                pendingInquiries.map((inquiry) => (
                  <div key={inquiry.id} className="bg-red-50/50 border border-red-100 rounded-2xl p-5 hover:bg-red-50 transition-colors group">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${inquiry.type === 'Deletion' ? 'bg-red-100 text-red-700 border-red-200' : 'bg-blue-100 text-blue-700 border-blue-200'}`}>
                            {inquiry.type === 'Deletion' ? '삭제 요청' : '수정 요청'}
                          </span>
                          <span className="text-[10px] font-bold bg-white text-gray-800 border border-gray-200 px-2 py-0.5 rounded-full shadow-sm">
                            {inquiry.toolDepartment}
                          </span>
                          <span className="text-[10px] font-bold bg-gray-900 text-white px-2 py-0.5 rounded-full shadow-sm">
                            {inquiry.toolName}
                          </span>
                          <div className="h-4 w-px bg-gray-200 mx-1 hidden sm:block"></div>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {new Date(inquiry.createdAt).toLocaleString('ko-KR', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p className="text-sm text-gray-900 leading-relaxed font-medium">
                          {inquiry.content}
                        </p>
                        <div className="mt-3 flex items-center gap-2 text-[11px] text-gray-400">
                          <User className="h-3 w-3" /> {inquiry.userName} ({inquiry.userEmail})
                        </div>
                      </div>
                      <button
                        onClick={() => onResolveInquiry(inquiry.id)}
                        className="bg-white border border-red-200 text-red-600 hover:bg-red-600 hover:text-white px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 whitespace-nowrap self-center"
                      >
                        <CheckCircle className="h-3.5 w-3.5" /> 처리 완료
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
              <button
                onClick={() => setShowInquiryModal(false)}
                className="w-full py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-sm"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
