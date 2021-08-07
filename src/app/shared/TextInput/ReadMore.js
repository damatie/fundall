import React from 'react';
import PropTypes from 'prop-types';

const ReadMore = ({size, readMoreText, readLessText, text}) => {
const [charLimit, setCharLimit] = React.useState(size);

  const getReadMoreContent = () => {
    if (text?.length > charLimit) {
      return (
            <span className='short-text'>
                <span
                    dangerouslySetInnerHTML={{ __html: text.substr(0, charLimit) +'...' }}
                />
                <span
                    className='readMoreText'
                    style={{ color: '#007f8c', cursor: 'pointer' }}
                    role='presentation'
                    onClick={(e) => showLongText()}
                >
                    {readMoreText || "Read more >>"}
                </span>
            </span>
        );
    } else if (text?.length < charLimit) {
      return <span className='short-text'>{text}</span>;
    }

    return (
      <span className='short-text'>
        <span dangerouslySetInnerHTML={{ __html: text }} />

        <span
          className='readMoreText'
          style={{ color: '#007f8c', cursor: 'pointer' }}
          role='presentation'
          onClick={(ev) => showShortText()}
        >
          {readLessText || "Read less <<"}
        </span>
      </span>
    );
  }

  const showLongText = () => {
    setCharLimit(text?.length);
    getReadMoreContent();
  }

  const showShortText = () => {
    setCharLimit(size);
    getReadMoreContent();
  }

  return(
    <div>{getReadMoreContent()}</div>
  )
  }

ReadMore.propTypes = {
  charLimit: PropTypes.number,
  readMoreText: PropTypes.string,
  readLessText: PropTypes.string,
  text: PropTypes.string
};
// ReadMore.defaultProps = {
//   charLimit: 150,
//   readMoreText: 'Read more',
//   readLessText: 'Read less'
// };

export default ReadMore;