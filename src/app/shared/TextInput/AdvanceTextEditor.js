import React from 'react';
import { EditorState,convertToRaw, convertFromHTML, ContentState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { makeStyles } from '@material-ui/core';
import { draftToHtml } from '../../hooks/useDraftToHtml';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  editor_class: {
    border: '1px solid rgba(0, 0, 0, 0.4)',
    borderRadius: 5,
    minHeight: 300
  },
  toolbar_class: {
    border: '1px solid rgba(0, 0, 0, 0.4)',
    borderRadius: 5,
  },
  error: {
    border: '1px solid red',
    borderRadius: 5,
    minHeight: 300
  }
}))
const AdvanceTextEditor = ({setInput, error, value, setLength, placeholder, inputValue, setError, title}) => {
  const classes = useStyles();
  // draft editior state
  const [editorState, setEditorState] = React.useState(
    EditorState.createWithContent(
      ContentState.createFromBlockArray(
        convertFromHTML(!value ? '<p></p>' : value)
      )
    )
  );

  // handle draft editor change event
  const handleEditorChangeEvent = state => {
    setEditorState(state);
    setInput(draftToHtml(JSON.stringify(convertToRaw(state.getCurrentContent()))));

    if (setLength) return  setLength(state.getCurrentContent().getPlainText('').length);
    // console.log(inputValue.replace(/(&nbsp;|<([^>]+)>)/ig, "").length)
    if (inputValue?.replace(/(&nbsp;|<([^>]+)>)/ig, "").length > 1998) return setError(true);
    else {
      if(setError) setError(false);
      
    };
  };
  
  return (
    <>
    <Editor
      // editorState={editorState}
      defaultEditorState={editorState}
      wrapperClassName="wrapper-class"
      editorClassName={ error ? classes.error : classes.editor_class}
      toolbarClassName={classes.toolbar_class}
      onEditorStateChange={handleEditorChangeEvent}
      placeholder={placeholder ? placeholder : ''}
    />
    {error && <Typography variant="caption" color="error">{title} must not be more than 2000 characters</Typography>}
    </>
  )
};

export default AdvanceTextEditor;