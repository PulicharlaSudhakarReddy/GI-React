const async = require('async');
const logger = require('../utils/logger.js');
const origin = require('../utils/origin');
const constants = require('../utils/constants');
const errorUtils = require('../utils/errorutils');
const headerUtils = require('../utils/headerutil');

/* GET Auto Suggest key */
/* Auto Suggest Result Page API */
module.exports.getAutoSuggestResult = (req, callback) => {
  if (!req.params || !req.params.byterm || req.params.byterm === '') {
    logger.debug('Invalid Params');
    callback(errorUtils.errorlist.invalid_params);
    return;
  }
  const autoSuggestTask = [
    getKeywordSuggestion.bind(null, req.headers, req.params.byterm),
  ];
  async.parallel(autoSuggestTask, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result[0]);
    }
  });
};

function getKeywordSuggestion(headers, searchTerm, callback) {
  const originUrl = constants.autoSuggest
    .replace('{{storeId}}', headers.storeId)
    .replace('{{urlParam}}', searchTerm);

  const reqHeaders = headerUtils.getWCSHeaders(headers);

  origin.getResponse(
    'GET',
    originUrl,
    reqHeaders,
    null,
    null,
    null,
    '',
    response => {
      if (response.status === 200) {
        callback(null, response.body);
      } else {
        callback(errorUtils.handleWCSError(response));
      }
    },
  );
}

/* GET Search key */
/* Search Result Page API */
module.exports.getSearchResult = (req, callback) => {
  if (!req.params || !req.params.byterm || req.params.byterm === '') {
    logger.debug('Invalid Params');
    callback(errorUtils.errorlist.invalid_params);
    return;
  }

  const searchTask = [getSearchData.bind(null, req.headers, req.params.byterm)];
  async.waterfall(searchTask, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};

function getSearchData(headers, searchTerm, callback) {
  const originUrl = constants.search
    .replace('{{storeId}}', headers.storeId)
    .replace('{{urlParam}}', searchTerm);

  const reqHeaders = headerUtils.getWCSHeaders(headers);

  origin.getResponse(
    'GET',
    originUrl,
    reqHeaders,
    null,
    null,
    null,
    '',
    response => {
      if (response.status === 200) {
        callback(null, response.body);
      } else {
        callback(errorUtils.handleWCSError(response));
      }
    },
  );
}
