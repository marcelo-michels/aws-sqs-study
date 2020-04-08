'use strict';

module.exports.hello = async event => {
  for (const message of event.Records) {
    console.log('Id:', message.messageId);
    console.log('Body:', message.body);
  }
  return true
};
