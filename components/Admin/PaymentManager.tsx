import React, { useState } from 'react';
import { Tool, AccountInfo } from '../../types';
import { Button } from '../Button';
import { Edit2, Trash2, Plus, X, Save, CreditCard } from 'lucide-react';

interface PaymentManagerProps {
  tools: Tool[];
  onUpdateTools: (tools: Tool[]) => void;
}

// Extended interface for the flat row structure
interface PaymentRow extends AccountInfo {
  toolId: string;
  toolName: string;
  department: string;
}

const EMPTY_ACCOUNT: AccountInfo = {
  id: '', accountId: '', accountPw: '', twoFactorNote: '', creatorName: '',
  paymentType: '', cost: '', cardName: '', cardNum: '', paymentDate: '', connectedAccount: '', cardPw: ''
};

export const PaymentManager: React.FC<PaymentManagerProps> = ({ tools, onUpdateTools }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedToolId, setSelectedToolId] = useState<string>('');
  const [currentAccount, setCurrentAccount] = useState<AccountInfo>(EMPTY_ACCOUNT);

  // Flatten tools and accounts to make a row-based structure
  const rows: PaymentRow[] = tools.flatMap(tool => 
    tool.accounts.map(acc => ({
      toolId: tool.id,
      toolName: tool.name,
      department: tool.department,
      ...acc
    }))
  );

  const handleAddNew = () => {
    if (tools.length === 0) {
      alert('먼저 툴/카테고리를 추가해주세요.');
      return;
    }
    setSelectedToolId(tools[0].id); // Default to first tool
    setCurrentAccount({ ...EMPTY_ACCOUNT, id: Date.now().toString() });
    setIsEditing(true);
  };

  const handleEdit = (row: PaymentRow) => {
    setSelectedToolId(row.toolId);
    // Extract only AccountInfo parts
    const { toolId, toolName, department, ...accInfo } = row;
    setCurrentAccount(accInfo);
    setIsEditing(true);
  };

  const handleDelete = (row: PaymentRow) => {
    if (!confirm(`${row.toolName}의 이 결제 정보(${row.accountId})를 삭제하시겠습니까?`)) return;

    const updatedTools = tools.map(tool => {
      if (tool.id === row.toolId) {
        return {
          ...tool,
          accounts: tool.accounts.filter(a => a.id !== row.id)
        };
      }
      return tool;
    });

    onUpdateTools(updatedTools);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedTools = tools.map(tool => {
      if (tool.id === selectedToolId) {
        const existingAccIndex = tool.accounts.findIndex(a => a.id === currentAccount.id);
        let newAccounts = [...tool.accounts];
        
        if (existingAccIndex >= 0) {
          // Update existing
          newAccounts[existingAccIndex] = currentAccount;
        } else {
          // Add new
          newAccounts.push(currentAccount);
        }
        return { ...tool, accounts: newAccounts };
      }
      return tool;
    });

    onUpdateTools(updatedTools);
    setIsEditing(false);
  };

  // Helper to update form state
  const updateField = (field: keyof AccountInfo, value: string) => {
    setCurrentAccount(prev => ({ ...prev, [field]: value }));
  };

  if (isEditing) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto mt-4">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
              <CreditCard className="mr-2 h-6 w-6 text-blue-600"/>
              {currentAccount.accountId ? '결제 정보 수정' : '새 결제 내역 추가'}
            </h2>
            <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600">
              <X className="h-6 w-6" />
            </button>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Tool Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">대상 툴 선택</label>
            <select 
              value={selectedToolId} 
              onChange={e => setSelectedToolId(e.target.value)}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border"
              disabled={rows.some(r => r.id === currentAccount.id)} // Disable if editing existing
            >
              {tools.map(t => (
                <option key={t.id} value={t.id}>{t.department} - {t.name}</option>
              ))}
            </select>
            <p className="mt-1 text-xs text-gray-500">결제 정보는 선택한 툴의 하위 계정으로 등록됩니다.</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">재무 정보</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">결제 금액</label>
                <input 
                  type="text" 
                  required
                  placeholder="$20"
                  className="w-full border-gray-300 rounded border p-2 text-sm"
                  value={currentAccount.cost || ''}
                  onChange={e => updateField('cost', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">결제 유형</label>
                <input 
                  type="text" 
                  placeholder="월 정기 결제"
                  className="w-full border-gray-300 rounded border p-2 text-sm"
                  value={currentAccount.paymentType || ''}
                  onChange={e => updateField('paymentType', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">결제일</label>
                <input 
                  type="text" 
                  placeholder="매월 20일"
                  className="w-full border-gray-300 rounded border p-2 text-sm"
                  value={currentAccount.paymentDate || ''}
                  onChange={e => updateField('paymentDate', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">카드사 / 은행</label>
                <input 
                  type="text" 
                  placeholder="현대카드"
                  className="w-full border-gray-300 rounded border p-2 text-sm"
                  value={currentAccount.cardName || ''}
                  onChange={e => updateField('cardName', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">카드 번호</label>
                <input 
                  type="text" 
                  placeholder="0000-0000-0000-0000"
                  className="w-full border-gray-300 rounded border p-2 text-sm font-mono"
                  value={currentAccount.cardNum || ''}
                  onChange={e => updateField('cardNum', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">카드 비밀번호 (관리자용)</label>
                <input 
                  type="text" 
                  placeholder="0000"
                  className="w-full border-gray-300 rounded border p-2 text-sm font-mono"
                  value={currentAccount.cardPw || ''}
                  onChange={e => updateField('cardPw', e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h3 className="text-sm font-semibold text-blue-900 mb-4 uppercase tracking-wider">계정 연결 정보</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-blue-800 mb-1">로그인 ID (이메일)</label>
                  <input 
                    type="text" 
                    required
                    className="w-full border-blue-200 rounded border p-2 text-sm"
                    value={currentAccount.accountId}
                    onChange={e => updateField('accountId', e.target.value)}
                  />
                </div>
                 <div>
                  <label className="block text-xs font-medium text-blue-800 mb-1">로그인 비밀번호</label>
                  <input 
                    type="text" 
                    required
                    className="w-full border-blue-200 rounded border p-2 text-sm"
                    value={currentAccount.accountPw}
                    onChange={e => updateField('accountPw', e.target.value)}
                  />
                </div>
                 <div>
                  <label className="block text-xs font-medium text-blue-800 mb-1">연결된 관리자 계정</label>
                  <input 
                    type="text" 
                    className="w-full border-blue-200 rounded border p-2 text-sm"
                    value={currentAccount.connectedAccount || ''}
                    onChange={e => updateField('connectedAccount', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-blue-800 mb-1">2차 인증 노트</label>
                  <input 
                    type="text" 
                    className="w-full border-blue-200 rounded border p-2 text-sm"
                    value={currentAccount.twoFactorNote}
                    onChange={e => updateField('twoFactorNote', e.target.value)}
                  />
                </div>
             </div>
          </div>

          <div className="flex justify-end pt-4 gap-3">
            <Button type="button" variant="secondary" onClick={() => setIsEditing(false)}>취소</Button>
            <Button type="submit" variant="primary"><Save className="h-4 w-4 mr-2"/> 저장 완료</Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">결제 및 재무 현황</h2>
        <Button onClick={handleAddNew} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          결제 수단 추가
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">사업부 / 툴</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">금액/일자</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">카드 정보</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">연결 계정</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">관리</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rows.length === 0 ? (
               <tr>
                 <td colSpan={5} className="px-6 py-10 text-center text-gray-500 text-sm">
                   등록된 결제 정보가 없습니다.
                 </td>
               </tr>
            ) : rows.map((row, idx) => (
              <tr key={`${row.toolId}-${row.id}-${idx}`} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{row.toolName}</div>
                  <div className="text-xs text-gray-500">{row.department}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 font-semibold">{row.cost}</div>
                  <div className="text-xs text-gray-500">{row.paymentDate}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-700">{row.cardName}</span>
                    <span className="text-xs text-gray-400 font-mono">{row.cardNum}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600">{row.connectedAccount}</div>
                  <div className="text-xs text-gray-400">{row.accountId}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button onClick={() => handleEdit(row)} className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded">
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleDelete(row)} className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};