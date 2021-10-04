import React from 'react';
import ReactHtmlParser from 'react-html-parser';

const HtmlParser = ({data}) => {
  return (
    <>
      {ReactHtmlParser(data)}
    </>
  );
};

export default HtmlParser