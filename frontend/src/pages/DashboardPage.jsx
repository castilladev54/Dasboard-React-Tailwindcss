
import { useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { formatDate } from "../utils/date";
import Button from "../components/atoms/Button";
import { authContent } from "../constants";
import Sidebar from "../components/Sidebar";
import CategoryManager from "../components/CategoryManager";
import ProductManager from "../components/ProductManager";
import PurchaseManager from "../components/PurchaseManager";
import SalesManager from "../components/SalesManager";
import AnalyticsManager from "../components/AnalyticsManager";
import AdminUserCreator from "../components/AdminUserCreator";
import { AiChatWindow } from "../components/organisms/AiChatWindow";
import { Bot, Sparkles } from "lucide-react";
const DashboardPage = () => {
  const { user, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("categories");
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };
  return (
    <>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className={`transition-all duration-300 w-full pt-20 md:pt-10 min-h-screen border-t-0 ${isOpen ? 'md:pl-64' : 'md:pl-20'} pl-0`}>
        {activeTab === "categories" && <CategoryManager />}
        {activeTab === "products" && <ProductManager />}
        {activeTab === "purchases" && <PurchaseManager />}
        {activeTab === "sales" && <SalesManager />}
        {activeTab === "analytics" && <AnalyticsManager />}
        {activeTab === "adminCreateUser" && <AdminUserCreator />}
      </main>

      {/* Floating AI Button */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 z-40 p-4 bg-gradient-to-r from-emerald-500 to-green-600 border border-green-400 text-white rounded-full shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:scale-110 hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] transition-all duration-300 flex items-center justify-center group"
        >
          <Bot className="w-8 h-8 group-hover:animate-pulse" />
          <Sparkles className="absolute top-1 right-1 w-4 h-4 text-emerald-100" />
        </button>
      )}

      {/* AI Chat Window */}
      {isChatOpen && <AiChatWindow onClose={() => setIsChatOpen(false)} />}
    </>
  );
};
export default DashboardPage;
