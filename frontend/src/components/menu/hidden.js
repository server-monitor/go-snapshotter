
import React from 'react';

import { Button } from 'stardust';

const style = {
  hidden: {
    position: 'absolute',
    top: '0.5%',
    left: '2%',

    border: 'solid 2px white',
    borderRadius: '4px',
    height: '8px',
    width: '70px',
  }
};

const Hidden = ({ showMenu }) => (
  <div title="Menu" style={style}>
    <Button onClick={showMenu} style={style.hidden} />
  </div>
);

Hidden.propTypes = {
  showMenu: React.PropTypes.func.isRequired
};

export default Hidden;
