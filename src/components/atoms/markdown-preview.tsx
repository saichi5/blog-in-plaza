import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from "remark-gfm";
// import { Scrollbar } from '@/components/scrollbar';
import '@/app/markdown/styles.css'

export default function MarkdownPreview(props: {contents: string}){
  const contents = props.contents
  return (
    <div>
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
        {contents}     
      </ReactMarkdown>
    </div>
  )
}