import './styles.css'
import './cheet.css'

export default function MarkdownCheet() {

  return (
<>
<center>
  <table>
    <thead>
      <tr>
        <th></th>
        <th>Contents</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1.</td>
        <td><a href="#headline">見出し</a></td>
      </tr>
      <tr>
        <td>2.</td>
        <td><a href="#paragraph">段落</a></td>
      </tr>
      <tr>
        <td>3.</td>
        <td><a href="#newline">改行</a></td>
      </tr>
      <tr>
        <td>4.</td>
        <td><a href="#modification">文字の装飾(イタリック、太文字、取り消し線)</a></td>
      </tr>
      <tr>
        <td>5.</td>
        <td><a href="#link">リンク</a></td>
      </tr>
      <tr>
        <td>6.</td>
        <td><a href="#embedding">画像の埋め込み、ファイルの挿入</a></td>
      </tr>
      <tr>
        <td>7.</td>
        <td><a href="#horizon">水平線</a></td>
      </tr>
      <tr>
        <td>8.</td>
        <td><a href="#list">リスト</a></td>
      </tr>
      <tr>
        <td>9.</td>
        <td><a href="#color">文字色の変更</a></td>
      </tr>
      <tr>
        <td>10.</td>
        <td><a href="#centering">中央揃え</a></td>
      </tr>
      <tr>
        <td>11.</td>
        <td><a href="#code">コードの挿入</a></td>
      </tr>
    </tbody>
        </table>
  <br />
  <div className="item">
    <h2 id="headline">１．見出し</h2>
    <p>冒頭に「#」を入力すると、見出しを作ることができます。「#」の数で見出しの大きさを変えられます。<span className="underline">「#」と「見出し」の間に半角スペース1文字必要</span></p>
    <br />
    <h4>[入力例]</h4>
    <p># 見出し１</p>
    <p>## 見出し２</p>
    <p>### 見出し３</p>
    <p>#### 見出し４</p>
    <br />
    <h4>[表示結果]</h4>
    <h1>見出し１</h1>
    <h2>見出し２</h2>
    <h3>見出し３</h3>
    <h4>見出し４</h4>
  </div>
  <hr />
  <div className="item">
    <h2 id="paragraph">２．段落</h2>
    <p>空白行を入れることで、段落となります。</p>
    <h3>空白行を入れる前</h3>
    <h4>[入力例]</h4>
    <div className="line">
      <p>ドッグランのご利用は、マナーを守って</p>
      <p>皆様が気持ちよく利用できるようご協力を．．．</p>
      </div>
    <h4>[表示結果]</h4>
    <p>ドッグランのご利用は、マナーを守って皆様が気持ちよく利用できるようご協力を．．．</p>
    <br />
    <h3>空白行を入れた後</h3>
    <h4>[入力例]</h4>
    <div className="line">
      <p>ドッグランのご利用は、マナーを守って</p>
      <p>(空白行)</p>
      <p>皆様が気持ちよく利用できるようご協力を．．．</p>
    </div>
    <h4>[表示結果]</h4>
    <p>ドッグランのご利用は、マナーを守って</p>
    <p>皆様が気持ちよく利用できるようご協力を．．．</p>
  </div>
  <hr />
  <div className="item">
    <h2 id="newline">３．改行</h2>
    <p>文章の最後に半角スペースを２つ以上入力することで改行されます。</p>
    <h3>半角スペースを入れる前</h3>
    <h4>[入力例]</h4>
    <div className="line">
      <p>ドッグランのご利用は、マナーを守って</p>
      <p>皆様が気持ちよく利用できるようご協力を．．．</p>
      </div>
    <h4>[表示結果]</h4>
    <p>ドッグランのご利用は、マナーを守って皆様が気持ちよく利用できるようご協力を．．．</p>
    <br />
    <h3>半角スペースを入れた後</h3>
    <h4>[入力例]</h4>
    <div className="line">
      <p>ドッグランのご利用は、マナーを守って<span className="red">␣␣</span></p>
      <p>皆様が気持ちよく利用できるようご協力を．．．</p>
      </div>
   
    <h4>[表示結果]</h4>
    <div className="line">
      <p>ドッグランのご利用は、マナーを守って</p>
      <p>皆様が気持ちよく利用できるようご協力を．．．</p>
      </div>
  </div>
  <hr />
  <div className="item">
    <h2 id="modification">４．文字の装飾(イタリック、太文字、取り消し線)</h2>
    <dl>
      <dt>イタリック：</dt>
      <dd>・文を「*」アスタリスク１個ずつで囲むと、イタリックになります。</dd>
      <dt>太文字：</dt>
      <dd>・文を「**」アスタリスク２個ずつで囲むと、太文字になります。</dd>
      <dt>取り消し線：</dt>
      <dd>・文を「~~」（波線）２つで囲むと、取り消し線が表示されます。</dd>
    </dl>
    <h4>[入力例]</h4>
    <p>*アスタリスク１個でイタリック*</p>
    <p>**アスタリスク２個で太文字**</p>
    <p>~~波線２個で取り消し線~~</p>
    <h4>[表示結果]</h4>
    <p className="italic">アスタリスク１個でイタリック</p>
    <p><b>アスタリスク２個で太文字</b></p>
    <p><s>波線２個で取り消し線</s></p>
  </div>
  <hr />
  <div className="item">
    <h2 id="link">５．リンク</h2>
    <p>[表示テキスト](URL)でリンクに変換されます。</p>
    <h4>[入力例]</h4>
    <p>[ヤフージャパン](https://www.yahoo.co.jp/)</p>
    <h4>[表示結果]</h4>
    <a href="https://www.yahoo.co.jp/">ヤフージャパン</a>
  </div>
  <hr />
  <div className="item">
    <h2 id="embedding">６．画像の埋め込み、ファイルの挿入</h2>
    <p>![代替テキスト](画像URL) で画像が表示されます。</p>
    <h4>[入力例]</h4>
    <p>![じゃろ](https://blog-in-plaza-rho.vercel.app/assets/pictures/u4.jpg)</p>
    <h4>[表示結果]</h4>
    <img src="https://blog-in-plaza-rho.vercel.app/assets/pictures/u4.jpg" alt="じゃろ" />
  </div>
  <hr />
  <div className="item">
    <h2 id="horizon">７．水平線</h2>
    <p>３つ以上、– (ハイフン)、_ (アンダースコア)、* (アスタリスク)を連続して記述している行は水平線（罫線）となります。</p>
    <h4>[入力例]</h4>
    <p>---&nbsp;&nbsp;（ハイフン）</p>
    <p>___&nbsp;&nbsp;（アンダースコア）</p>
    <p>***&nbsp;&nbsp;（アスタリスク）</p>
    <h4>[表示結果]</h4>
    <hr /><br />
    <hr /><br />
    <hr /><br />
  </div>
  <hr />
  <div className="item">
    <h2 id="list">８．リスト</h2>
    <p><b>箇条書きリスト：</b></p>
    <p>文字の前に「*」アスタリスクをつけることで、箇条書きになります。<span className="underline">「*」と「項目」の間に半角スペース1文字必要</span></p>
    <h4>[入力例]</h4>
    <div className="line">
      <p>* 項目</p>
      <p>* 項目</p>
      <p>* 項目</p>
    </div>
    <h4>[表示結果]</h4>
    <ul className="list">
      <li className="list">項目</li>
      <li className="list">項目</li>
      <li className="list">項目</li>
    </ul>
    <p><b>番号付きリスト：</b></p>
    <p>数字とピリオドを入力することで番号をふることができます。番号は自動的に採番されるため、すべての行を1.と記述するのがお勧めです。<span className="underline">「1.」と「項目」の間に半角スペース1文字必要</span></p>
    <h4>[入力例]</h4>
    <div className="line">
      <p>1. 項目</p>
      <p>1. 項目</p>
      <p>1. 項目</p>
    </div>
    <h4>[表示結果]</h4>
    <ol className="list">
      <li className="list">項目</li>
      <li className="list">項目</li>
      <li className="list">項目</li>
    </ol>
  </div>
  <hr />
{/*  <div className="item">
    <h2 id="color">９．文字色の変更</h2>
    <p>Markdown記法では、テキストカラーの変更は対応していないため、文字色を変えるためには、直接HTMLタグを記述する必要があります。</p>
    <h4>[入力例]</h4>
      <p>夕焼け空が&lt;span style="color:red"&gt;赤い&lt;/span&gt;のは、太陽が遠ざかり、波長の短い&lt;span style="color:blue"&gt;青&lt;/span&gt;が散乱するから</p>
  
    <h4>[表示結果]</h4>
    <p>夕焼け空が<span style="color:red">赤い</span>のは、太陽が遠ざかり、波長の短い<span style="color:blue">青</span>が散乱するから</p>
    <br />
    </div>
  */}
  <hr />
  <div className="item">
    <h2 id="centering">１０．中央揃え</h2>
    <p>文を中央に配置することができます。</p>
    <h4>[入力例]</h4>
    <p>&lt;center&gt;中央揃え&lt;/center&gt;</p>
    <h4>[表示結果]</h4>
    <center>中央揃え</center>
    <br />
  </div>
  <hr />
{/*
  <div className="item">
    <h2 id="code">１１．コードの挿入</h2>
    <p>コードのような等幅文字列を挿入できます。</p>
    <h4>[入力例]</h4>
    <div className="line">
      <p>```TypeScript:import.ts</p>
      <p># コード</p>
      <p>import type { Post } from '@/data';</p>
      <br />
      <p>export default function (params){</p>
      <p>&nbsp;&nbsp;const id = params.id;</p>
      <p>&nbsp;&nbsp;return (something);</p>
      <p>}</p>
      <p>```</p>
    </div>
    <h4>[表示結果]</h4>
    <pre className="box">
      <code className="box">
# コード
import type { Post } from '@/data';

export default function (params){
    const id = params.id;
    return (something);
}
      </code>
    </pre>
    <br />
  </div>
    */}
  <br />
</center>
</>
)
}
