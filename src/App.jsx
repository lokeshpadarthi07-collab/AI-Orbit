import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import TasksModule from './components/TasksModule';
import BusinessModule from './components/BusinessModule';
import LeaderboardModule from './components/LeaderboardModule';
import CompaniesModule from './components/CompaniesModule';
import RobotsModule from './components/RobotsModule';
import LearnModule from './components/LearnModule';
import AnalyticsModule from './components/AnalyticsModule';

import TaskDetailModal from './components/TaskDetailModal';
import BusinessToolModal from './components/BusinessToolModal';
import CompanyDetailModal from './components/CompanyDetailModal';
import RobotDetailModal from './components/RobotDetailModal';
import CourseDetailModal from './components/CourseDetailModal';
import CompareModelsModal from './components/CompareModelsModal';
import SubmitTaskModal from './components/SubmitTaskModal';
import GlobalSearchModal from './components/GlobalSearchModal';
import BookmarksDrawer from './components/BookmarksDrawer';
import CopilotWidget from './components/CopilotWidget';
import Toast from './components/Toast';

import {
  initialTasks,
  initialBusinessTools,
  initialLeaderboard,
  initialCompanies,
  initialRobots,
  initialLearn,
  platformAnalytics
} from '../server/data.js';

export default function App() {
  const [activeTab, setActiveTab] = useState('tasks'); // 'tasks' | 'business' | 'leaderboard' | 'companies' | 'robots' | 'learn' | 'analytics'
  const [analytics, setAnalytics] = useState(platformAnalytics);

  // Light / Dark Theme State
  const [theme, setTheme] = useState('dark');

  const handleToggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    if (nextTheme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }
    showToast(`Switched to ${nextTheme === 'dark' ? 'Dark Obsidian' : 'Light Clean'} Theme`);
  };

  // State Stores
  const [tasks, setTasks] = useState(initialTasks);
  const [businessTools, setBusinessTools] = useState(initialBusinessTools);
  const [leaderboard, setLeaderboard] = useState(initialLeaderboard);
  const [companies, setCompanies] = useState(initialCompanies);
  const [robots, setRobots] = useState(initialRobots);
  const [learn, setLearn] = useState(initialLearn);
  const [bookmarkedIds, setBookmarkedIds] = useState(['task-101', 'task-102', 'task-105']);

  // Selection Modals
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedTool, setSelectedTool] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedRobot, setSelectedRobot] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [detailModalTab, setDetailModalTab] = useState('overview');
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // Filter state for category quick select from Hero
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Toast state
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
  };

  // Initial Fetch from REST API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tasksRes, bizRes, leadRes, compRes, robRes, learnRes, analyticsRes] = await Promise.allSettled([
          fetch('/api/tasks'),
          fetch('/api/business'),
          fetch('/api/leaderboard'),
          fetch('/api/companies'),
          fetch('/api/robots'),
          fetch('/api/learn'),
          fetch('/api/analytics')
        ]);

        if (tasksRes.status === 'fulfilled' && tasksRes.value.ok) {
          const data = await tasksRes.value.json();
          setTasks(data.tasks);
          if (data.bookmarkedIds) setBookmarkedIds(data.bookmarkedIds);
        }
        if (bizRes.status === 'fulfilled' && bizRes.value.ok) {
          const data = await bizRes.value.json();
          setBusinessTools(data);
        }
        if (leadRes.status === 'fulfilled' && leadRes.value.ok) {
          const data = await leadRes.value.json();
          setLeaderboard(data);
        }
        if (compRes.status === 'fulfilled' && compRes.value.ok) {
          const data = await compRes.value.json();
          setCompanies(data);
        }
        if (robRes.status === 'fulfilled' && robRes.value.ok) {
          const data = await robRes.value.json();
          setRobots(data);
        }
        if (learnRes.status === 'fulfilled' && learnRes.value.ok) {
          const data = await learnRes.value.json();
          setLearn(data);
        }
        if (analyticsRes.status === 'fulfilled' && analyticsRes.value.ok) {
          const data = await analyticsRes.value.json();
          setAnalytics(data);
        }
      } catch (err) {
        console.warn("Backend REST API offline, using local datasets.", err);
      }
    };

    fetchData();
  }, []);

  // Toggle Bookmark
  const handleToggleBookmark = async (taskId) => {
    let nextBookmarked;
    if (bookmarkedIds.includes(taskId)) {
      nextBookmarked = bookmarkedIds.filter(id => id !== taskId);
      showToast("Removed from bookmarks");
    } else {
      nextBookmarked = [...bookmarkedIds, taskId];
      showToast("Saved to bookmarks");
    }
    setBookmarkedIds(nextBookmarked);

    try {
      await fetch(`/api/tasks/${taskId}/bookmark`, { method: 'POST' });
    } catch (e) {
      // Local state updated
    }
  };

  // Select Task to open detail modal
  const handleSelectTask = (task, initialSubTab = 'overview') => {
    setSelectedTask(task);
    setDetailModalTab(initialSubTab);
  };

  // Launch Sandbox from card action
  const handleRunSandbox = (task) => {
    setSelectedTask(task);
    setDetailModalTab('sandbox');
  };

  // Navigation Tab Change Helper with Smooth Scroll to Top
  const handleNavChange = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handleTaskSubmitted = (newTask) => {
    setTasks(prev => [newTask, ...prev]);
    setActiveTab('tasks');
  };

  // Quick Select Category from Hero
  const handleSelectQuickCategory = (cat) => {
    setActiveTab('tasks');
    setSelectedCategory(cat);
  };

  const bookmarkedTasksList = tasks.filter(t => bookmarkedIds.includes(t.id));

  return (
    <div className="min-h-screen flex flex-col bg-[#09090b] text-zinc-100 selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleNavChange}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onOpenSubmit={() => setIsSubmitOpen(true)}
        onOpenCompare={() => setIsCompareOpen(true)}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        bookmarkedCount={bookmarkedIds.length}
      />

      {/* Hero Banner (Shown on Tasks homepage) */}
      {activeTab === 'tasks' && (
        <HeroBanner
          analytics={analytics}
          activeTab={activeTab}
          onSelectQuickCategory={handleSelectQuickCategory}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'tasks' && (
          <TasksModule
            tasks={tasks}
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={handleToggleBookmark}
            onSelectTask={handleSelectTask}
            onRunSandbox={handleRunSandbox}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        )}

        {activeTab === 'business' && (
          <BusinessModule
            tools={businessTools}
            showToast={showToast}
            onSelectTool={setSelectedTool}
          />
        )}

        {activeTab === 'leaderboard' && (
          <LeaderboardModule
            leaderboard={leaderboard}
            onOpenCompare={() => setIsCompareOpen(true)}
          />
        )}

        {activeTab === 'companies' && (
          <CompaniesModule
            companies={companies}
            onSelectCompany={setSelectedCompany}
          />
        )}

        {activeTab === 'robots' && (
          <RobotsModule
            robots={robots}
            onSelectRobot={setSelectedRobot}
          />
        )}

        {activeTab === 'learn' && (
          <LearnModule
            learn={learn}
            showToast={showToast}
            onSelectCourse={setSelectedCourse}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsModule
            analytics={analytics}
            tasks={tasks}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-zinc-800/80 bg-zinc-950 py-12 text-xs text-zinc-400">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="font-heading font-bold text-white text-base">AI ORBIT</span>
            <p className="text-zinc-500">The premier platform for AI tasks, autonomous workflows, and intelligence benchmarks.</p>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <button onClick={() => handleNavChange('tasks')} className="hover:text-white">AI Tasks</button>
            <button onClick={() => handleNavChange('business')} className="hover:text-white">Business Functions</button>
            <button onClick={() => handleNavChange('leaderboard')} className="hover:text-white">Leaderboard</button>
            <button onClick={() => handleNavChange('companies')} className="hover:text-white">Companies</button>
            <button onClick={() => handleNavChange('robots')} className="hover:text-white">Robotics</button>
            <button onClick={() => handleNavChange('learn')} className="hover:text-white">AI Learn</button>
            <button onClick={() => handleNavChange('analytics')} className="hover:text-white">Analytics</button>
          </div>
          <div className="text-zinc-500">
            © 2026 AI Orbit. Built for Module Design & Development Submission.
          </div>
        </div>
      </footer>

      {/* Modals & Drawers */}
      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          isBookmarked={bookmarkedIds.includes(selectedTask.id)}
          onToggleBookmark={handleToggleBookmark}
          initialTab={detailModalTab}
          showToast={showToast}
        />
      )}

      {selectedTool && (
        <BusinessToolModal
          tool={selectedTool}
          onClose={() => setSelectedTool(null)}
          showToast={showToast}
        />
      )}

      {selectedCompany && (
        <CompanyDetailModal
          company={selectedCompany}
          onClose={() => setSelectedCompany(null)}
          showToast={showToast}
        />
      )}

      {selectedRobot && (
        <RobotDetailModal
          robot={selectedRobot}
          onClose={() => setSelectedRobot(null)}
          showToast={showToast}
        />
      )}

      {selectedCourse && (
        <CourseDetailModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
          showToast={showToast}
        />
      )}

      {isCompareOpen && (
        <CompareModelsModal
          isOpen={isCompareOpen}
          onClose={() => setIsCompareOpen(false)}
          leaderboard={leaderboard}
        />
      )}

      {isSubmitOpen && (
        <SubmitTaskModal
          onClose={() => setIsSubmitOpen(false)}
          onTaskSubmitted={handleTaskSubmitted}
          showToast={showToast}
        />
      )}

      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarkedTasks={bookmarkedTasksList}
        onToggleBookmark={handleToggleBookmark}
        onSelectTask={handleSelectTask}
      />

      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        tasks={tasks}
        businessTools={businessTools}
        companies={companies}
        learn={learn}
        onSelectTask={handleSelectTask}
        setActiveTab={handleNavChange}
      />

      <CopilotWidget
        onSelectTask={handleSelectTask}
        setActiveTab={handleNavChange}
      />

      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />

    </div>
  );
}
