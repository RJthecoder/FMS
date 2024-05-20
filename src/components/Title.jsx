import React from 'react';

function Title(props) {
  // Function to convert string to title case
  const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  // Assuming props.text contains the text you want to convert to title case
  const text = props.text;

  return (
    <div>
      {/* Displaying the text in title case */}
      <h1>{toTitleCase(text)}</h1>
    </div>
  );
}

export default Title;