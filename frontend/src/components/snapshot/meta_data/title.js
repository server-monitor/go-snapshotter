import React from 'react';

const Title = (_, context) => <div>{context.title}</div>;

Title.contextTypes = {
  title: React.PropTypes.string.isRequired,
};

export default Title;
