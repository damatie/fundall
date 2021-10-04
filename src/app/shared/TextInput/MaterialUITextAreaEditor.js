import React from 'react';
import MUIEditor, { MUIEditorState } from "react-mui-draft-wysiwyg";
import {
    makeStyles,
    createMuiTheme,
    MuiThemeProvider,
  } from '@material-ui/core/styles';

  const defaultTheme = createMuiTheme();

Object.assign(defaultTheme, {
  overrides: {
    MUIRichTextEditor: {
      root: {
        marginTop: 2,
        minHeight: 200,
        marginBottom: 20,
        backgroundColor: 'white',
        padding: 2,
        paddingBottom: 24,
        border: '1px solid #cccccc',
        borderRadius: 4,
      },
      editor: {
        borderBottom: '1px solid white',
      },
    },
  },
});


const TextAreaEditor = (props) => {
    const {
        id,
        value,
        label,
        error,
        message,
        refs,
        name,
        setState,
        className
    } = props;
    React.useEffect(() => {
      setState(MUIEditorState.createEmpty());
    }, []);
    return (
      <MuiThemeProvider theme={defaultTheme}>
          <MUIEditor
            {...props}
            label={label}
            className = {className}
            error={error}
            message={message}
            refs={refs}
            value = {value}
            id= {id}
          />
      </MuiThemeProvider>
    );
}

export default TextAreaEditor;