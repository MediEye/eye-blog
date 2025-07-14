"use client";

import { useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import type { Paper } from "../generated/prisma";
import { updatePaper, deletePaper } from "../app/actions/paperActions";

const categories = [
  '白内障', '緑内障', '網膜疾患', '角膜疾患', '小児眼科', '神経眼科'
];

export default function EditDeleteButtons({ paper }: { paper: Paper }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [title, setTitle] = useState(paper.title);
  const [author, setAuthor] = useState(paper.author);
  const [category, setCategory] = useState(paper.category);
  const [tags, setTags] = useState(paper.tags);
  const [content, setContent] = useState(paper.content);
  const [isDraft, setIsDraft] = useState(paper.isDraft);

  const handleUpdate = async () => {
    setIsPending(true);
    await updatePaper({ id: paper.id, title, author, category, tags, content, isDraft });
    setIsPending(false);
    setIsEditing(false);
  };
  const handleDelete = async () => {
    setIsPending(true);
    await deletePaper(paper.id);
    setIsPending(false);
  };

  if (isEditing) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
          <h2 className="text-xl font-bold mb-4">論文を編集</h2>
          <div className="space-y-3">
            <input className="w-full border px-2 py-1 rounded" value={title} onChange={e => setTitle(e.target.value)} />
            <input className="w-full border px-2 py-1 rounded" value={author} onChange={e => setAuthor(e.target.value)} />
            <select className="w-full border px-2 py-1 rounded" value={category} onChange={e => setCategory(e.target.value)}>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <input className="w-full border px-2 py-1 rounded" value={tags} onChange={e => setTags(e.target.value)} />
            <textarea className="w-full border px-2 py-1 rounded" rows={6} value={content} onChange={e => setContent(e.target.value)} />
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={isDraft} onChange={e => setIsDraft(e.target.checked)} />
              下書きとして保存
            </label>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button className="px-4 py-2 rounded bg-gray-200" onClick={() => setIsEditing(false)}>キャンセル</button>
            <button className="px-4 py-2 rounded bg-blue-600 text-white" onClick={handleUpdate} disabled={isPending}>{isPending ? '保存中...' : '保存'}</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <button className="p-1 hover:bg-gray-100 rounded" onClick={() => setIsEditing(true)} title="編集"><PencilIcon className="h-5 w-5 text-blue-600" /></button>
      <button className="p-1 hover:bg-gray-100 rounded" onClick={handleDelete} title="削除" disabled={isPending}><TrashIcon className="h-5 w-5 text-red-500" /></button>
    </>
  );
} 