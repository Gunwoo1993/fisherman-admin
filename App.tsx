
import React, { useState, useEffect } from 'react';
import { 
  Users, 
  FileText, 
  Settings, 
  Bell, 
  LayoutDashboard, 
  Database, 
  LogOut,
  ChevronRight,
  Map as MapIcon,
  Lock,
  Mail,
  ArrowRight,
  Loader2,
  X,
  ShieldAlert
} from 'lucide-react';
import FishermanManagement from './components/FishermanManagement';
import WorkLogManagement from './components/WorkLogManagement';
import TemplateManagement from './components/TemplateManagement';
import NoticeManagement from './components/NoticeManagement';
import DBSchemaDesign from './components/DBSchemaDesign';
import CageAssetManagement from './components/CageAssetManagement';

type ViewType = 'fisherman' | 'worklog' | 'template' | 'notice' | 'db-design' | 'cage-assets';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  
  const [currentView, setCurrentView] = useState<ViewType>('fisherman');
  const [refreshKey, setRefreshKey] = useState(0);

  // DB 설정 접근 제한용 상태
  const [showDBAuthModal, setShowDBAuthModal] = useState(false);
  const [dbPassword, setDbPassword] = useState('');
  const [dbAuthError, setDbAuthError] = useState(false);
  const [isDBUnlocked, setIsDBUnlocked] = useState(false);

  // 세션 체크
  useEffect(() => {
    const authStatus = localStorage.getItem('ADMIN_AUTH');
    if (authStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setLoginError('');

    // 실제 관리자 계정 체크
    setTimeout(() => {
      if (loginForm.email === 'admin@aquapro.com' && loginForm.password === 'aquapro') {
        setIsLoggedIn(true);
        localStorage.setItem('ADMIN_AUTH', 'true');
      } else {
        setLoginError('아이디 또는 비밀번호가 일치하지 않습니다.');
      }
      setIsAuthenticating(false);
    }, 800);
  };

  const handleLogout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      setIsLoggedIn(false);
      setIsDBUnlocked(false);
      localStorage.removeItem('ADMIN_AUTH');
    }
  };

  const handleConfigSave = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleSidebarClick = (view: ViewType) => {
    if (view === 'db-design' && !isDBUnlocked) {
      setShowDBAuthModal(true);
      setDbPassword('');
      setDbAuthError(false);
      return;
    }
    setCurrentView(view);
  };

  const handleDBAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (dbPassword === '220993') {
      setIsDBUnlocked(true);
      setShowDBAuthModal(false);
      setCurrentView('db-design');
    } else {
      setDbAuthError(true);
      setDbPassword('');
      setTimeout(() => setDbAuthError(false), 2000);
    }
  };

  const SidebarItem = ({ icon: Icon, label, view }: { icon: any, label: string, view: ViewType }) => (
    <button
      onClick={() => handleSidebarClick(view)}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
        currentView === view 
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
          : 'text-slate-500 hover:bg-slate-100'
      }`}
    >
      <Icon size={20} />
      <span className="font-bold text-sm">{label}</span>
      {currentView === view && <ChevronRight size={16} className="ml-auto" />}
    </button>
  );

  // 로그인 화면 렌더링
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#F2F4F6] flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-[40px] shadow-2xl overflow-hidden p-10 space-y-10 animate-fadeIn">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-[30px] flex items-center justify-center mx-auto shadow-inner">
              <Database size={40} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Fisherman Admin</h1>
              <p className="text-slate-400 font-bold text-[10px] tracking-[0.2em] uppercase mt-1">Aquapro Management System</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={20} />
                <input 
                  type="email" 
                  placeholder="관리자 이메일"
                  required
                  value={loginForm.email}
                  onChange={e => setLoginForm({...loginForm, email: e.target.value})}
                  className="w-full pl-14 pr-6 py-5 bg-slate-50 border-none rounded-2xl font-bold outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={20} />
                <input 
                  type="password" 
                  placeholder="비밀번호"
                  required
                  value={loginForm.password}
                  onChange={e => setLoginForm({...loginForm, password: e.target.value})}
                  className="w-full pl-14 pr-6 py-5 bg-slate-50 border-none rounded-2xl font-bold outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>
            </div>

            {loginError && (
              <p className="text-red-500 text-xs font-bold text-center animate-bounce">{loginError}</p>
            )}

            <button 
              type="submit" 
              disabled={isAuthenticating}
              className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-200 active:scale-95 transition-all flex items-center justify-center gap-2 group"
            >
              {isAuthenticating ? <Loader2 className="animate-spin" size={24} /> : (
                <>
                  로그인 <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="pt-6 border-t text-center">
            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">© 2024 AQUAPRO Corp. All rights reserved.</p>
          </div>
        </div>
      </div>
    );
  }

  // 메인 시스템 렌더링
  const renderContent = () => {
    switch (currentView) {
      case 'fisherman': return <FishermanManagement key={`fisher-${refreshKey}`} />;
      case 'worklog': return <WorkLogManagement key={`work-${refreshKey}`} />;
      case 'template': return <TemplateManagement key={`temp-${refreshKey}`} />;
      case 'notice': return <NoticeManagement key={`notice-${refreshKey}`} />;
      case 'cage-assets': return <CageAssetManagement key={`cage-${refreshKey}`} />;
      case 'db-design': return <DBSchemaDesign key={`db-${refreshKey}`} onConfigSave={handleConfigSave} />;
      default: return <FishermanManagement />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-['Inter','Noto_Sans_KR']">
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col fixed h-full z-[100]">
        <div className="p-6">
          <h1 className="text-xl font-black text-blue-600 flex items-center gap-2 tracking-tighter">
            <Database size={24} />
            FISHERMAN
          </h1>
          <p className="text-[10px] text-slate-300 mt-1 uppercase tracking-[0.2em] font-black">Admin System</p>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-4">
          <div className="pt-2 pb-2 px-4"><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">운영 관리</p></div>
          <SidebarItem icon={Users} label="어업인 관리" view="fisherman" />
          <SidebarItem icon={MapIcon} label="가두리 시설 관리" view="cage-assets" />
          <SidebarItem icon={FileText} label="작업일지 조회" view="worklog" />
          <SidebarItem icon={Settings} label="일지 양식 설정" view="template" />
          <SidebarItem icon={Bell} label="공지사항 관리" view="notice" />
          
          <div className="pt-6 pb-2 px-4"><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">시스템</p></div>
          <SidebarItem icon={Database} label="DB 설정" view="db-design" />
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 w-full text-slate-400 hover:text-red-500 rounded-lg transition-colors font-bold text-xs tracking-widest uppercase"
          >
            <LogOut size={16} />
            <span>로그아웃</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 ml-64">
        {renderContent()}
      </main>

      {/* DB 설정 인증 모달 */}
      {showDBAuthModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[250] flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] shadow-2xl w-full max-sm:max-w-xs overflow-hidden animate-fadeIn p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
              <ShieldAlert size={32} />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900">개발자 인증</h3>
              <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">Developer Access Required</p>
            </div>
            
            <form onSubmit={handleDBAuth} className="space-y-4">
              <input 
                type="password" 
                maxLength={6}
                autoFocus
                placeholder="6자리 패스워드 입력"
                value={dbPassword}
                onChange={e => setDbPassword(e.target.value)}
                className={`w-full text-center py-4 bg-slate-50 border-2 rounded-2xl text-xl font-black outline-none tracking-[0.5em] transition-all ${dbAuthError ? 'border-red-500 animate-shake' : 'border-transparent focus:border-blue-100'}`}
              />
              {dbAuthError && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest">인증번호가 일치하지 않습니다.</p>}
              
              <div className="flex gap-3 pt-2">
                <button 
                  type="button"
                  onClick={() => setShowDBAuthModal(false)}
                  className="flex-1 py-4 bg-white border border-slate-200 text-slate-400 font-black rounded-xl text-xs active:scale-95 transition-all"
                >
                  취소
                </button>
                <button 
                  type="submit"
                  className="flex-[2] py-4 bg-blue-600 text-white font-black rounded-xl text-xs shadow-lg shadow-blue-100 active:scale-95 transition-all"
                >
                  확인
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
