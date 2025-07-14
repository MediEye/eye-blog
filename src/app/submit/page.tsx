'use client'

import { useState, useTransition } from 'react'
import { createPaper } from '../actions/paperActions'

const categories = [
  '白内障', '緑内障', '網膜疾患', '角膜疾患', '小児眼科', '神経眼科'
]

export default function SubmitPage() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [category, setCategory] = useState(categories[0])
  const [tags, setTags] = useState('')
  const [content, setContent] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    startTransition(async () => {
      await createPaper({ title, author, category, tags, content })
      setSubmitted(true)
    })
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">論文を投稿する</h1>
      {submitted ? (
        <div className="text-center py-12">
          <p className="text-blue-600 text-lg font-semibold mb-2">投稿が完了しました！</p>
          <p className="text-gray-500">ご投稿いただきありがとうございます。内容を確認後、掲載されます。</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">タイトル</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">著者名</label>
            <input
              type="text"
              value={author}
              onChange={e => setAuthor(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">カテゴリー</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">タグ（カンマ区切り）</label>
            <input
              type="text"
              value={tags}
              onChange={e => setTags(e.target.value)}
              placeholder="例: 白内障, 手術, 臨床研究"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">本文</label>
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              required
              rows={10}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              disabled={isPending}
            >
              {isPending ? '投稿中...' : '投稿する'}
            </button>
          </div>
        </form>
      )}
    </div>
  )
} 