
import React from 'react';
import { Tool } from '../types';
import { Shield, BookOpen, ExternalLink, Key } from 'lucide-react';

interface ToolCardProps {
  tool: Tool;
  onClick: () => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool, onClick }) => {

  const handleLinkClick = (e: React.MouseEvent, url: string) => {
    e.stopPropagation(); // Prevent opening the detail modal
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      // 카드 전체 클릭 시: 툴 랜딩 페이지로 이동
      onClick={(e) => handleLinkClick(e, tool.service_url)}
      className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer overflow-hidden flex flex-col h-full min-h-[240px]"
    >
      {/* Top Section: Badges */}
      <div className="absolute top-3 left-3 z-10">
        {tool.in_use === 'N' && (
          <div className="bg-red-50 text-red-600 p-1.5 rounded-lg shadow-sm border border-red-100" title="사용 안 함">
            <Shield className="h-3.5 w-3.5" />
          </div>
        )}
      </div>

      {/* Small account-info button (only this toggles back-side / detail) */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // 카드 기본 클릭(랜딩 이동) 막기
          onClick();           // 계정 정보(툴 상세) 열기
        }}
        className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
        type="button"
      >
        <div className="bg-gray-900 text-white text-[10px] px-2 py-1 rounded-full flex items-center gap-1 shadow-sm hover:bg-gray-800">
          <Key className="h-3 w-3" /> 계정 보기
        </div>
      </button>

      {/* Center Section: Icon & Info */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 pt-8">
        {/* Icon Wrapper (Direct Link) */}
        <div
          onClick={(e) => handleLinkClick(e, tool.service_url)}
          className="mb-4 transition-transform duration-300 group-hover:-translate-y-1 cursor-pointer relative"
          title="사이트 바로가기"
        >
          {tool.logoUrl && tool.logoUrl.startsWith('http') ? (
            <div className="h-16 w-16 rounded-xl overflow-hidden shadow-sm border border-gray-50 bg-white p-1.5 relative group/icon">
              <img src={tool.logoUrl} alt={tool.tool_name} className="h-full w-full object-contain" />
              {/* Hover Overlay for Icon */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover/icon:bg-opacity-10 transition-all flex items-center justify-center rounded-lg">
                <ExternalLink className="h-5 w-5 text-white opacity-0 group-hover/icon:opacity-100 drop-shadow-md" />
              </div>
            </div>
          ) : (
            <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl shadow-md group-hover/icon:shadow-lg transition-all">
              {tool.tool_name.substring(0, 1)}
            </div>
          )}
        </div>

        {/* Text Info */}
        <div className="text-center w-full">
          <h3 className="text-lg font-bold text-gray-900 tracking-tight group-hover:text-blue-600 transition-colors flex items-center justify-center gap-1">
            {tool.tool_name}
          </h3>
          <p className="mt-2 text-xs text-gray-400 line-clamp-2 min-h-[2.5em] px-2 leading-relaxed">
            {tool.description}
          </p>
        </div>
      </div>

      {/* Footer: Manual Button */}
      <div className="p-4 pt-0 mt-auto w-full">
        {tool.manual_link ? (
          <button
            onClick={(e) => handleLinkClick(e, tool.manual_link)}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-gray-50 hover:bg-blue-50 text-gray-600 hover:text-blue-600 rounded-xl text-xs font-bold transition-colors border border-gray-100 hover:border-blue-100 group/btn"
          >
            <BookOpen className="h-3.5 w-3.5 text-gray-400 group-hover/btn:text-blue-500" />
            사용 매뉴얼
          </button>
        ) : (
          <button
            disabled
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-gray-50 text-gray-300 rounded-xl text-xs font-medium border border-gray-100 cursor-not-allowed"
          >
            <BookOpen className="h-3.5 w-3.5" />
            매뉴얼 준비중
          </button>
        )}
      </div>
    </div>
  );
};
