import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { Home, Camera, Store, User } from 'lucide-react';

const navItems = [
  { path: '/', icon: Home, label: 'nav.home' },
  { path: '/diagnose', icon: Camera, label: 'nav.diagnose' },
  { path: '/marketplace', icon: Store, label: 'nav.marketplace' },
  { path: '/profile', icon: User, label: 'nav.profile' },
];

export function BottomNav() {
  const { t } = useTranslation();
  const location = useLocation();

  // Hide bottom nav on auth pages
  if (location.pathname.includes('/login') || location.pathname.includes('/register')) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t md:hidden">
      <div className="flex items-center justify-around h-16">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={cn(
                "flex flex-col items-center justify-center px-3 py-2 text-xs transition-colors",
                isActive
                  ? "text-krishi-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className={cn("h-5 w-5 mb-1", isActive && "text-krishi-primary")} />
              <span className="text-xs">{t(label)}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}