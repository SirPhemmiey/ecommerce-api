/**
 * Cache.js
 * This is the cache configuration file
 */

"use strict";

const flatCache = require('flat-cache');
const path = require("path");


let cache = flatCache.load('cache', path.resolve("./cache"));

/**
 * @description - Duration represents how long the values need to be stored in the cache.
 * A unique key based on the request url is generated and a check is made to see if there is already content stored for that key. If content exists, the data is sent back as the response without having to make the extra query to our database.
 *
 * @param {BigInteger} duration
 * @returns cacheContent
 */
let flatCacheMiddleware = (req,res, next) => {
    let key =  '__express__' + req.originalUrl || req.url;
    let cacheContent = cache.getKey(key);
    if( cacheContent){
        res.send(cacheContent);
    }else{
        res.sendResponse = res.send
        res.send = (body) => {
            cache.setKey(key,body);
            cache.save();
            res.sendResponse(body)
        }
        next()
    }
};

module.exports = flatCacheMiddleware;
