'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const categories = [
    { name: '白内障', href: '/category/cataract' },
    { name: '緑内障', href: '/category/glaucoma' },
    { name: '網膜疾患', href: '/category/retinal' },
    { name: '角膜疾患', href: '/category/corneal' },
    { name: '小児眼科', href: '/category/pediatric' },
    { name: '神経眼科', href: '/category/neuro-ophthalmology' },
  ]

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">Eye-Blog</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
              ホーム
            </Link>
            <div className="relative group">
              <button className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                カテゴリー
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-1">
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      href={category.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link href="/papers" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
              論文一覧
            </Link>
            <Link href="/submit" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
              論文投稿
            </Link>
            <Link href="/bookmarks" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
              ブックマーク
            </Link>
          </div>

          {/* Search and Mobile menu button */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="論文を検索..."
                  className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {isMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" />
              ) : (
                <Bars3Icon className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            <Link
              href="/"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              ホーム
            </Link>
            <div className="px-3 py-2">
              <div className="text-base font-medium text-gray-700 mb-2">カテゴリー</div>
              <div className="pl-4 space-y-1">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    href={category.href}
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              href="/papers"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              論文一覧
            </Link>
            <Link
              href="/submit"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              論文投稿
            </Link>
            <Link
              href="/bookmarks"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              ブックマーク
            </Link>
            <div className="px-3 py-2">
              <input
                type="text"
                placeholder="論文を検索..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      )}
    </nav>
  )
} 