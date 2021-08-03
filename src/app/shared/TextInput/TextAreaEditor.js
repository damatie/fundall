import React from 'react';
import MUIRichTextEditor from 'mui-rte';
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
        className
    } = props;
    return (
    <MuiThemeProvider theme={defaultTheme}>
          <MUIRichTextEditor
            {...props}
            label={label}
            className = {className}
            error={error}
            message={message}
            refs={refs}
            value = {value}
            id= {id}
          // onSave={save}
            customControls={[
              {
                name: name,
              },
            ]}
            inlineToolbar
          />
        </MuiThemeProvider>
    );
}

export default TextAreaEditor;