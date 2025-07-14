import Link from 'next/link'
import { CalendarIcon, UserIcon } from '@heroicons/react/24/outline'
import { getPapers } from '../actions/paperActions'
import type { Paper } from '../../generated/prisma'
import EditDeleteButtons from '../../components/EditDeleteButtons'

const categories = [
  'すべて', '白内障', '緑内障', '網膜疾患', '角膜疾患', '小児眼科', '神経眼科', '下書き'
]

export default async function PapersPage() {
  const papers: Paper[] = await getPapers({ includeDrafts: true })

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">論文一覧</h1>
        <p className="text-gray-600">眼科医、視能訓練士、眼科看護師による最新の研究論文をご覧いただけます。</p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">全{papers.length}件</h2>
          <Link href="/submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors font-semibold">新規投稿</Link>
        </div>
        {papers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">該当する論文が見つかりませんでした。</p>
            <p className="text-gray-400 mt-2">新規投稿をお待ちしています。</p>
          </div>
        ) : (
          <div className="space-y-6">
            {papers.map((paper) => (
              <article key={paper.id} className="border-b border-gray-200 pb-6 last:border-b-0 relative">
                {paper.isDraft && (
                  <span className="absolute top-0 right-0 bg-yellow-400 text-white text-xs px-2 py-1 rounded-bl">下書き</span>
                )}
                <div className="flex items-start justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    paper.category === '白内障' ? 'bg-blue-100 text-blue-800' :
                    paper.category === '緑内障' ? 'bg-green-100 text-green-800' :
                    paper.category === '網膜疾患' ? 'bg-purple-100 text-purple-800' :
                    paper.category === '角膜疾患' ? 'bg-yellow-100 text-yellow-800' :
                    paper.category === '小児眼科' ? 'bg-pink-100 text-pink-800' :
                    paper.category === '神経眼科' ? 'bg-indigo-100 text-indigo-800' :
                    'bg-gray-200 text-gray-600'
                  }`}>
                    {paper.category}
                  </span>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <EditDeleteButtons paper={paper} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  <Link href={`/papers/${paper.id}`} className="hover:text-blue-600 underline">
                    {paper.title}
                  </Link>
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{paper.content.slice(0, 80)}...</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <UserIcon className="h-4 w-4 mr-1" />
                    {paper.author}
                    <CalendarIcon className="h-4 w-4 ml-3 mr-1" />
                    {paper.createdAt instanceof Date ? paper.createdAt.toLocaleDateString('ja-JP') : String(paper.createdAt).slice(0, 10)}
                  </div>
                  <div className="flex space-x-2">
                    {paper.tags.split(',').map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 