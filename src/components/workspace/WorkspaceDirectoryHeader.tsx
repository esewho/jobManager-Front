"use client";

import React from "react"

import { useState } from "react";

interface WorkspaceDirectoryHeaderProps {
  onSearch?: (query: string) => void;
  avatarUrl?: string;
}

export function WorkspaceDirectoryHeader({
  onSearch,
  avatarUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuDX_Tzbb7kcFMzwuatO7iuxHE1Ocm9TWOhhSv80b4tmaYT8lEfdhgjy9Ut4pLRXA93lAkNRXxgovPlf9jbnTgTYRylQ-AQkCQv7YKvDkDi7yrSJp4GiF5qKCYboJQ8uW6D5BONv4l0eT0ifWfV9-af3F081nXb3FLPqOPAnQWbHi7-Zob0NQ2vQAxbXIo0SmKw5X4cMUQRYWvmRJOaFpcdN3xTm2EBtTqeVfHjHTwAhGHCtpOuJCVEKPG2wylZAZcybNdW0V0SwBS0",
}: WorkspaceDirectoryHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch?.(e.target.value);
  };

  const navLinks = [
    { label: "Dashboard", href: "#", active: false },
    { label: "Workspaces", href: "#", active: true },
    { label: "Staff", href: "#", active: false },
    { label: "Analytics", href: "#", active: false },
  ];

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#e7ebf3]  bg-white  px-6 md:px-10 py-3 sticky top-0 z-50">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-4 text-[#135bec]">
          <div className="size-8 flex items-center justify-center bg-[#135bec]/10 rounded-lg">
            <svg className="w-5 h-5 text-[#135bec]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </div>
          <h2 className="text-[#0d121b]  text-lg font-bold leading-tight tracking-[-0.015em]">
            Admin Workspace
          </h2>
        </div>

        <label className="hidden md:flex flex-col min-w-40 !h-10 max-w-64">
          <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
            <div className="text-[#4c669a]  flex border-none bg-[#e7ebf3]  items-center justify-center pl-4 rounded-l-lg">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0d121b]  focus:outline-none focus:ring-0 border-none bg-[#e7ebf3] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal"
              placeholder="Filter workspaces..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </label>
      </div>

      <div className="flex flex-1 justify-end gap-4 md:gap-8">
        <nav className="hidden lg:flex items-center gap-9">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={
                link.active
                  ? "text-[#135bec] text-sm font-bold border-b-2 border-[#135bec] py-1"
                  : "text-[#0d121b]  text-sm font-medium hover:text-[#135bec] transition-colors"
              }
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex gap-2">
          <button
            type="button"
            className="flex items-center justify-center rounded-lg h-10 w-10 bg-[#e7ebf3]  text-[#0d121b]  hover:bg-[#d0d7e6]  transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <button
            type="button"
            className="flex items-center justify-center rounded-lg h-10 w-10 bg-[#e7ebf3]  text-[#0d121b]  hover:bg-[#d0d7e6]  transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>

        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-[#135bec]/20"
          style={{ backgroundImage: `url("${avatarUrl}")` }}
        />
      </div>
    </header>
  );
}
