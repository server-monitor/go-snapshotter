
function info(msg, titleArg = '') {
  let title = 'DEBUG';

  if (titleArg) {
    title += ` ${titleArg}...`;
  } else {
    title += ' ...';
  }

  [title, msg, '\n\n'].forEach((obj) => console.log(obj));
}

function sleepBlock(ms) {
  let end = new Date().getTime() + ms;
  let start = new Date().getTime();

  while (start < end) {
    start = new Date().getTime();
  }
}

if (typeof module !== 'undefined') {
  module.exports = {
    info: info,
  };
}
