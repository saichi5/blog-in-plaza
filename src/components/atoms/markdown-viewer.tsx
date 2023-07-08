import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from "remark-gfm";
// import '@/app/markdown/styles.css'

export default function MarkdownViewer(props: {contents: string}){
  const contents = props.contents
  return (
    <p>
    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
      {contents}
    </ReactMarkdown>
  </p>

  )
}