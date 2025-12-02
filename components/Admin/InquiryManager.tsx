
import React from 'react';
import { Inquiry } from '../../types';
import { CheckCircle, AlertTriangle, Trash2, Clock, User } from 'lucide-react';

interface InquiryManagerProps {
    inquiries: Inquiry[];
    onResolveInquiry: (id: string) => void;
}

export const InquiryManager: React.FC<InquiryManagerProps> = ({ inquiries, onResolveInquiry }) => {
    
    if (inquiries.length === 0) {
        return (
            <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
                <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-gray-300" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">새로운 문의가 없습니다</h3>
                <p className="text-gray-500 text-sm mt-1">모든 요청이 처리되었습니다.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-gray-900">관리자 문의함</h2>
                <span className="text-sm text-gray-500">총 {inquiries.length}건</span>
            </div>

            <div className="space-y-4">
                {inquiries.map((inquiry) => (
                    <div 
                        key={inquiry.id} 
                        className={`bg-white p-6 rounded-xl border shadow-sm transition-all ${inquiry.status === 'Resolved' ? 'opacity-60 border-gray-100' : 'border-l-4 border-l-blue-500 border-gray-200'}`}
                    >
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    {inquiry.type === 'Deletion' ? (
                                        <span className="bg-red-50 text-red-600 text-xs font-bold px-2 py-1 rounded border border-red-100 flex items-center gap-1">
                                            <Trash2 className="h-3 w-3" /> 삭제 요청
                                        </span>
                                    ) : (
                                        <span className="bg-blue-50 text-blue-600 text-xs font-bold px-2 py-1 rounded border border-blue-100 flex items-center gap-1">
                                            <AlertTriangle className="h-3 w-3" /> 수정 요청
                                        </span>
                                    )}
                                    <span className="text-xs text-gray-400 flex items-center gap-1">
                                        <Clock className="h-3 w-3" /> {inquiry.createdAt}
                                    </span>
                                </div>
                                
                                <h3 className="text-lg font-bold text-gray-900 mb-1">
                                    {inquiry.toolName} 
                                    <span className="text-sm font-normal text-gray-500 ml-2">에 대한 건의</span>
                                </h3>
                                
                                <p className="text-gray-700 bg-gray-50 p-3 rounded-lg text-sm mb-3 mt-2">
                                    {inquiry.content || "내용 없음"}
                                </p>

                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <User className="h-3 w-3" />
                                    요청자: <span className="font-medium text-gray-700">{inquiry.userName}</span> ({inquiry.userEmail})
                                </div>
                            </div>

                            <div className="ml-4">
                                {inquiry.status === 'Pending' ? (
                                    <button 
                                        onClick={() => onResolveInquiry(inquiry.id)}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors shadow-sm whitespace-nowrap"
                                    >
                                        처리 완료
                                    </button>
                                ) : (
                                    <span className="text-green-600 font-bold text-sm flex items-center gap-1 bg-green-50 px-3 py-1.5 rounded-lg border border-green-100">
                                        <CheckCircle className="h-4 w-4" /> 완료됨
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
