import { AtomicBlockUtils, EditorState } from 'draft-js';
import { MediaBlock } from './component.js'
import React from 'react'
export const insertImages = (editorState, data) => {
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity('image', 'IMMUTABLE', data);
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
  return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ');
}

export const MediaBlockRenderer = (block) => {
  if (block.getType() === 'atomic') {
    return {
      component: MediaBlock,
      editable: false,
    }
  }
}
/**
 * 转换HTML的配置
 * @param {*} props 
 */
const blocks = {
  height: 500,
  language: 'zh',
  controls: [
    'undo', 'redo', 'split', 'font-size', 'font-family', 'text-color',
    'bold', 'italic', 'underline', 'strike-through', 'superscript',
    'subscript', 'emoji', 'text-align', 'split', 'headings', 'list_ul', 'list_ol',
    'blockquote', 'code', 'split', 'link', 'split', 'media'
  ],
  extendControls: [],
  media: {
    image: true,
    video: true,
    audio: true,
    uploadFn: null,
    sourceFn: null
  },
  colors: [
    '#000000', '#333333', '#666666', '#999999', '#cccccc', '#ffffff',
    '#61a951', '#16a085', '#07a9fe', '#003ba5', '#8e44ad', '#f32784',
    '#c0392b', '#d35400', '#f39c12', '#fdda00', '#7f8c8d', '#2c3e50'
  ],
  fontSizes: [
    12, 14, 16, 18, 20, 24,
    28, 30, 32, 36, 40, 48,
    56, 64, 72, 96, 120, 144
  ],
  fontFamilies: [
    {
      name: 'Araial',
      family: 'Arial, Helvetica, sans-serif'
    }, {
      name: 'Georgia',
      family: 'Georgia, serif'
    }, {
      name: 'Impact',
      family: 'Impact, serif'
    }, {
      name: 'Monospace',
      family: '"Courier New", Courier, monospace'
    }, {
      name: 'Tahoma',
      family: "tahoma, arial, 'Hiragino Sans GB', 宋体, sans-serif"
    }
  ],
  emojis: [
    "🤣","🙌","💚","💛","👏","😉","💯",
    "💕","💞","💘","💙","💝","🖤","💜",
    "❤️","😍","😻","💓","💗","😋","😇",
    "😂","😹","😘","💖","😁","😀","🤞",
    "😲","😄","😊","👍","😌","😃","😅",
    "✌️","🤗","💋","😗","😽","😚","🤠",
    "😙","😺","👄","😸","😏","😼","👌",
    "😎","😆","😛","🙏","🤝","🙂","🤑",
    "😝","😐","😑","🤤","😤","🙃","🤡",
    "😶","😪","😴","😵","😓","👊","😦",
    "😷","🤐","😜","🤓","👻","😥","🙄",
    "🤔","🤒","🙁","😔","😯","☹️","☠️",
    "😰","😩","😖","😕","😒","😣","😢",
    "😮","😿","🤧","😫","🤥","😞","😬",
    "👎","💀","😳","😨","🤕","🤢","😱",
    "😭","😠","😈","😧","💔","😟","🙀",
    "💩","👿","😡","😾","🖕"
  ]
}
const convertAtomicBlock = (block, contentState) => {
    // console.log('contentState', contentState)
    const contentBlock = contentState.getBlockForKey(block.key)
    const entityKey = contentBlock.getEntityAt(0)
    const entity = contentState.getEntity(entityKey)
    const mediaType = entity.getType().toLowerCase()
    let { float, alignment } = block.data
    let { url, src } = entity.getData()
    if (mediaType === 'image') {
      return (
        <div className="dhc-media dhc-media-image">
          <img src={src} name="dhc-img" />
        </div>
      )
    } else if (mediaType === 'audio') {
      return <div className="dhc-media dhc-media-image"><audio controls src={url} /></div>
    } else if (mediaType === 'video') {
      return <div className="dhc-media dhc-media-audio"><video controls src={url} /></div>
    } else {
      return <p></p>
    }
  
  }
const blockToHTML = (contentState) => (block) => {
    let result = null
    let blockStyle = ""
    const blockType = block.type.toLowerCase()
    const { textAlign, attributes} = block.data
    if (textAlign) {
      blockStyle = ` style="text-align:${textAlign};"`
    }
  
    if (blockType === 'unstyled') {
      return (<p {...attributes}>{block.text}</p>)
    } else if (blockType === 'atomic') {
      return convertAtomicBlock(block, contentState)
    } else if (blockType === 'code-block') {
      return {
        start: `<pre><code${blockStyle}>`,
        end: '</code></pre>'
      }
    }  else if (blocks[blockType]) {
      return {
        start: `<${blocks[blockType]}${blockStyle}>`,
        end: `</${blocks[blockType]}>`
      }
    }

  }
export const getToHTMLConfig = (props) => {
  return {
    blockToHTML: blockToHTML(props.contentState)
  }
}
/**
 * HTML 转 map
 * @param {*} nodeName 
 * @param {*} node 
 */
const htmlToBlock = (nodeName, node) => {
    let nodeStyle = node.style || {}
    if (node.classList && node.classList.contains('dhc-media')) {
  
      return {
        type: 'atomic',
        data: {
          float: nodeStyle.float,
          alignment: nodeStyle.textAlign
        }
      }
  
    } else if (nodeName === 'img') {
  
      return {
        type: 'atomic',
        data: {
          float: nodeStyle.float,
          alignment: nodeStyle.textAlign
        }
      }
  
    } else if (nodeName === 'p') {
      let attributes = {};
      for (let key in node.attributes) {
       if (node.attributes.hasOwnProperty(key)) {
         attributes[node.attributes[key].nodeName] = node.attributes[key].nodeValue
        }
      }  
      return {
        type: 'unstyled',
        data: {
          attributes,
          textAlign: nodeStyle.textAlign
        }
      }
  
    }
  }
export const getFromHTMLConfig = (props) => {
    return { htmlToBlock }
}
  