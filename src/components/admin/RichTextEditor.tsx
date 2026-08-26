"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TiptapImage from "@tiptap/extension-image";
import TiptapLink from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { Markdown, type MarkdownStorage } from "tiptap-markdown";
import { useEffect, useRef, useState } from "react";
import {
  Bold,
  Italic,
  Strikethrough,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Link as LinkIcon,
  ImageIcon,
  Undo2,
  Redo2,
  Loader2,
  type LucideIcon,
} from "lucide-react";

type Props = {
  content: string;
  onChange: (markdown: string) => void;
  onUploadImage: (file: File) => Promise<string>;
};

export default function RichTextEditor({ content, onChange, onUploadImage }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  // Tiptap only reads `content` once, at creation — this tracks what we've
  // already pushed in so a later async load (fetched from GitHub) can be
  // applied without clobbering the user's own typing on every render.
  const loadedContent = useRef(content);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      // Tiptap v3's StarterKit bundles its own Link extension; disable it so
      // our separately-configured one below doesn't collide with it.
      StarterKit.configure({ link: false }),
      TiptapImage,
      TiptapLink.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: "Write your post…" }),
      Markdown.configure({ html: false, transformPastedText: true }),
    ],
    content,
    onUpdate: ({ editor }) => {
      // tiptap-markdown doesn't ship the module augmentation that would
      // type `storage.markdown` on Editor, so it needs a manual cast.
      onChange((editor.storage as unknown as { markdown: MarkdownStorage }).markdown.getMarkdown());
    },
    editorProps: {
      attributes: {
        class: "prose-post min-h-[360px] focus:outline-none",
      },
      handleDrop(_view, event, _slice, moved) {
        if (moved) return false;
        const file = event.dataTransfer?.files?.[0];
        if (file && file.type.startsWith("image/")) {
          event.preventDefault();
          void insertImage(file);
          return true;
        }
        return false;
      },
      handlePaste(_view, event) {
        const file = Array.from(event.clipboardData?.files ?? []).find((f) =>
          f.type.startsWith("image/")
        );
        if (file) {
          event.preventDefault();
          void insertImage(file);
          return true;
        }
        return false;
      },
    },
  });

  useEffect(() => {
    if (editor && content !== loadedContent.current) {
      editor.commands.setContent(content);
      loadedContent.current = content;
    }
  }, [content, editor]);

  async function insertImage(file: File) {
    setUploading(true);
    setUploadError(null);
    try {
      const url = await onUploadImage(file);
      editor?.chain().focus().setImage({ src: url, alt: file.name }).run();
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Image upload failed.");
    } finally {
      setUploading(false);
    }
  }

  function handleFilePicked(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (file) void insertImage(file);
  }

  function handleLink() {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link URL", previousUrl ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }

  if (!editor) return null;

  const buttons: { label: string; icon: LucideIcon; active: boolean; onClick: () => void }[] = [
    {
      label: "Bold",
      icon: Bold,
      active: editor.isActive("bold"),
      onClick: () => editor.chain().focus().toggleBold().run(),
    },
    {
      label: "Italic",
      icon: Italic,
      active: editor.isActive("italic"),
      onClick: () => editor.chain().focus().toggleItalic().run(),
    },
    {
      label: "Strikethrough",
      icon: Strikethrough,
      active: editor.isActive("strike"),
      onClick: () => editor.chain().focus().toggleStrike().run(),
    },
    {
      label: "Heading 2",
      icon: Heading2,
      active: editor.isActive("heading", { level: 2 }),
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      label: "Heading 3",
      icon: Heading3,
      active: editor.isActive("heading", { level: 3 }),
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    },
    {
      label: "Bullet list",
      icon: List,
      active: editor.isActive("bulletList"),
      onClick: () => editor.chain().focus().toggleBulletList().run(),
    },
    {
      label: "Numbered list",
      icon: ListOrdered,
      active: editor.isActive("orderedList"),
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
    },
    {
      label: "Quote",
      icon: Quote,
      active: editor.isActive("blockquote"),
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
    },
    {
      label: "Code block",
      icon: Code,
      active: editor.isActive("codeBlock"),
      onClick: () => editor.chain().focus().toggleCodeBlock().run(),
    },
    {
      label: "Link",
      icon: LinkIcon,
      active: editor.isActive("link"),
      onClick: handleLink,
    },
  ];

  return (
    <div className="rounded-lg border border-border bg-surface">
      <div className="flex flex-wrap items-center gap-1 border-b border-border p-2">
        {buttons.map(({ label, icon: Icon, active, onClick }) => (
          <button
            key={label}
            type="button"
            title={label}
            onClick={onClick}
            className={`rounded-md p-1.5 hover:bg-bg ${active ? "bg-bg text-accent" : "text-muted"}`}
          >
            <Icon size={16} />
          </button>
        ))}

        <button
          type="button"
          title="Insert image"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="rounded-md p-1.5 text-muted hover:bg-bg disabled:opacity-50"
        >
          {uploading ? <Loader2 size={16} className="animate-spin" /> : <ImageIcon size={16} />}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFilePicked}
          className="hidden"
        />

        <span className="mx-1 h-4 w-px bg-border" />

        <button
          type="button"
          title="Undo"
          onClick={() => editor.chain().focus().undo().run()}
          className="rounded-md p-1.5 text-muted hover:bg-bg"
        >
          <Undo2 size={16} />
        </button>
        <button
          type="button"
          title="Redo"
          onClick={() => editor.chain().focus().redo().run()}
          className="rounded-md p-1.5 text-muted hover:bg-bg"
        >
          <Redo2 size={16} />
        </button>
      </div>

      {uploadError && <p className="border-b border-border px-4 py-2 text-sm text-red-400">{uploadError}</p>}

      <EditorContent editor={editor} className="cursor-text p-4" onClick={() => editor.chain().focus()} />
    </div>
  );
}
