
import React, { useState, useEffect, useRef } from 'react';
import { Tool, Department, Inquiry } from '../../types';
import { Button } from '../Button';
import { DEFAULT_CATEGORY_ORDER, normalizeCategory } from '../../App';
import { Plus, Trash2, Edit2, Save, X, Upload, Image as ImageIcon, Key, Check, Sparkles, Loader2, MessageSquare, AlertTriangle, Clock, User, Search, GripVertical } from 'lucide-react';


interface ToolManagerProps {
    tools: Tool[];
    onSaveTool: (tool: Tool) => void;
    onDeleteTool: (id: string) => void;
    onReorderTools: (tools: Tool[]) => void;

    categoryOrders: Record<string, string[]>;
    onUpdateCategoryOrders: (orders: Record<string, string[]>) => void;

    inquiries?: Inquiry[];
    onResolveInquiry?: (id: string) => void;
}

const EMPTY_TOOL: Tool = {
    id: '',
    department: Department.CONCRETE,
    category: '운영/관리',
    tool_name: '',
    description: '',
    logoUrl: '',
    manual_link: '',
    service_url: '',
    login_id: '',
    login_pw: '',
    memo: '',
    in_use: 'Y',
    is_paid: 'Y'
};

// Bilingual Search Mapping
const SEARCH_SYNONYMS: Record<string, string[]> = {
    'claude': ['클로드', 'anthropic'],
    '클로드': ['claude', 'anthropic'],
    'chatgpt': ['챗지피티', 'gpt', '지피티', 'openai'],
    '챗지피티': ['chatgpt', 'gpt', 'openai'],
    'midjourney': ['미드저니'],
    '미드저니': ['midjourney'],
    'figma': ['피그마'],
    '피그마': ['figma'],
    'notion': ['노션'],
    '노션': ['notion'],
};

export const ToolManager: React.FC<ToolManagerProps> = ({
    tools,
    onSaveTool,
    onDeleteTool,
    onReorderTools,
    categoryOrders,
    onUpdateCategoryOrders,
    inquiries = [],
    onResolveInquiry
}) => {
    const [activeTab, setActiveTab] = useState<Department>(Department.CONCRETE);
    const [isEditing, setIsEditing] = useState(false);
    const [currentTool, setCurrentTool] = useState<Tool>(EMPTY_TOOL);

    // Search State
    const [searchQuery, setSearchQuery] = useState('');

    // Category Management State
    const [isAddingCategory, setIsAddingCategory] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');

    // Category Editing State
    const [editingCategory, setEditingCategory] = useState<string | null>(null);
    const [tempCategoryName, setTempCategoryName] = useState('');

    // AI Feature State
    const [showAIModal, setShowAIModal] = useState(false);
    const [aiInputText, setAiInputText] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    // Drag and Drop State
    const [draggedCategoryIndex, setDraggedCategoryIndex] = useState<number | null>(null);
    const [localCategoryOrder, setLocalCategoryOrder] = useState<string[]>([]);
    const [draggedToolId, setDraggedToolId] = useState<string | null>(null);
    const [dragOverToolId, setDragOverToolId] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Initial calculation of the full order including current tool categories
    useEffect(() => {
        if (draggedCategoryIndex !== null) return; // Don't sync while dragging

        const baseOrder = (categoryOrders[activeTab] || DEFAULT_CATEGORY_ORDER).map(normalizeCategory);
        const allCategoriesInTools = Array.from(new Set(tools.filter(t => t.department === activeTab).map(t => normalizeCategory(t.category))));

        const fullOrder = [...baseOrder];
        allCategoriesInTools.forEach(cat => {
            if (!fullOrder.includes(cat)) {
                fullOrder.push(cat);
            }
        });

        // Final unique set to be safe
        setLocalCategoryOrder(Array.from(new Set(fullOrder)));
    }, [categoryOrders, activeTab, tools, draggedCategoryIndex]);

    // --- Category Handlers ---

    const updateCategoryOrder = (newOrder: string[]) => {
        onUpdateCategoryOrders({
            ...categoryOrders,
            [activeTab]: newOrder
        });
    };

    const handleAddCategory = () => {
        if (newCategoryName.trim()) {
            const name = newCategoryName.trim();
            if (!localCategoryOrder.includes(name)) {
                const newOrder = [...localCategoryOrder, name];
                setLocalCategoryOrder(newOrder);
                updateCategoryOrder(newOrder);
            }
            setNewCategoryName('');
            setIsAddingCategory(false);
        }
    };

    const handleStartEditCategory = (cat: string) => {
        setEditingCategory(cat);
        setTempCategoryName(cat);
    };

    const handleRenameCategory = () => {
        if (!tempCategoryName.trim() || tempCategoryName === editingCategory) {
            setEditingCategory(null);
            return;
        }
        const oldName = editingCategory!;
        const newName = tempCategoryName.trim();

        if (localCategoryOrder.includes(newName) && newName !== oldName) {
            alert('이미 존재하는 카테고리 이름입니다.');
            return;
        }

        // Update Order
        const newOrder = localCategoryOrder.map(c => c === oldName ? newName : c);
        setLocalCategoryOrder(newOrder);
        updateCategoryOrder(newOrder);

        // Update all tools using this category
        tools.forEach(t => {
            const currentNormCat = normalizeCategory(t.category);
            const oldNormCat = normalizeCategory(oldName);
            if (t.department === activeTab && currentNormCat === oldNormCat) {
                onSaveTool({ ...t, category: newName });
            }
        });

        setEditingCategory(null);
    };

    const handleDeleteCategory = (cat: string) => {
        if (!confirm(`'${cat}' 카테고리를 삭제하시겠습니까?\n이 카테고리를 사용하는 모든 툴은 '일반' 카테고리로 이동됩니다.`)) return;

        // Update tools
        tools.forEach(t => {
            if (t.department === activeTab && normalizeCategory(t.category) === normalizeCategory(cat)) {
                onSaveTool({ ...t, category: '일반' });
            }
        });

        // Update order
        const newOrder = localCategoryOrder.filter(c => c !== cat);
        setLocalCategoryOrder(newOrder);
        updateCategoryOrder(newOrder);

        if (editingCategory === cat) setEditingCategory(null);
    };

    // --- Drag and Drop: Categories ---

    const handleCategoryDragStart = (e: React.DragEvent, index: number) => {
        setDraggedCategoryIndex(index);
        e.dataTransfer.effectAllowed = "move";
    };

    const handleCategoryDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        if (draggedCategoryIndex === null || draggedCategoryIndex === index) return;

        const newOrder = [...localCategoryOrder];
        const draggedItem = newOrder[draggedCategoryIndex];

        newOrder.splice(draggedCategoryIndex, 1);
        newOrder.splice(index, 0, draggedItem);

        setLocalCategoryOrder(newOrder); // Update locally for instant feedback
        setDraggedCategoryIndex(index);
    };

    const handleCategoryDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDraggedCategoryIndex(null);
        updateCategoryOrder(localCategoryOrder); // Persist final order on drop
    };

    // --- Drag and Drop: Tools ---

    const handleToolDragStart = (e: React.DragEvent, tool: Tool) => {
        setDraggedToolId(tool.id);
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", tool.id);
    };

    const handleToolDragOverTool = (e: React.DragEvent, targetToolId: string) => {
        e.preventDefault();
        e.stopPropagation();
        if (draggedToolId !== targetToolId) {
            setDragOverToolId(targetToolId);
        }
    };

    const handleToolDragLeave = () => {
        setDragOverToolId(null);
    };

    const handleToolDropOnTool = (e: React.DragEvent, targetTool: Tool) => {
        e.preventDefault();
        e.stopPropagation();
        const sourceId = draggedToolId;
        setDraggedToolId(null);
        setDragOverToolId(null);

        if (!sourceId || sourceId === targetTool.id) return;

        const currentToolsInOrder = [...tools];
        const sourceIndex = currentToolsInOrder.findIndex(t => t.id === sourceId);
        if (sourceIndex === -1) return;

        const [movedTool] = currentToolsInOrder.splice(sourceIndex, 1);

        // Update category/department if dropped onto a tool in a different category/department
        if (movedTool.category !== targetTool.category) {
            movedTool.category = targetTool.category;
        }
        if (movedTool.department !== targetTool.department) {
            movedTool.department = targetTool.department;
        }

        // Find the new index in the modified array
        const targetIndexInModified = currentToolsInOrder.findIndex(t => t.id === targetTool.id);
        if (targetIndexInModified === -1) return; // Should not happen

        currentToolsInOrder.splice(targetIndexInModified, 0, movedTool);

        onReorderTools(currentToolsInOrder);
    };

    const handleToolDragOverCategory = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    };

    const handleToolDropOnCategory = (e: React.DragEvent, targetCategory: string) => {
        e.preventDefault();
        const toolId = draggedToolId;
        setDraggedToolId(null);

        if (!toolId) return;

        const tool = tools.find(t => t.id === toolId);
        if (tool && tool.category !== targetCategory) {
            onSaveTool({ ...tool, category: targetCategory });
        }
    };

    // --- Tool Handlers ---

    const handleAddNewTool = () => {
        setCurrentTool({ ...EMPTY_TOOL, id: Date.now().toString(), department: activeTab });
        setIsEditing(true);
    };

    const handleEdit = (tool: Tool) => {
        setCurrentTool({ ...tool });
        setIsEditing(true);
    };

    const handleDelete = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (confirm('이 툴을 정말 삭제하시겠습니까?')) {
            onDeleteTool(id);
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setCurrentTool({ ...currentTool, logoUrl: base64String });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();

        if (!currentTool.tool_name || !currentTool.department) {
            alert('툴 이름과 사업부는 필수입니다.');
            return;
        }

        const toolToSave = { ...currentTool };
        if (!toolToSave.order) {
            toolToSave.order = tools.length;
        }

        onSaveTool(toolToSave);
        setIsEditing(false);
    };

    // --- AI Handler ---
    const handleAIAnalyze = async () => {
        alert('AI 자동 입력 기능은 현재 개발 중입니다. 수동으로 입력해주세요.');
        setShowAIModal(false);
        setAiInputText('');
    };

    // --- Filters & Grouping ---
    const currentToolInquiries = inquiries.filter(i => i.toolId === currentTool.id);
    const getPendingCount = (toolId: string) => inquiries.filter(i => i.toolId === toolId && i.status === 'Pending').length;

    const filteredTools = tools.filter(tool => {
        const matchesDept = tool.department === activeTab;
        const query = searchQuery.toLowerCase().trim();

        if (!query) return matchesDept;

        let searchTerms = [query];
        Object.entries(SEARCH_SYNONYMS).forEach(([key, values]) => {
            if (key.includes(query) || values.some(v => v.includes(query))) {
                searchTerms.push(key);
                searchTerms.push(...values);
            }
        });
        searchTerms = Array.from(new Set(searchTerms));

        const matchesSearch = searchTerms.some(term =>
            tool.tool_name.toLowerCase().includes(term) ||
            tool.description.toLowerCase().includes(term) ||
            tool.category?.toLowerCase().includes(term) ||
            tool.id.toLowerCase().replace('t_', '').includes(term)
        );

        return matchesDept && matchesSearch;
    });

    const groupedTools = filteredTools.reduce((acc, tool) => {
        const cat = normalizeCategory(tool.category);
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(tool);
        return acc;
    }, {} as Record<string, Tool[]>);

    // Sort categories: use local order which includes all categories
    const displayCategories = localCategoryOrder;

    if (isEditing) {
        return (
            <div className="bg-white shadow-xl rounded-2xl p-8 animate-in slide-in-from-bottom-4 relative">
                <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        {currentTool.id ? '툴 정보 수정' : '새 툴 추가'}
                    </h2>
                    <div className="flex gap-2">
                        <Button
                            type="button"
                            onClick={() => setShowAIModal(true)}
                            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-none shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                        >
                            <Sparkles className="h-4 w-4 mr-2" />
                            AI 자동 입력
                        </Button>
                        <Button variant="secondary" onClick={() => setIsEditing(false)}><X className="h-4 w-4 mr-2" /> 취소</Button>
                    </div>
                </div>

                <form onSubmit={handleSave} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">툴 이름 *</label>
                                <input type="text" required className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-500 transition-all"
                                    value={currentTool.tool_name} onChange={e => setCurrentTool({ ...currentTool, tool_name: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">카테고리</label>
                                <select
                                    className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-500 transition-all bg-white"
                                    value={currentTool.category}
                                    onChange={e => setCurrentTool({ ...currentTool, category: e.target.value })}
                                >
                                    {localCategoryOrder.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">담당 사업부 *</label>
                                <select className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-500 transition-all bg-white"
                                    value={currentTool.department} onChange={e => setCurrentTool({ ...currentTool, department: e.target.value as Department })}>
                                    {Object.values(Department).map(d => <option key={d} value={d}>{d}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">설명 (한 줄 소개)</label>
                                <input type="text" className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-500 transition-all"
                                    value={currentTool.description} onChange={e => setCurrentTool({ ...currentTool, description: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">사용 여부</label>
                                    <select className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-500 bg-white"
                                        value={currentTool.in_use} onChange={e => setCurrentTool({ ...currentTool, in_use: e.target.value as 'Y' | 'N' })}>
                                        <option value="Y">Y (사용)</option>
                                        <option value="N">N (미사용)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">유료 여부</label>
                                    <select className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-500 bg-white"
                                        value={currentTool.is_paid} onChange={e => setCurrentTool({ ...currentTool, is_paid: e.target.value as 'Y' | 'N' })}>
                                        <option value="Y">Y (유료)</option>
                                        <option value="N">N (무료)</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">로고 이미지</label>
                                <div className="mb-3 flex justify-center">
                                    <div className="h-24 w-24 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50 relative group">
                                        {currentTool.logoUrl ? (
                                            <img src={currentTool.logoUrl} alt="Logo Preview" className="h-full w-full object-contain p-1" />
                                        ) : (
                                            <ImageIcon className="h-8 w-8 text-gray-300" />
                                        )}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        className="flex-1 border border-gray-300 rounded-lg shadow-sm p-3 text-sm focus:ring-2 focus:ring-blue-500"
                                        value={currentTool.logoUrl}
                                        onChange={e => setCurrentTool({ ...currentTool, logoUrl: e.target.value })}
                                        placeholder="이미지 주소 (URL)"
                                    />
                                    <button type="button" onClick={() => fileInputRef.current?.click()} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg border border-gray-300 font-medium text-sm flex items-center gap-2">
                                        <Upload className="h-4 w-4" /> 업로드
                                    </button>
                                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">사이트 링크 URL</label>
                                <input type="text" className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-500 transition-all"
                                    value={currentTool.service_url} onChange={e => setCurrentTool({ ...currentTool, service_url: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">매뉴얼 URL</label>
                                <input type="text" className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-500 transition-all"
                                    value={currentTool.manual_link} onChange={e => setCurrentTool({ ...currentTool, manual_link: e.target.value })} />
                            </div>

                            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mt-4">
                                <div className="flex items-center gap-2 mb-3 text-blue-800 font-bold text-sm">
                                    <Key className="h-4 w-4" /> 계정 접속 정보
                                </div>
                                <div className="grid grid-cols-1 gap-3">
                                    <div>
                                        <label className="block text-xs font-semibold text-blue-700 mb-1">ID / Email</label>
                                        <input type="text" value={currentTool.login_id} onChange={e => setCurrentTool({ ...currentTool, login_id: e.target.value })}
                                            className="w-full border-blue-200 rounded border p-2 text-sm" placeholder="로그인 아이디 입력" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-blue-700 mb-1">Password</label>
                                        <input type="text" value={currentTool.login_pw} onChange={e => setCurrentTool({ ...currentTool, login_pw: e.target.value })}
                                            className="w-full border-blue-200 rounded border p-2 text-sm font-mono" placeholder="비밀번호 입력" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-blue-700 mb-1">메모</label>
                                        <textarea value={currentTool.memo} onChange={e => setCurrentTool({ ...currentTool, memo: e.target.value })}
                                            className="w-full border-blue-200 rounded border p-2 text-sm" rows={2} placeholder="추가 정보 (예: 2단계 인증 코드)" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {currentTool.id && (
                        <div className="border-t border-gray-200 pt-8 mt-4">
                            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4">
                                <MessageSquare className="h-5 w-5 text-gray-600" />
                                건의사항 확인 (Feedback)
                            </h3>
                            {currentToolInquiries.length === 0 ? (
                                <div className="bg-gray-50 rounded-xl p-6 text-center text-sm text-gray-500 border border-gray-100">
                                    등록된 건의사항이 없습니다.
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {currentToolInquiries.map((inquiry) => (
                                        <div key={inquiry.id} className={`p-4 rounded-xl border ${inquiry.status === 'Resolved' ? 'bg-gray-50 border-gray-100 opacity-60' : 'bg-red-50 border-red-100'}`}>
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${inquiry.type === 'Deletion' ? 'bg-red-100 text-red-700 border-red-200' : 'bg-blue-100 text-blue-700 border-blue-200'}`}>
                                                            {inquiry.type === 'Deletion' ? '삭제 요청' : '수정 요청'}
                                                        </span>
                                                        <span className="text-xs text-gray-500 flex items-center gap-1 ml-2 bg-gray-100 px-2 py-0.5 rounded border border-gray-200">
                                                            {inquiry.toolDepartment} | {inquiry.toolName}
                                                        </span>
                                                        <span className="text-xs font-bold text-gray-700 flex items-center gap-1 ml-1 bg-white px-2 py-0.5 rounded border border-gray-200 shadow-sm">
                                                            <User className="h-3 w-3 text-gray-500" /> {inquiry.userName}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-800 mt-2 font-medium pl-1 border-l-2 border-gray-300 ml-1">
                                                        {inquiry.content || "내용 없음"}
                                                    </p>
                                                </div>
                                                {inquiry.status === 'Pending' && onResolveInquiry && (
                                                    <button type="button" onClick={() => onResolveInquiry(inquiry.id)}
                                                        className="ml-4 px-3 py-1.5 bg-white border border-gray-300 hover:bg-gray-50 text-xs font-bold rounded-lg shadow-sm whitespace-nowrap">
                                                        확인/완료 처리
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    <div className="flex justify-end items-center pt-6 border-t border-gray-100">
                        <div className="flex gap-3">
                            <Button type="button" variant="secondary" onClick={() => setIsEditing(false)} size="lg">취소</Button>
                            <Button type="submit" variant="primary" size="lg" className="shadow-lg shadow-blue-200"><Save className="h-4 w-4 mr-2" /> 저장하기</Button>
                        </div>
                    </div>
                </form>

                {showAIModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg border border-gray-200">
                            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white rounded-t-2xl">
                                <h3 className="text-xl font-bold flex items-center gap-2"><Sparkles className="h-5 w-5 text-yellow-300" /> AI 스마트 입력</h3>
                            </div>
                            <div className="p-6">
                                <textarea className="w-full h-40 border border-gray-300 rounded-xl p-4 text-sm focus:ring-2 focus:ring-purple-500 resize-none mb-4"
                                    placeholder="여기에 텍스트를 붙여넣으세요..." value={aiInputText} onChange={(e) => setAiInputText(e.target.value)} />
                                <div className="flex gap-3">
                                    <button onClick={handleAIAnalyze} disabled={isAnalyzing || !aiInputText.trim()}
                                        className="flex-1 bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50">
                                        {isAnalyzing ? <><Loader2 className="animate-spin" /> 분석 중...</> : <><Sparkles className="text-purple-400" /> 분석 및 적용</>}
                                    </button>
                                    <button onClick={() => setShowAIModal(false)} className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl font-bold">닫기</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="space-y-8">

            {/* Department Tabs */}
            <div className="flex space-x-1 overflow-x-auto border-b border-gray-200 pb-1">
                {Object.values(Department).map((dept) => (
                    <button
                        key={dept}
                        onClick={() => setActiveTab(dept)}
                        className={`px-6 py-2.5 rounded-t-lg font-bold text-sm transition-all whitespace-nowrap ${activeTab === dept
                            ? 'bg-white text-blue-600 border-t-2 border-l border-r border-blue-600 shadow-sm relative top-px'
                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        {dept}
                    </button>
                ))}
            </div>

            {/* Category Management - Drag and Drop */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <div className="bg-blue-100 p-1.5 rounded-lg">
                            <GripVertical className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800">카테고리 관리 ({activeTab})</h3>
                            <p className="text-xs text-gray-400">카드를 드래그하여 순서를 변경하거나 수정/삭제하세요.</p>
                        </div>
                    </div>

                    {isAddingCategory ? (
                        <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-2">
                            <input type="text" autoFocus value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)}
                                placeholder="새 카테고리 이름" className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                                onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()} />
                            <Button size="sm" onClick={handleAddCategory}>추가</Button>
                            <Button size="sm" variant="secondary" onClick={() => setIsAddingCategory(false)}>취소</Button>
                        </div>
                    ) : (
                        <button onClick={() => setIsAddingCategory(true)} className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors flex items-center shadow-md">
                            <Plus className="h-4 w-4 mr-1.5" /> 새 카테고리
                        </button>
                    )}
                </div>

                <div className="flex flex-wrap gap-3">
                    {localCategoryOrder.map((cat, index) => {
                        const isEmpty = (groupedTools[cat]?.length || 0) === 0;
                        return (
                            <div
                                key={cat}
                                draggable={editingCategory !== cat}
                                onDragStart={(e) => handleCategoryDragStart(e, index)}
                                onDragOver={(e) => handleCategoryDragOver(e, index)}
                                onDrop={handleCategoryDrop}
                                className={`group relative border rounded-xl shadow-sm transition-all p-2 pr-3 pl-3 flex items-center gap-2 select-none cursor-move
            ${draggedCategoryIndex === index ? 'opacity-50 border-blue-400 bg-blue-50' :
                                        isEmpty ? 'bg-gray-50 border-gray-200 opacity-60' : 'bg-white border-gray-200 hover:shadow-md hover:border-blue-200'}
        `}
                            >
                                <div className="flex-1 min-w-[60px] text-center">
                                    {editingCategory === cat ? (
                                        <div className="flex items-center gap-1">
                                            <input autoFocus value={tempCategoryName} onChange={(e) => setTempCategoryName(e.target.value)}
                                                className="w-24 text-sm font-bold text-gray-800 border-b-2 border-blue-500 outline-none bg-transparent px-1"
                                                onKeyDown={(e) => e.key === 'Enter' && handleRenameCategory()} />
                                            <button onClick={handleRenameCategory} className="text-green-600 hover:bg-green-50 rounded p-1"><Check className="h-3 w-3" /></button>
                                            <button onClick={() => setEditingCategory(null)} className="text-gray-400 hover:bg-gray-100 rounded p-1"><X className="h-3 w-3" /></button>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center">
                                            <span className={`text-sm font-bold ${isEmpty ? 'text-gray-400' : 'text-gray-700'}`}>{cat}</span>
                                            {isEmpty && <span className="text-[10px] text-gray-400 font-medium">비어있음</span>}
                                        </div>
                                    )}
                                </div>

                                {editingCategory !== cat && (
                                    <div className="flex items-center gap-1 ml-2 border-l border-gray-100 pl-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => handleStartEditCategory(cat)} className="text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded p-1" title="이름 변경">
                                            <Edit2 className="h-3.5 w-3.5" />
                                        </button>
                                        <button onClick={() => handleDeleteCategory(cat)} className="text-gray-400 hover:text-red-600 hover:bg-red-50 rounded p-1" title="삭제">
                                            <Trash2 className="h-3.5 w-3.5" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Tool List Header & Search */}
            <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            {activeTab} 툴 목록
                            <span className="bg-gray-800 text-gray-400 text-xs px-2 py-0.5 rounded-full border border-gray-700">{filteredTools.length}</span>
                        </h2>
                        <p className="text-gray-400 text-sm mt-1">툴 카드를 드래그하여 순서를 변경하거나 카테고리를 이동할 수 있습니다.</p>
                    </div>

                    <div className="flex gap-3 w-full md:w-auto">
                        <div className="relative flex-1 md:flex-initial">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input type="text" placeholder="툴 이름, 카테고리 검색..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full md:w-64 bg-gray-800 border-gray-700 text-white placeholder-gray-500 rounded-lg pl-9 pr-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                        </div>
                        <Button onClick={handleAddNewTool} className="bg-blue-600 text-white hover:bg-blue-700 border-none font-bold shadow-lg shadow-blue-900/50 whitespace-nowrap">
                            <Plus className="h-4 w-4 mr-2" /> 새 툴 추가
                        </Button>
                    </div>
                </div>
            </div>

            {/* Tool Grid (Categorized Layout with DnD) */}
            <div className="space-y-10">
                {filteredTools.length === 0 ? (
                    <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm">
                        <div className="bg-gray-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6"><Search className="h-10 w-10 text-gray-300" /></div>
                        <h3 className="text-xl font-bold text-gray-900">{searchQuery ? `'${searchQuery}'에 대한 검색 결과가 없습니다.` : '등록된 툴이 없습니다.'}</h3>
                    </div>
                ) : (
                    displayCategories.map(category => {
                        const hasTools = (groupedTools[category]?.length || 0) > 0;
                        return (
                            <div
                                key={category}
                                className={`animate-in fade-in slide-in-from-bottom-2 duration-500 p-4 rounded-2xl transition-colors border border-transparent 
                                ${!hasTools ? 'opacity-50 grayscale bg-gray-50/30' : 'hover:border-gray-200 hover:bg-gray-50/50'}`}
                                onDragOver={handleToolDragOverCategory}
                                onDrop={(e) => handleToolDropOnCategory(e, category)}
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <h2 className={`text-lg font-bold ${!hasTools ? 'text-gray-400 italic' : 'text-gray-800'}`}>{category}</h2>
                                    <div className="h-px bg-gray-200 flex-1"></div>
                                    <span className="text-xs text-gray-500 font-medium">{hasTools ? `${groupedTools[category].length}개` : '없음'}</span>
                                </div>
                                {(!hasTools) ? (
                                    <div className="py-10 border-2 border-dashed border-gray-100 rounded-2xl flex flex-center justify-center items-center text-gray-300 text-sm italic">
                                        등록된 툴이 없습니다.
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                        {groupedTools[category].map(tool => {
                                            const pendingCount = getPendingCount(tool.id);
                                            return (
                                                <div
                                                    key={tool.id}
                                                    draggable
                                                    onDragStart={(e) => handleToolDragStart(e, tool)}
                                                    onDragOver={(e) => handleToolDragOverTool(e, tool.id)}
                                                    onDragLeave={handleToolDragLeave}
                                                    onDrop={(e) => handleToolDropOnTool(e, tool)}
                                                    className={`group relative bg-white rounded-2xl border shadow-sm hover:shadow-lg transition-all duration-200 cursor-move overflow-hidden flex flex-col h-full min-h-[280px] ${dragOverToolId === tool.id ? 'border-blue-400 bg-blue-50 scale-105' : 'border-gray-200'
                                                        }`}
                                                >
                                                    {/* Pending Count Badge */}
                                                    {pendingCount > 0 && (
                                                        <div className="absolute top-3 left-3 z-10">
                                                            <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-md">
                                                                {pendingCount}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Edit/Delete Buttons */}
                                                    <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); handleEdit(tool); }}
                                                            className="p-2 bg-white text-blue-600 hover:bg-blue-50 rounded-lg shadow-md border border-gray-200"
                                                        >
                                                            <Edit2 className="h-4 w-4" />
                                                        </button>
                                                        <button
                                                            onClick={(e) => handleDelete(tool.id, e)}
                                                            className="p-2 bg-white text-red-600 hover:bg-red-50 rounded-lg shadow-md border border-gray-200"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </div>

                                                    {/* Center Section: Icon & Info */}
                                                    <div className="flex-1 flex flex-col items-center justify-center p-6 pt-12">
                                                        {/* Icon */}
                                                        <div className="mb-4 transition-transform duration-300 group-hover:-translate-y-1">
                                                            {tool.logoUrl ? (
                                                                <div className="h-16 w-16 rounded-xl overflow-hidden shadow-sm border border-gray-50 bg-white p-1.5">
                                                                    <img src={tool.logoUrl} alt={tool.tool_name} className="h-full w-full object-contain" />
                                                                </div>
                                                            ) : (
                                                                <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl shadow-md">
                                                                    {tool.tool_name.substring(0, 1)}
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* Text Info */}
                                                        <div className="text-center w-full">
                                                            <h3 className="text-lg font-bold text-gray-900 tracking-tight group-hover:text-blue-600 transition-colors mb-1">
                                                                {tool.tool_name}
                                                            </h3>
                                                            <p className="text-xs text-gray-400 mb-2">{tool.category}</p>
                                                            <p className="text-xs text-gray-500 line-clamp-2 min-h-[2.5em] px-2 leading-relaxed">
                                                                {tool.description}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Footer: Status Badges */}
                                                    <div className="p-4 pt-0 mt-auto w-full">
                                                        <div className="flex gap-2 justify-center text-xs">
                                                            <span className={`px-2 py-1 rounded-full font-medium ${tool.in_use === 'Y' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                                {tool.in_use === 'Y' ? '사용중' : '미사용'}
                                                            </span>
                                                            <span className={`px-2 py-1 rounded-full font-medium ${tool.is_paid === 'Y' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                                                                {tool.is_paid === 'Y' ? '유료' : '무료'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};
