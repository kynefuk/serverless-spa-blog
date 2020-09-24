import React, { useState } from 'react';
import SimpleMED from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import marked from 'marked';
import highlight from 'highlightjs';
import 'highlightjs/styles/docco.css';

marked.setOptions({
  highlight: function (code, lang) {
    return highlight.highlightAuto(code, [lang]).value;
  },
});

function App() {
  const [markdown, setMarkdown] = useState('');
  return (
    <div className='App'>
      <SimpleMED onChange={(e) => setMarkdown(e)} />
      <div id='body'>
        <span dangerouslySetInnerHTML={{ __html: marked(markdown) }} />
      </div>
    </div>
  );
}

export default App;
