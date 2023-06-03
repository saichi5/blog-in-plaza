import { ModeToggle } from "@/components/mode-toggle"
import Navibar from '../molecules/navibar';

/**
 * ヘッダー
 */
export default function Header ({ backPath }: { backPath: string }){

  return (
    <header>
      <div className="flex items-center justify-between">
        <ModeToggle />
        <Navibar backPath={backPath} />
      </div>
    </header>
  )
}
