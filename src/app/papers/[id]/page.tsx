import { getPaperById } from '../../actions/paperActions'
import { notFound } from 'next/navigation'
import { CalendarIcon, UserIcon } from '@heroicons/react/24/outline'
import type { Paper } from '../../../generated/prisma'
import type { DynamicParams } from '../../../types/router'

export default async function PaperDetailPage({ params }: DynamicParams<'id'>) {
  const id = Number(params.id)
  if (isNaN(id)) return notFound()
  const paper: Paper | null = await getPaperById(id)
  if (!paper) return notFound()

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 mt-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{paper.title}</h1>
      <div className="flex items-center text-sm text-gray-500 mb-4">
        <UserIcon className="h-4 w-4 mr-1" />
        {paper.author}
        <CalendarIcon className="h-4 w-4 ml-3 mr-1" />
        {paper.createdAt instanceof Date ? paper.createdAt.toLocaleDateString('ja-JP') : String(paper.createdAt).slice(0, 10)}
      </div>
      <div className="mb-4">
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
        {paper.isDraft && (
          <span className="ml-2 px-2 py-1 bg-yellow-400 text-white text-xs rounded">下書き</span>
        )}
      </div>
      <div className="mb-4 flex flex-wrap gap-2">
        {paper.tags.split(',').map((tag) => (
          <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
            {tag.trim()}
          </span>
        ))}
      </div>
      <div className="text-gray-900 whitespace-pre-line text-base leading-relaxed">
        {paper.content}
      </div>
    </div>
  )
} 