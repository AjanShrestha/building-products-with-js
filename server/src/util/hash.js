// npm packages
import crypto from 'crypto';

// our packages
import {auth as authConfig} from '../../config';

const hash = (str) => {
  const sum = crypto.createHash('sha256');
  sum.update(str + authConfig.passwordSalt);
  return sum.digest('hex');
};

export default hash;
