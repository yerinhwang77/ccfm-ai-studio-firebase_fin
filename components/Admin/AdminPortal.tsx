
import React, { useState } from 'react';
import { Tool, Inquiry } from '../../types';
import { ToolManager } from './ToolManager';
import { ArrowLeft, LayoutGrid, Database, Upload } from 'lucide-react';

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
  const pendingCount = inquiries.filter(i => i.status === 'Pending').length;

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
                <div className="bg-red-50 text-red-600 px-3 py-1.5 rounded-full text-xs font-bold border border-red-100 flex items-center gap-1.5 animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    미처리 건의사항 {pendingCount}건
                </div>
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
    </div>
  );
};
