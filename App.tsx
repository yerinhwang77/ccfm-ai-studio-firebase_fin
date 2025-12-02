
import React, { useState, useEffect } from 'react';
import { Login } from './components/Login';
import { ToolCard } from './components/ToolCard';
import { ToolDetail } from './components/ToolDetail';
import { AdminPortal } from './components/Admin/AdminPortal';
import { INITIAL_TOOLS } from './constants';
import { Tool, User, Department, Inquiry } from './types';
import { LogOut, Settings, Menu, Search, X, Database, Loader2 } from 'lucide-react';
import { collection, getDocs, doc, setDoc, deleteDoc, writeBatch, query, orderBy } from 'firebase/firestore';
import { db } from './firebase';

const SYSTEM_ADMIN_EMAIL = 'system@mkm20201101.com';
const ADMIN_EMAIL = 'admin@ccfm.co.kr';

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
  'slack': ['슬랙'],
  '슬랙': ['slack'],
  'adobe': ['어도비', '포토샵', '프리미어'],
  '어도비': ['adobe', 'photoshop'],
  'sora': ['소라'],
  '소라': ['sora'],
  'kling': ['클링'],
  '클링': ['kling'],
  'runway': ['런웨이'],
  '런웨이': ['runway'],
  'perplexity': ['퍼플렉시티'],
  '퍼플렉시티': ['perplexity'],
  'gemini': ['제미나이', '구글', 'google'],
  '제미나이': ['gemini', 'google'],
  'google': ['구글', 'gemini'],
  '구글': ['google', 'gemini'],
  'aws': ['아마존'],
  '아마존': ['aws'],
  'flex': ['플렉스'],
  '플렉스': ['flex'],
  'oopy': ['우피'],
  '우피': ['oopy'],
  'mangoboard': ['망고보드', 'mango'],
  '망고보드': ['mangoboard', 'mango'],
  'cafe24': ['카페24'],
  '카페24': ['cafe24'],
  'imweb': ['아임웹'],
  '아임웹': ['imweb'],
  'gabia': ['가비아'],
  '가비아': ['gabia'],
  'loom': ['룸'],
  '룸': ['loom'],
  'typecast': ['타입캐스트'],
  '타입캐스트': ['typecast'],
  'elevenlabs': ['일레븐랩스'],
  '일레븐랩스': ['elevenlabs'],
  'shutterstock': ['셔터스톡'],
  '셔터스톡': ['shutterstock'],
  'artlist': ['아트리스트'],
  '아트리스트': ['artlist']
};

// Default Category Order
const DEFAULT_CATEGORY_ORDER = [
  '텍스트 AI', '이미지 AI', '비디오 AI', '보이스 AI', 
  '데이터 분석', '운영/관리', '생산성/협업', '미디어 소스', 
  '교육/인사이트', '디자인', '일반'
];

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  
  const [tools, setTools] = useState<Tool[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [activeDepartment, setActiveDepartment] = useState<Department | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Department-specific Category Orders
  const [categoryOrders, setCategoryOrders] = useState<Record<string, string[]>>({});

  // Fetch Data from Firebase
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch Tools
        const toolsSnapshot = await getDocs(collection(db, "tools"));
        const toolsData = toolsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Tool[];
        
        // Sort by 'order' field if it exists
        toolsData.sort((a, b) => (a.order || 0) - (b.order || 0));
        setTools(toolsData);

        // Fetch Settings (Category Orders)
        const settingsSnapshot = await getDocs(collection(db, "settings"));
        const settingsData: Record<string, string[]> = {};
        
        settingsSnapshot.forEach(doc => {
            if (doc.id.startsWith('categoryOrder_')) {
                const dept = doc.id.replace('categoryOrder_', '');
                settingsData[dept] = doc.data().order;
            }
        });

        // Initialize missing departments with default order
        Object.values(Department).forEach(dept => {
            if (!settingsData[dept]) {
                settingsData[dept] = [...DEFAULT_CATEGORY_ORDER];
            }
        });
        setCategoryOrders(settingsData);
        
        // Fetch Inquiries (Optional: if we want to persist them too)
        // For now, keeping inquiries in local state or you can add a collection for them

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Sync new categories from tools to categoryOrders
  useEffect(() => {
     if (isLoading) return;

     let hasChanges = false;
     const newCategoryOrders = { ...categoryOrders };

     tools.forEach(tool => {
        const dept = tool.department;
        const cat = tool.category || '일반';
        
        if (!newCategoryOrders[dept]) {
             newCategoryOrders[dept] = [...DEFAULT_CATEGORY_ORDER];
        }

        if (!newCategoryOrders[dept].includes(cat)) {
            newCategoryOrders[dept] = [...newCategoryOrders[dept], cat];
            hasChanges = true;
        }
     });

     if (hasChanges) {
        setCategoryOrders(newCategoryOrders);
        // We don't save to DB here to avoid loops, only when admin explicitly reorders or adds
     }
  }, [tools, isLoading]);


  // RBAC Logic
  const handleLogin = (email: string, name?: string, picture?: string) => {
    let allowed = false;
    let displayName = name || 'User';
    let defaultDept = Department.DISTRIBUTION;
    let isSystem = false;
    let isAdmin = false;

    const normalizedEmail = email.toLowerCase();

    if (normalizedEmail === SYSTEM_ADMIN_EMAIL) {
      allowed = true;
      displayName = name || '시스템 관리자';
      defaultDept = Department.DISTRIBUTION;
      isSystem = true;
      isAdmin = true;
    } else if (normalizedEmail === ADMIN_EMAIL) {
        allowed = true;
        displayName = name || '관리자';
        defaultDept = Department.CONCRETE;
        isAdmin = true;
    } else if (normalizedEmail.endsWith('@samchomaeul.com')) {
      allowed = true;
      displayName = name || '유통콘텐츠팀';
      defaultDept = Department.DISTRIBUTION;
    } else if (normalizedEmail.endsWith('@mkm20201101.com')) {
      allowed = true;
      displayName = name || '마케팅/브랜드팀';
      defaultDept = Department.MARKETING;
    } else if (normalizedEmail.endsWith('@ccfm.co.kr')) {
      allowed = true;
      displayName = name || '콘크리트팀';
      defaultDept = Department.CONCRETE;
    }

    if (allowed) {
      setUser({
        email: normalizedEmail,
        name: displayName,
        avatar: picture || `https://ui-avatars.com/api/?name=${displayName}&background=random`,
        isAdmin,
        isSystem
      });
      setActiveDepartment(defaultDept);
      setLoginError(null);
    } else {
      setLoginError('이 사이트에 접근할 권한이 없습니다.');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setActiveDepartment(null);
    setIsAdminOpen(false);
    setSelectedTool(null);
    setSearchQuery('');
  };

  const handleDepartmentChange = (dept: Department) => {
    setActiveDepartment(dept);
    setSearchQuery('');
  };

  // --- Database Operations ---

  const handleSaveTool = async (tool: Tool) => {
      try {
        await setDoc(doc(db, "tools", tool.id), tool);
        setTools(prev => {
            const index = prev.findIndex(t => t.id === tool.id);
            if (index >= 0) {
                const newTools = [...prev];
                newTools[index] = tool;
                return newTools;
            } else {
                return [...prev, tool];
            }
        });
      } catch (e) {
          console.error("Error saving tool:", e);
          alert("저장 중 오류가 발생했습니다.");
      }
  };

  const handleDeleteTool = async (id: string) => {
      try {
          await deleteDoc(doc(db, "tools", id));
          setTools(prev => prev.filter(t => t.id !== id));
      } catch (e) {
          console.error("Error deleting tool:", e);
          alert("삭제 중 오류가 발생했습니다.");
      }
  };

  const handleReorderTools = async (reorderedTools: Tool[]) => {
      // Optimistic Update
      setTools(reorderedTools);

      try {
          const batch = writeBatch(db);
          reorderedTools.forEach((tool, index) => {
              const ref = doc(db, "tools", tool.id);
              batch.update(ref, { order: index, category: tool.category });
          });
          await batch.commit();
      } catch (e) {
          console.error("Error reordering tools:", e);
          alert("순서 저장 중 오류가 발생했습니다. 새로고침 후 다시 시도해주세요.");
      }
  };

  const handleUpdateCategoryOrders = async (newOrders: Record<string, string[]>) => {
      setCategoryOrders(newOrders);
      try {
          const batch = writeBatch(db);
          Object.entries(newOrders).forEach(([dept, order]) => {
              const ref = doc(db, "settings", `categoryOrder_${dept}`);
              batch.set(ref, { order });
          });
          await batch.commit();
      } catch (e) {
          console.error("Error saving categories:", e);
      }
  };

  // --- Migration Logic ---
  const handleMigrateData = async () => {
    if (!confirm("현재 constants.ts의 데이터를 Firebase로 업로드하시겠습니까? (기존 DB 데이터는 유지/덮어쓰기 됩니다)")) return;
    
    setIsLoading(true);
    try {
        const batch = writeBatch(db);
        INITIAL_TOOLS.forEach((tool, index) => {
            const docRef = doc(db, "tools", tool.id);
            // Assign initial order based on array position
            batch.set(docRef, { ...tool, order: index });
        });
        await batch.commit();
        
        // Also init categories
        const catBatch = writeBatch(db);
        Object.values(Department).forEach(dept => {
             const ref = doc(db, "settings", `categoryOrder_${dept}`);
             catBatch.set(ref, { order: DEFAULT_CATEGORY_ORDER });
        });
        await catBatch.commit();

        alert("데이터 업로드가 완료되었습니다. 페이지를 새로고침합니다.");
        window.location.reload();
    } catch (e) {
        console.error("Migration failed:", e);
        alert("업로드 실패: 콘솔을 확인하세요.");
        setIsLoading(false);
    }
  };

  const handleReportTool = (content: string, type: 'Deletion' | 'Correction') => {
    if (!selectedTool || !user) return;
    const newInquiry: Inquiry = {
      id: Date.now().toString(),
      type,
      toolId: selectedTool.id,
      toolName: selectedTool.name,
      userEmail: user.email,
      userName: user.name,
      content,
      createdAt: new Date().toLocaleDateString(),
      status: 'Pending'
    };
    setInquiries(prev => [newInquiry, ...prev]);
    alert('관리자에게 건의사항이 접수되었습니다.');
    setSelectedTool(null);
  };

  const handleResolveInquiry = (id: string) => {
    setInquiries(prev => prev.map(iq => iq.id === id ? { ...iq, status: 'Resolved' } : iq));
  };

  const getAvailableDepartments = (email: string): Department[] => {
    if (
        email === SYSTEM_ADMIN_EMAIL || 
        email === ADMIN_EMAIL ||
        email.endsWith('@samchomaeul.com') ||
        email.endsWith('@mkm20201101.com') ||
        email.endsWith('@ccfm.co.kr')
    ) {
      return Object.values(Department);
    }
    return [];
  };

  if (!user) {
    return <Login onLogin={handleLogin} error={loginError} />;
  }

  if (isLoading) {
      return (
          <div className="min-h-screen flex items-center justify-center bg-gray-50 flex-col gap-4">
              <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
              <p className="text-gray-500 font-medium">데이터 불러오는 중...</p>
          </div>
      )
  }

  if (isAdminOpen) {
    return (
      <AdminPortal 
        tools={tools} 
        onSaveTool={handleSaveTool}
        onDeleteTool={handleDeleteTool}
        onReorderTools={handleReorderTools}
        categoryOrders={categoryOrders}
        onUpdateCategoryOrders={handleUpdateCategoryOrders}
        onBack={() => setIsAdminOpen(false)}
        inquiries={inquiries}
        onResolveInquiry={handleResolveInquiry}
        onMigrateData={user.isSystem ? handleMigrateData : undefined}
      />
    );
  }

  // IF A TOOL IS SELECTED, SHOW DETAIL VIEW (OVERLAY)
  if (selectedTool) {
    return (
      <ToolDetail 
        tool={selectedTool} 
        user={user} 
        onBack={() => setSelectedTool(null)} 
        onReport={handleReportTool}
      />
    );
  }

  const visibleDepartments = getAvailableDepartments(user.email);
  
  const displayedTools = tools.filter(t => {
    const matchesDepartment = t.department === activeDepartment;
    const query = searchQuery.toLowerCase().trim();
    
    if (!query) return matchesDepartment;

    let searchTerms = [query];
    Object.entries(SEARCH_SYNONYMS).forEach(([key, values]) => {
      if (key.includes(query) || values.some(v => v.includes(query))) {
        searchTerms.push(key);
        searchTerms.push(...values);
      }
    });
    searchTerms = Array.from(new Set(searchTerms));

    const matchesSearch = searchTerms.some(term => 
      t.name.toLowerCase().includes(term) || 
      t.description.toLowerCase().includes(term) || 
      (t.category && t.category.toLowerCase().includes(term)) ||
      (t.purpose && t.purpose.toLowerCase().includes(term)) ||
      t.id.toLowerCase().replace('t_', '').includes(term)
    );
      
    return matchesDepartment && matchesSearch;
  });
  
  const groupedTools = displayedTools.reduce((acc, tool) => {
    const cat = tool.category || '일반';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(tool);
    return acc;
  }, {} as Record<string, Tool[]>);

  const activeCategoryOrder = categoryOrders[activeDepartment || Department.BRAND] || DEFAULT_CATEGORY_ORDER;
  
  const sortedCategories = Object.keys(groupedTools).sort((a, b) => {
     const idxA = activeCategoryOrder.indexOf(a);
     const idxB = activeCategoryOrder.indexOf(b);
     if (idxA === -1 && idxB === -1) return a.localeCompare(b);
     if (idxA === -1) return 1;
     if (idxB === -1) return -1;
     return idxA - idxB;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center gap-2">
                 <div className="bg-gray-900 rounded-lg p-1.5 shadow-lg">
                    <Menu className="h-5 w-5 text-white" />
                 </div>
                 <span className="text-lg font-extrabold text-gray-900 tracking-tight hidden sm:block">CCFM STUDIO</span>
              </div>
              <div className="hidden md:flex ml-8 space-x-1">
                {visibleDepartments.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => handleDepartmentChange(dept)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out ${
                      activeDepartment === dept
                        ? 'bg-gray-900 text-white shadow-md'
                        : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-3">
               {user.isAdmin && (
                <button
                  onClick={() => setIsAdminOpen(true)}
                  className="flex items-center px-3 py-1.5 text-xs font-bold text-gray-700 bg-white rounded-lg hover:bg-gray-50 transition-colors border border-gray-200 shadow-sm relative"
                >
                  <Settings className="h-3.5 w-3.5 mr-1.5" />
                  ADMIN
                  {inquiries.filter(i => i.status === 'Pending').length > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                  )}
                </button>
              )}
              <div className="h-8 w-px bg-gray-200 mx-2 hidden sm:block"></div>
              <div className="flex items-center gap-3">
                 <img
                  className="h-8 w-8 rounded-full bg-gray-200 border border-white shadow-sm"
                  src={user.avatar}
                  alt=""
                />
                <button
                  onClick={handleLogout}
                  className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="md:hidden overflow-x-auto whitespace-nowrap pb-3 -mx-4 px-4 scrollbar-hide border-t border-gray-100 pt-3">
             {visibleDepartments.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => handleDepartmentChange(dept)}
                    className={`mr-2 px-4 py-1.5 rounded-full text-sm font-medium transition-colors inline-block ${
                      activeDepartment === dept
                        ? 'bg-gray-900 text-white shadow-sm'
                        : 'bg-white text-gray-600 border border-gray-200'
                    }`}
                  >
                    {dept}
                  </button>
                ))}
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">{activeDepartment}</h1>
              <p className="mt-1 text-sm text-gray-500">
                  Total Tools: <span className="font-bold text-gray-900">{displayedTools.length}</span>
                  {searchQuery && ` (filtered)`}
              </p>
            </div>
            
            <div className="w-full md:w-auto relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full md:w-72 pl-10 pr-10 py-2 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all shadow-sm hover:border-gray-400"
                placeholder="툴 검색 (이름, 카테고리, 설명)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
        </div>

        {displayedTools.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm animate-in fade-in zoom-in-95 duration-300">
            <div className="bg-gray-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <Search className="h-10 w-10 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              {searchQuery ? `'${searchQuery}'에 대한 검색 결과가 없습니다.` : '등록된 툴이 없습니다.'}
            </h3>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-4 text-blue-600 hover:text-blue-800 font-medium text-sm underline"
              >
                검색 초기화
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-10">
            {sortedCategories.map(category => (
               <div key={category} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <div className="flex items-center gap-3 mb-4">
                     <h2 className="text-lg font-bold text-gray-800">{category}</h2>
                     <div className="h-px bg-gray-200 flex-1"></div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {groupedTools[category].map((tool) => (
                      <ToolCard 
                        key={tool.id} 
                        tool={tool} 
                        onClick={() => setSelectedTool(tool)}
                      />
                    ))}
                  </div>
               </div>
            ))}
          </div>
        )}
      </main>
      
      <footer className="bg-white border-t border-gray-200 mt-auto py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-[10px] text-gray-400">
            <p>© 2024 CCFM AI STUDIO. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
