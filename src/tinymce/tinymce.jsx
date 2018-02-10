import React from 'react';
import PropTypes from 'prop-types'
import Upload from 'rc-upload'
import Icon from '../icon'
import {
  Editor,
  EditorState,
  convertToRaw,
  convertFromRaw
} from 'draft-js';
import { convertToHTML, convertFromHTML } from 'draft-convert'
import { 
   insertImages,
   MediaBlockRenderer,
   getToHTMLConfig, 
   getFromHTMLConfig
} from './utils'
// function Filtrate(str){
// 	return str.replace(/(\s*<p>\s*<br>\s*<\/p>\s*)(<figure>)|(<\/figure>)(\s*<p>\s*<br>\s*<\/p>\s*)/ig,
// 	 (_, $1, $2, $3 ) => $2 =='<figure>' ? $2 :'</figure>' )
// }

export default class Tinymce extends React.Component {
  static defaultProps = {
    placeholder: '请输入文字.......',
    onSnap: () => {}
  }
  constructor(props) {
    super(props)
    this.state = {
      editorState: EditorState.createEmpty()
    };
    this.handleChange = this._onChange.bind(this)
    this.handleClickImages = this._insertImage.bind(this)
    this.handleClickSave = this._handleClickSave.bind(this)
    this._imagesUploadSuccess = this._imagesUploadSuccess.bind(this)
  }
  componentWillMount() {
    if (this.props.rawContent) {
      let _editorState = this.state.editorState
      let contentState = convertFromHTML(getFromHTMLConfig())(this.props.rawContent)  
      let editorState = EditorState.push(_editorState, contentState, 'change-block-data')
      this.setState({ editorState })
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.rawContent && nextProps.rawContent !== this.props.rawContent) {
      let _editorState = this.state.editorState
      let contentState = convertFromHTML(getFromHTMLConfig())(nextProps.rawContent)  
      let editorState = EditorState.push(_editorState, contentState, 'change-block-data')
      this.setState({ editorState })
    }
  }
  _onChange(editorState) {
    this.setState({ editorState })
  }
  _insertImage(src, description) {
   this.handleChange(insertImages(this.state.editorState, {
     src,
     description
   }))
  }
  /**
   * image 上传
   */

  _imagesUploadSuccess(res) {
    const { uploadConfig } = this.props;
    if ('formatResult' in uploadConfig) {
      let result = uploadConfig.formatResult(res)
      this._insertImage(result.url, result.name)
    } else {
      throw("必须配置formatResult， 便于Tinymce接受上传后的图片")
    }
  }
  // getHtmlContent() {
  //   let _editorState = this.state.editorState.getCurrentContent()
  //   let _entityStyleFn = (entity) => {
  //     const entityType = entity.get('type').toLowerCase();
  //     if (entityType === 'image') {
  //       const data = entity.getData();
  //       return {
  //         element: 'img',
  //         attributes: {
  //           src: data.src,
  //           name: 'dhc-img'
  //         }
  //       }
  //     }
  //   }
  //   return stateToHTML(_editorState, { entityStyleFn: _entityStyleFn })
  // }
  _convertToHTML(contentState) {
    let config = getToHTMLConfig({ contentState})
    return convertToHTML(config)(contentState)
  }
  _handleClickSave() {
    let html = this._convertToHTML(this.state.editorState.getCurrentContent())
    if (this.props.onSave) {
      this.props.onSave(html)
      this.setState({ editorState: EditorState.createEmpty()})
    }
  }
  render() {
    const { uploadConfig, footer, footerText, innerElement, placeholder, onSnap, snap } = this.props
    const uploadProps = {
      prefixCls: "dh-upload",
      className: 'dh-tinymce-ctr',
      ...uploadConfig,
      start: (file) => console.log('onStart', file, file.name),
      onSuccess: this._imagesUploadSuccess,
      onError: () => console.error('onError', err)
    }
    return (
      <div className="dh-tinymce">
        <div className="dh-tinymce-btns">
          <Upload {...uploadProps}><Icon type="tupian"/> </Upload>
          {
            snap && (
              <span className="dh-tinymce-ctr" onClick={onSnap}>
                <Icon type="kuaizhao" />
              </span>
            )
          }
        </div>
        { innerElement }
        <div className="dh-tinymce-edit">
          <Editor
            placeholder={placeholder}
            blockRendererFn={MediaBlockRenderer}
            editorState={this.state.editorState}
            onChange={this.handleChange}
          />
        </div>
        <div className="dh-tinymce-footer">
        {
          footer === true ? (
            <div className="dh-tinymce-footer">
              <span onClick={this.handleClickSave}>{ footerText || '发送' }</span>
          </div>) : null
        }
        </div>
      </div>
    )
  }
}
