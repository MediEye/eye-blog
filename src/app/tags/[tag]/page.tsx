'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { EyeIcon, BookmarkIcon, CalendarIcon, UserIcon, TagIcon } from '@heroicons/react/24/outline'
import type { DynamicParams } from '../../../types/router'

// 仮の論文データ
const papers = [
  {
    id: 1,
    title: '白内障手術における新しい技術の臨床応用',
    author: '田中眼科医',
    date: '2024-01-15',
    category: '白内障',
    excerpt: '最新の白内障手術技術について、臨床データを基に詳しく解説します。',
    views: 1250,
    bookmarks: 89,
    tags: ['白内障', '手術', '臨床研究']
  },
  {
    id: 2,
    title: '緑内障の早期発見におけるAI診断の有用性',
    author: '佐藤視能訓練士',
    date: '2024-01-12',
    category: '緑内障',
    excerpt: 'AI技術を活用した緑内障の早期診断システムの開発と臨床応用について報告します。',
    views: 980,
    bookmarks: 67,
    tags: ['緑内障', 'AI診断', '早期発見']
  },
  {
    id: 3,
    title: '糖尿病網膜症の治療における抗VEGF療法の効果',
    author: '山田眼科医',
    date: '2024-01-10',
    category: '網膜疾患',
    excerpt: '抗VEGF療法による糖尿病網膜症治療の長期予後と安全性について検討しました。',
    views: 1100,
    bookmarks: 78,
    tags: ['糖尿病網膜症', '抗VEGF療法', '治療効果']
  }
]

export default function TagPage({ params }: DynamicParams<'tag'>) {
  const tag = decodeURIComponent(params.tag)
  const filtered = papers.filter(p => p.tags.includes(tag))

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
      <div className="flex items-center mb-6">
        <TagIcon className="h-7 w-7 text-blue-600 mr-2" />
        <h1 className="text-2xl font-bold text-gray-900">タグ: {tag}</h1>
      </div>
      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">該当する論文がありません。</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filtered.map((paper) => (
            <article key={paper.id} className="border-b border-gray-200 pb-6 last:border-b-0">
              <div className="flex items-start justify-between mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  paper.category === '白内障' ? 'bg-blue-100 text-blue-800' :
                  paper.category === '緑内障' ? 'bg-green-100 text-green-800' :
                  paper.category === '網膜疾患' ? 'bg-purple-100 text-purple-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {paper.category}
                </span>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <EyeIcon className="h-4 w-4 mr-1" />
                    {paper.views}
                  </div>
                  <div className="flex items-center">
                    <BookmarkIcon className="h-4 w-4 mr-1" />
                    {paper.bookmarks}
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                <Link href={`/papers/${paper.id}`} className="hover:text-blue-600">
                  {paper.title}
                </Link>
              </h3>
              <p className="text-gray-600 mb-4">{paper.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500">
                  <UserIcon className="h-4 w-4 mr-1" />
                  {paper.author}
                  <CalendarIcon className="h-4 w-4 ml-3 mr-1" />
                  {paper.date}
                </div>
                <div className="flex space-x-2">
                  {paper.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
} 