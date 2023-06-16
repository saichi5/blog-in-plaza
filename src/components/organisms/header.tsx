'use client'

import FloatingActionButton from "@/components/atoms/floating-action-button";
import Navibar2 from "@/components/molecules/navibar2";

/**
 * ヘッダー
 */
export default function Header ({ currentPath }: { currentPath: string }){
  
  return (
    <>
      <header>
        <Navibar2 currentPath={currentPath} />
        <FloatingActionButton />
      </header>
    </>
  );
}
