// import React from 'react';
import {  convertFromRaw } from 'draft-js';
import { stateToHTML  } from "draft-js-export-html";


export const draftToHtml = data => {
  return stateToHTML(convertFromRaw(JSON.parse(data)))
};