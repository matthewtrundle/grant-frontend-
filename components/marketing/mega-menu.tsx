"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MenuItem {
  label: string;
  href: string;
  description?: string;
  icon?: LucideIcon;
  badge?: string;
}

export interface MenuColumn {
  title: string;
  items: MenuItem[];
}

export interface MegaMenuItemProps {
  label: string;
  columns?: MenuColumn[];
  href?: string;
  className?: string;
  isScrolled?: boolean;
}

export function MegaMenuItem({
  label,
  columns,
  href,
  className,
  isScrolled = false
}: MegaMenuItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hasDropdown = columns && columns.length > 0;
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Simple link without dropdown
  if (!hasDropdown && href) {
    return (
      <Link
        href={href}
        className={cn(
          "text-sm font-medium transition-colors duration-300",
          isScrolled
            ? "text-gray-900 hover:text-purple-600"
            : "text-gray-700 hover:text-gray-900",
          className
        )}
      >
        {label}
      </Link>
    );
  }

  const handleMouseEnter = () => {
    // Clear any pending close timeout
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    // Delay closing by 150ms to prevent accidental reopens when moving between menu items
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger Button */}
      <button
        className={cn(
          "flex items-center gap-1 text-sm font-medium transition-colors duration-300",
          isScrolled
            ? "text-gray-900 hover:text-purple-600"
            : "text-gray-700 hover:text-gray-900"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {label}
        {hasDropdown && (
          <ChevronDown
            className={cn(
              "w-4 h-4 transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        )}
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && hasDropdown && (
          <>
            {/* Backdrop blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Mega Menu Content */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50"
            >
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-2xl min-w-[600px]">
                {/* Grid of columns */}
                <div
                  className={cn(
                    "grid gap-8",
                    columns.length === 1 && "grid-cols-1",
                    columns.length === 2 && "grid-cols-2",
                    columns.length === 3 && "grid-cols-3",
                    columns.length >= 4 && "grid-cols-4"
                  )}
                >
                  {columns.map((column, columnIndex) => (
                    <div key={columnIndex} className="space-y-4">
                      {/* Column Title */}
                      {column.title && (
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          {column.title}
                        </h3>
                      )}

                      {/* Column Items */}
                      <div className="space-y-1">
                        {column.items.map((item, itemIndex) => (
                          <Link
                            key={itemIndex}
                            href={item.href}
                            className="group block p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                            onClick={() => setIsOpen(false)}
                          >
                            <div className="flex items-start gap-3">
                              {/* Icon */}
                              {item.icon && (
                                <div className="flex-shrink-0 w-8 h-8 rounded-md bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-600 group-hover:bg-purple-200 transition-colors">
                                  <item.icon className="w-4 h-4" />
                                </div>
                              )}

                              {/* Label & Description */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium text-gray-900 group-hover:text-purple-600 transition-colors">
                                    {item.label}
                                  </span>
                                  {item.badge && (
                                    <span className="text-xs px-1.5 py-0.5 rounded bg-purple-100 text-purple-700 border border-purple-200">
                                      {item.badge}
                                    </span>
                                  )}
                                </div>
                                {item.description && (
                                  <p className="text-xs text-gray-600 mt-0.5 line-clamp-2">
                                    {item.description}
                                  </p>
                                )}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// Simplified mobile-friendly navigation menu
export interface MobileMenuProps {
  items: Array<{
    label: string;
    href?: string;
    columns?: MenuColumn[];
  }>;
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ items, isOpen, onClose }: MobileMenuProps) {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Mobile Menu Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white z-50 overflow-y-auto"
          >
            <div className="p-6">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="mb-6 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Menu Items */}
              <div className="space-y-2">
                {items.map((item, index) => (
                  <div key={index} className="space-y-2">
                    {/* Main Item */}
                    {item.href && !item.columns ? (
                      <Link
                        href={item.href}
                        className="block py-3 text-base font-medium text-gray-900 hover:text-purple-600 transition-colors"
                        onClick={onClose}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <button
                        className="flex items-center justify-between w-full py-3 text-base font-medium text-gray-900 hover:text-purple-600 transition-colors"
                        onClick={() =>
                          setExpandedItem(expandedItem === index ? null : index)
                        }
                      >
                        {item.label}
                        <ChevronDown
                          className={cn(
                            "w-5 h-5 transition-transform",
                            expandedItem === index && "rotate-180"
                          )}
                        />
                      </button>
                    )}

                    {/* Expanded Sub-items */}
                    <AnimatePresence>
                      {expandedItem === index && item.columns && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 space-y-4 pb-4">
                            {item.columns.map((column, colIndex) => (
                              <div key={colIndex} className="space-y-2">
                                {column.title && (
                                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    {column.title}
                                  </h4>
                                )}
                                <div className="space-y-1">
                                  {column.items.map((subItem, subIndex) => (
                                    <Link
                                      key={subIndex}
                                      href={subItem.href}
                                      className="block py-2 text-sm text-gray-700 hover:text-purple-600 transition-colors"
                                      onClick={onClose}
                                    >
                                      {subItem.label}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
