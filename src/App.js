import './App.css';
import { MarkdocDemo } from './markdoc/MarkdocDemo';
import { RemarkDemo } from './remark/RemarkDemo';
import { useState } from 'react';

function App() {
  const [mode, setMode] = useState('remark');
  let Component;
  if (mode === 'markdoc') {
    Component = MarkdocDemo;
  } else {
    Component = RemarkDemo;
  }

  return (
    <div className="App">
      <button style={{ position: 'absolute', right: 0, padding: '10px' }}
        onClick={() => setMode(mode === 'markdoc' ? 'remark' : 'markdoc')}>Switch to {mode === 'markdoc' ? 'remark' : 'markdoc'}</button>
      <Component />
    </div>
  );
}

export default App;
