import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FiBookOpen, FiClock, FiAlertCircle, FiChevronRight, FiCopy, FiCheck, FiMaximize2, FiMinimize2 } from 'react-icons/fi';
import '../styles/noteviewer.css';
import '../styles/markdown.css';

function NoteViewer({ subject, topic, note }) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (!subject || !topic || !note) {
      setContent('## 👈 Select a note from the sidebar\n\nYour notes will appear here.');
      setWordCount(0);
      return;
    }

    const filePath = `/notes/${subject}/${topic}/${note}.md`;
    setLoading(true);
    setError('');

    fetch(filePath)
      .then(res => {
        if (!res.ok) throw new Error('Note not found');
        return res.text();
      })
      .then(text => {
        setContent(text);
        const cleanText = text.replace(/[#*`[\]()!]/g, '').replace(/\n/g, ' ');
        const words = cleanText.split(/\s+/).filter(w => w.length > 0).length;
        setWordCount(words);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setError(`Note not found at: ${filePath}`);
        setContent(`# ❌ Note Not Found\n\n**Path:** ${filePath}\n\nPlease create this markdown file.`);
        setLoading(false);
      });
  }, [subject, topic, note]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleFullscreen = () => {
    const element = document.getElementById('note-content-container');
    if (!isFullscreen) {
      element?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const components = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <div className="code-block-wrapper">
          <div className="code-header">
            <span className="code-language">{match[1]}</span>
            <button className="copy-code-btn" onClick={() => navigator.clipboard.writeText(String(children).replace(/\n$/, ''))}>
              Copy
            </button>
          </div>
          <SyntaxHighlighter style={vscDarkPlus} language={match[1]} PreTag="div" {...props}>
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        </div>
      ) : (
        <code className="inline-code" {...props}>{children}</code>
      );
    },
    h1({ children }) {
      const id = String(children).toLowerCase().replace(/[^\w]+/g, '-');
      return (
        <h1 id={id} className="markdown-h1">
          <a href={`#${id}`} className="header-anchor">#</a>
          {children}
        </h1>
      );
    },
    h2({ children }) {
      const id = String(children).toLowerCase().replace(/[^\w]+/g, '-');
      return (
        <h2 id={id} className="markdown-h2">
          <a href={`#${id}`} className="header-anchor">#</a>
          {children}
        </h2>
      );
    },
    h3({ children }) {
      const id = String(children).toLowerCase().replace(/[^\w]+/g, '-');
      return (
        <h3 id={id} className="markdown-h3">
          <a href={`#${id}`} className="header-anchor">#</a>
          {children}
        </h3>
      );
    },
    h4({ children }) {
      return <h4 className="markdown-h4">{children}</h4>;
    },
    table({ children }) {
      return (
        <div className="table-container">
          <table className="markdown-table">
            {children}
          </table>
        </div>
      );
    },
    blockquote({ children }) {
      return <blockquote className="markdown-blockquote">{children}</blockquote>;
    },
    a({ href, children }) {
      return (
        <a href={href} className="markdown-link" target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    },
    img({ src, alt }) {
      return <img src={src} alt={alt} className="markdown-image" loading="lazy" />;
    },
    ul({ children }) {
      return <ul className="markdown-ul">{children}</ul>;
    },
    ol({ children }) {
      return <ol className="markdown-ol">{children}</ol>;
    },
    hr() {
      return <hr className="markdown-hr" />;
    },
    p({ children }) {
      return <p className="markdown-p">{children}</p>;
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading note content...</p>
      </div>
    );
  }

  return (
    <div id="note-content-container" className="note-viewer-container">
      {subject && topic && note && (
        <div className="note-header">
          <div className="note-breadcrumb">
            <FiBookOpen className="breadcrumb-icon" />
            <span className="breadcrumb-item">{subject}</span>
            <FiChevronRight className="breadcrumb-sep" />
            <span className="breadcrumb-item">{topic}</span>
            <FiChevronRight className="breadcrumb-sep" />
            <span className="breadcrumb-item active">{note.replace(/-/g, ' ')}</span>
          </div>
          <div className="note-meta">
            <div className="meta-item">
              <FiClock />
              <span>{wordCount} words</span>
            </div>
            <button className="meta-btn" onClick={copyToClipboard}>
              {copied ? <FiCheck /> : <FiCopy />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
            <button className="meta-btn" onClick={toggleFullscreen}>
              {isFullscreen ? <FiMinimize2 /> : <FiMaximize2 />}
            </button>
          </div>
        </div>
      )}
      <div className="note-content">
        <div className="markdown-wrapper">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
            {content}
          </ReactMarkdown>
        </div>
      </div>
      {error && (
        <div className="error-toast">
          <FiAlertCircle />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

export default NoteViewer;