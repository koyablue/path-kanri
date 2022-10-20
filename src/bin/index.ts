#!/usr/bin/env node

import init from './commands/index';

// constants
import { dirFullPath, stubFullPath } from './constants';

init(dirFullPath, stubFullPath);
