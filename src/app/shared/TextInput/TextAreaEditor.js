import React from 'react';
import MUIRichTextEditor from 'mui-rte';
import {convertFromHTML, ContentState, convertToRaw } from 'draft-js';
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


const MaterialUITextAreaEditor = (props) => {
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
    const contentHTML = convertFromHTML(value || '');
    const state = ContentState.createFromBlockArray(contentHTML.contentBlocks, contentHTML.entityMap);
    const content = JSON.stringify(convertToRaw(state));
    return (
    <MuiThemeProvider theme={defaultTheme}>
          <MUIRichTextEditor
            {...props}
            label={label}
            className = {className}
            error={error}
            message={message}
            refs={refs}
            value = {content}
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

export default MaterialUITextAreaEditor;