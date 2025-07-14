import Link from 'next/link'
import { EyeIcon, BookmarkIcon, CalendarIcon, UserIcon } from '@heroicons/react/24/outline'

// 仮のデータ
const latestPapers = [
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
  },
  {
    id: 4,
    title: '角膜移植後の拒絶反応予防に関する研究',
    author: '鈴木眼科医',
    date: '2024-01-08',
    category: '角膜疾患',
    excerpt: '角膜移植後の拒絶反応を予防するための新しい治療法について報告します。',
    views: 850,
    bookmarks: 45,
    tags: ['角膜移植', '拒絶反応', '予防法']
  }
]

const categories = [
  { name: '白内障', count: 45, href: '/category/cataract', color: 'bg-blue-100 text-blue-800' },
  { name: '緑内障', count: 32, href: '/category/glaucoma', color: 'bg-green-100 text-green-800' },
  { name: '網膜疾患', count: 28, href: '/category/retinal', color: 'bg-purple-100 text-purple-800' },
  { name: '角膜疾患', count: 22, href: '/category/corneal', color: 'bg-yellow-100 text-yellow-800' },
  { name: '小児眼科', count: 18, href: '/category/pediatric', color: 'bg-pink-100 text-pink-800' },
  { name: '神経眼科', count: 15, href: '/category/neuro-ophthalmology', color: 'bg-indigo-100 text-indigo-800' }
]

const popularTags = [
  '白内障手術', '緑内障診断', '網膜剥離', '角膜移植', '小児斜視', '視神経炎', 'AI診断', '抗VEGF療法'
]

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 rounded-lg">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Eye-Blog
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            眼科医・視能訓練士・眼科看護師向けの論文専門ブログ
          </p>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            最新の眼科研究や臨床知見を共有し、眼科医療の発展に貢献します。
            専門家による質の高い論文を掲載し、実践的な知識の向上をサポートします。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/papers"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              論文一覧を見る
            </Link>
            <Link
              href="/submit"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              論文を投稿する
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Papers */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">最新論文</h2>
          <Link href="/papers" className="text-blue-600 hover:text-blue-800 font-medium">
            すべて見る →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {latestPapers.map((paper) => (
            <article key={paper.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-3">
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
              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                <Link href={`/papers/${paper.id}`} className="hover:text-blue-600">
                  {paper.title}
                </Link>
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-3">{paper.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500">
                  <UserIcon className="h-4 w-4 mr-1" />
                  {paper.author}
                  <CalendarIcon className="h-4 w-4 ml-3 mr-1" />
                  {paper.date}
                </div>
                <div className="flex space-x-1">
                  {paper.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">カテゴリー</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-shadow"
            >
              <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center ${category.color}`}>
                <EyeIcon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
              <p className="text-sm text-gray-500">{category.count}件</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Tags */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">人気タグ</h2>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${tag}`}
              className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          あなたの研究を共有しませんか？
        </h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          眼科医療の発展に貢献するため、あなたの研究や臨床経験を論文として投稿してください。
          専門家による査読を経て、質の高い論文として掲載されます。
        </p>
        <Link
          href="/submit"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          論文を投稿する
        </Link>
      </section>
    </div>
  )
}
